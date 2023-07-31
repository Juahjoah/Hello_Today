package com.ssafy.hellotoday.jwt;

import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.db.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberDetailsServiceImpl implements UserDetailsService {
    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String socialId) throws UsernameNotFoundException {
        Member member =  memberRepository.findBySocialId(socialId)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 사용자가 없습니다."));
        return new MemberDetailsImpl(member);
    }
}
