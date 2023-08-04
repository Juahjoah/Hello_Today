package com.ssafy.hellotoday.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class MeetingRoomController {

    @PostMapping("/api-login/login")
    public ResponseEntity<Object> userAuthCheck(@RequestBody Map<String, String> map) {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
