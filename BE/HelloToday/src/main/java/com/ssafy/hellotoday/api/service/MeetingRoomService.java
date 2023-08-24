package com.ssafy.hellotoday.api.service;

import com.ssafy.hellotoday.api.dto.BaseResponseDto;
import com.ssafy.hellotoday.api.dto.meetingroom.request.RoomCreateRequestDto;
import com.ssafy.hellotoday.api.dto.meetingroom.response.MeetingRoomQuestionResponseDto;
import com.ssafy.hellotoday.common.exception.CustomException;
import com.ssafy.hellotoday.common.exception.message.MeetingRoomErrorEnum;
import com.ssafy.hellotoday.common.exception.validator.MeetingRoomValidator;
import com.ssafy.hellotoday.common.util.constant.MeetingRoomResponseEnum;
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

    private final MeetingRoomValidator meetingRoomValidator;

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
        Optional<MeetingRoom> roomOptional = meetingRoomRepository.findByIdWithQuestionId(roomId);
        MeetingRoom room = meetingRoomValidator.validMeetingRoom(roomOptional);

        int questionId = getQuestionId(room);

        Optional<MeetingRoomQuestion> questionOptional = meetingRoomQuestionRepository.findById(questionId);
        MeetingRoomQuestion question = meetingRoomValidator.validateMeetingRoomQuestion(questionOptional);

        room.updateQuestion(question);

        return BaseResponseDto.builder()
                .success(true)
                .message(MeetingRoomResponseEnum.SUCCESS_MEETINGROOM_QUESTION.getName())
                .data(MeetingRoomQuestionResponseDto.builder()
                        .id(question.getQuestionId())
                        .content(question.getContent())
                        .build())
                .build();
    }

    private int getQuestionId(MeetingRoom room) {
        long count = meetingRoomQuestionRepository.count();
        int questionId = room.getQuestion().getQuestionId();
        if (questionId >= count) questionId = 0;
        questionId++;
        return questionId;
    }

    private void checkQuestion(Optional<MeetingRoomQuestion> question) {
        if (question.isEmpty()) throw CustomException.builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .code(MeetingRoomErrorEnum.FAILED_MEETINGROOM_QUESTION.getCode())
                .message(MeetingRoomErrorEnum.FAILED_MEETINGROOM_QUESTION.getMessage())
                .build();
    }
}
