package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.meetingroom.request.RoomCreateRequestDto;
import com.ssafy.hellotoday.api.dto.meetingroom.response.MeetingRoomQuestionResponseDto;
import com.ssafy.hellotoday.common.exception.CustomException;
import com.ssafy.hellotoday.db.entity.MeetingRoom;
import com.ssafy.hellotoday.db.entity.MeetingRoomQuestion;
import com.ssafy.hellotoday.db.entity.Member;
import com.ssafy.hellotoday.db.repository.MeetingRoomQuestionRepository;
import com.ssafy.hellotoday.db.repository.MeetingRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MeetingRoomService {
    private final MeetingRoomRepository meetingRoomRepository;
    private final MeetingRoomQuestionRepository meetingRoomQuestionRepository;

    @Transactional
    public int saveRoomInfo(Member member, RoomCreateRequestDto requestDto, String sessionId) {
        Optional<MeetingRoomQuestion> question = meetingRoomQuestionRepository.findById(1);
        checkQuestion(question);

        MeetingRoom meetingRoom = MeetingRoom.builder()
                .member(member)
                .sessionId(sessionId)
                .name(requestDto.getTitle())
                .description(requestDto.getDescription())
                .memberLimit(requestDto.getMemberLimit())
                .build();

        meetingRoom.updateQuestion(question.get());
        return meetingRoomRepository.save(meetingRoom).getMeetingRoomId();
    }

    @Transactional
    public BaseResponseDto getQuestion(int roomId) {
        MeetingRoom room = meetingRoomRepository.findByIdWithQuestionId(roomId)
                .orElseThrow(() -> new IllegalArgumentException("질문 조회 실패"));

        long count = meetingRoomQuestionRepository.count();
        int questionId = room.getQuestion().getQuestionId();
        System.out.println(questionId);
        if (questionId >= count) questionId = 0;
        questionId++;
        MeetingRoomQuestion question = meetingRoomQuestionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("질문 조회 실패"));

        System.out.println(MeetingRoomQuestionResponseDto.builder()
                .id(question.getQuestionId())
                .content(question.getContent()));
        room.updateQuestion(question);
        return BaseResponseDto.builder()
                .success(true)
                .message("질문 조회 성공")
                .data(MeetingRoomQuestionResponseDto.builder()
                        .id(question.getQuestionId())
                        .content(question.getContent())
                        .build())
                .build();
    }

    public BaseResponseDto deleteConnection(int roomId) {
        MeetingRoom room = meetingRoomRepository.findById(roomId).orElseThrow();
        return null;
    }

    private void checkQuestion(Optional<MeetingRoomQuestion> question) {
        if (question.isEmpty()) throw CustomException.builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .code(8000)
                .message("미팅룸 질문 조회 실패")
                .build();
    }
}
