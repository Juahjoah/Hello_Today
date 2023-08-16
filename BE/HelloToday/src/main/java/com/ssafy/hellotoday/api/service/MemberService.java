package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.member.FileDto;
import com.ssafy.hellotoday.api.dto.member.LoginDto;
import com.ssafy.hellotoday.api.dto.member.TokenDto;
import com.ssafy.hellotoday.api.dto.member.request.MemberInfoUpdateRequestDto;
import com.ssafy.hellotoday.api.dto.member.request.ShowInfoEditRequestDto;
import com.ssafy.hellotoday.api.dto.member.response.*;
import com.ssafy.hellotoday.common.exception.CustomException;
import com.ssafy.hellotoday.common.exception.validator.MemberValidator;
import com.ssafy.hellotoday.common.util.file.FileUploadUtil;
import com.ssafy.hellotoday.db.entity.*;

import com.ssafy.hellotoday.db.repository.MemberRepository;
import com.ssafy.hellotoday.db.repository.ShowInfoRepository;
import com.ssafy.hellotoday.jwt.JwtTokenProvider;
import com.ssafy.hellotoday.oauth2.kakao.KakaoMemberDto;
import com.ssafy.hellotoday.oauth2.kakao.KakaoOAuth2;
import com.ssafy.hellotoday.oauth2.naver.NaverMemberDto;
import com.ssafy.hellotoday.oauth2.naver.NaverOAuth2;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {
    @Value("${jwt.secretKey}")
    private String secretKey;


    private final KakaoOAuth2 kakaoOAuth2;
    private final NaverOAuth2 naverOAuth2;
    private final MemberRepository memberRepository;
    private final ShowInfoRepository showInfoRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final FileUploadUtil fileUploadUtil;
    private final RedisTemplate<String, String> redisTemplate;
    private final MemberValidator memberValidator;
    // authorizedCode로 가입된 사용자 조회
    @Transactional
    public LoginDto findKakaoMemberByAuthorizedCode(String authorizedCode, String redirectUri) {
        // 카카오 OAuth2 를 통해 카카오 사용자 정보 조회
        KakaoMemberDto kakaoUserDto = kakaoOAuth2.getMemberInfo(authorizedCode, redirectUri);
        String email = kakaoUserDto.getEmail();

        String socialId = kakaoUserDto.getSocialId();
        Optional<Member> optionalMember = memberRepository.findBySocialId(socialId);

        if(optionalMember.isPresent()){

            return LoginDto.builder()
                    .memberId(optionalMember.get().getMemberId())
                    .socialId(optionalMember.get().getSocialId())
                    .socialType(optionalMember.get().getSocialType())
                    .nickname(optionalMember.get().getNickname())
                    .firstLogin(false)
                    .build();
        }
            // 가입된 유저가 아니라면 회원가입 진행
        else {
            String name = kakaoUserDto.getName();
            String profilePath = kakaoUserDto.getProfilePath();

            Member member = Member.builder()
                    .role(Role.USER)
                    .email(email)
                    .nickname(UUID.randomUUID()+"hello")
                    .profilePath(profilePath)
                    .socialId(socialId)
                    .socialType(Social.KAKAO)
                    .build();
            Member saveMember = memberRepository.save(member);
            ShowInfo showInfo = ShowInfo.builder()
                    .member(saveMember)
                    .build();
            showInfoRepository.save(showInfo);

            return  LoginDto.builder()
                    .memberId(member.getMemberId())
                    .socialId(member.getSocialId())
                    .socialType(member.getSocialType())
                    .nickname(member.getNickname())
                    .firstLogin(true)
                    .build();
        }
    }

    @Transactional
    public LoginDto findNaverMemberByAuthorizedCode(String authorizedCode, String naverState) {
        // 카카오 OAuth2 를 통해 카카오 사용자 정보 조회
        NaverMemberDto naverMemberDto = naverOAuth2.getMemberInfo(authorizedCode, naverState);
        String email = naverMemberDto.getEmail();

        String socialId = naverMemberDto.getSocialId();
        Optional<Member> optionalMember = memberRepository.findBySocialId(socialId);

        if (optionalMember.isPresent()) {
            return LoginDto.builder()
                    .memberId(optionalMember.get().getMemberId())
                    .socialId(optionalMember.get().getSocialId())
                    .socialType(optionalMember.get().getSocialType())
                    .nickname(optionalMember.get().getNickname())
                    .firstLogin(false)
                    .build();
        }
        // 가입된 유저가 아니라면 회원가입 진행

        else {
            String profilePath = naverMemberDto.getProfilePath();



            Member member = Member.builder()
                    .role(Role.USER)
                    .email(email)
                    .nickname(UUID.randomUUID() + "hello")
                    .profilePath(profilePath)
                    .socialId(socialId)
                    .socialType(Social.NAVER)
                    .build();
            Member saveMember = memberRepository.save(member);

            ShowInfo showInfo = ShowInfo.builder()
                    .member(saveMember)
                    .build();
            showInfoRepository.save(showInfo);

            return LoginDto.builder()
                    .memberId(member.getMemberId())
                    .socialId(member.getSocialId())
                    .socialType(member.getSocialType())
                    .nickname(member.getNickname())
                    .firstLogin(true)
                    .build();
        }
    }

    @Transactional
    public TokenDto reissue(String refreshToken) {

        log.info("재발급서비스 진입!!!");

        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new CustomException(HttpStatus.BAD_REQUEST, 403, "토큰에 문제 생겼어요");
        }

        String id = Jwts.parser().setSigningKey(secretKey.getBytes())
                .parseClaimsJws(refreshToken).getBody().getId();


        Member findMember = memberRepository.findById(Integer.parseInt(id))
                .orElse(null);
        if (findMember == null) {
            throw new CustomException(HttpStatus.BAD_REQUEST, -1, "일치하는 유저가 없습니다");
        }

        String redisRefreshToken = redisTemplate.opsForValue().get(Integer.toString(findMember.getMemberId()));

        if (!refreshToken.equals(redisRefreshToken)) {
            throw new CustomException(HttpStatus.BAD_REQUEST, -1, "refresh Token 불일치");
        }
        String newAccessToken = jwtTokenProvider.createAccessToken(findMember.getMemberId(), findMember.getSocialId(), findMember.getSocialType());
        String newRefreshToken = jwtTokenProvider.createRefreshToken(findMember.getMemberId());

        jwtTokenProvider.storeRefreshToken(findMember.getMemberId(),newRefreshToken);
        TokenDto tokenDto = new TokenDto();
        tokenDto.setAccessToken(newAccessToken);
        tokenDto.setRefreshToken(newRefreshToken);
        tokenDto.setMemberId(findMember.getMemberId());
        return tokenDto;
    }

    @Transactional(readOnly = true)
    public Member findMemberByJwtToken(String token) {

        String id = String.valueOf(Jwts.parser().setSigningKey(secretKey.getBytes())
                .parseClaimsJws(token).getBody().get("id"));

        return memberRepository.findById(Integer.parseInt(id))
                .orElseThrow(() -> new IllegalArgumentException("회원아이디 \""+ id+" \" 에해당하는 사용자가 존재하지 않습니다."));
    }

    @Transactional(readOnly = true)
    public MemberInfoResponseDto getMemberInfo(Member findMember) {


        return MemberInfoResponseDto.builder()
                .member(findMember)
                .build();

    }
    @Transactional(readOnly = true)
    public ShowInfoFlagsResponseDto getWidgetInfo(Integer memberId) {

        ShowInfo showInfo = showInfoRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 유저의 공개정보가 없습니다"));


        return ShowInfoFlagsResponseDto.builder()
                .showinfo(showInfo)
                .build();
    }

    @Transactional
    public BaseResponseDto updateMemberInfo(Integer id, MemberInfoUpdateRequestDto mypageUpdateRequestDto, Member findMember, MultipartFile file) {

        if (findMember.getMemberId()!=id) {
            throw new IllegalArgumentException("잘못된 접근입니다");
        }


        if (mypageUpdateRequestDto == null) {

            if (file != null) {
                FileDto newfileDto = fileUploadUtil.uploadFile(file, findMember);
                findMember.updateMemberInfo(newfileDto);
                findMember.getProfileImagePath();
            }

        } else {
            if (mypageUpdateRequestDto.getNickname() == null||mypageUpdateRequestDto.getNickname().isBlank()) {
                throw new CustomException(HttpStatus.BAD_REQUEST, -101, "닉네임은 null이 될 수 없습니다");
            }

            if(!isValidNickname(mypageUpdateRequestDto.getNickname())||(mypageUpdateRequestDto.getNickname().length() < 3 || mypageUpdateRequestDto.getNickname().length() >= 11)){
                throw new CustomException(HttpStatus.BAD_REQUEST, -102, "닉네임 정규식 혹은 길이가 맞지 않습니다");
            }

            Optional<Member> findNickname = memberRepository.findByNickname(mypageUpdateRequestDto.getNickname());

            //넥네임 중복체크
            if (findNickname.isPresent()&&!findMember.getNickname().equals(findNickname.get().getNickname())) {
                throw new CustomException(HttpStatus.BAD_REQUEST, -100, "닉네임이 중복되었습니다");
            }

            if (mypageUpdateRequestDto.getFile() != null) {
                FileDto newfileDto = fileUploadUtil.uploadFile(mypageUpdateRequestDto.getFile(), findMember);
                findMember.updateMemberInfo(mypageUpdateRequestDto, newfileDto);
                findMember.getProfileImagePath();
            } else {
                findMember.updateMemberInfo(mypageUpdateRequestDto);
            }
        }
            MemberUpdateResposneDto newMember = MemberUpdateResposneDto.builder()
                    .member(findMember)
                    .build();

            return BaseResponseDto.builder()
                    .success(true)
                    .message("사용자 정보를 수정하였습니다")
                    .data(newMember)
                    .build();


    }

    @Transactional
    public BaseResponseDto editShowInfo(Member findMember, ShowInfoEditRequestDto showInfoEditRequestDto) {

        ShowInfo findShowInfo = showInfoRepository.findByIdWithMember(findMember.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("해당하는 " + findMember.getMemberId() + " 유저의 공개정보가 없습니다"));

        findShowInfo.updateShowInfo(showInfoEditRequestDto);

        ShowInfoFlagsResponseDto newShowInfo = ShowInfoFlagsResponseDto.builder().showinfo(findShowInfo).build();
        return BaseResponseDto.builder()
                .success(true)
                .message("마이페이지 위젯 편집을 성공하셨습니다")
                .data(newShowInfo)
                .build();
    }


    @Transactional
    public BaseResponseDto updateNickname(String nickname, Member member) {

        member.updateNickname(nickname);


        return BaseResponseDto.builder()
                .success(true)
                .message("닉네임이 등록되었습니다")
                .data(NickNameResponseDto.builder()
                        .memberId(member.getMemberId())
                        .nickname(member.getNickname())
                        .build())
                .build();
    }

    @Transactional(readOnly = true)
    public BaseResponseDto validNickname(String nickname, Member member) {
        Member findMember = memberRepository.findByNickname(nickname).orElse(null);
        //닉네임 중복
        if (findMember != null) {

            return BaseResponseDto.builder()
                    .success(false)
                    .message("닉네임이 중복되었습니다")
                    .data(NickNameResponseDto.builder()
                            .memberId(member.getMemberId())
                            .nickname(nickname)
                            .build())
                    .build();
        }


        return BaseResponseDto.builder()
                .success(true)
                .message("닉네임이 서용가능합니다")
                .data(NickNameResponseDto.builder()
                        .memberId(member.getMemberId())
                        .nickname(nickname)
                        .build())
                .build();
    }

    @Transactional
    public BaseResponseDto deleteMember(Member findMember) {

        memberRepository.delete(findMember);

        return BaseResponseDto.builder()
                .success(true)
                .message("회원 탈퇴를 하셨습니다")
                .data(findMember.getMemberId())
                .build();

    }

    @Transactional(readOnly = true)
    public MemberInfoResponseDto getDetailMemberInfo(Integer memberId) {

        Optional<Member> targetMember = memberRepository.findById(memberId);

        memberValidator.checkMember(targetMember,memberId);

        return MemberInfoResponseDto.builder()
                .member(targetMember.get())
                .build();
    }

    private boolean isValidNickname(String nickname) {

        return Pattern.matches("[a-zA-Z0-9[가-힣]]*$", nickname);
    }
}
