package com.ssafy.hellotoday.api.dto.chat;

import com.ssafy.hellotoday.common.util.constant.MessageType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    private MessageType type;
    private int roomId;
    private int senderId;
    private String content;

    public void newConnect() {
        this.type = MessageType.ENTER;
    }

    public void newMessage() {
        this.type = MessageType.TALK;
    }
}
