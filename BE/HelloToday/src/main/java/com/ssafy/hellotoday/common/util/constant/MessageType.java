package com.ssafy.hellotoday.common.util.constant;

public enum MessageType {
    ENTER("입장"),
    TALK("채팅");

    private final String name;

    MessageType(String name) {
        this.name = name;
    }
}
