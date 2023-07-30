package com.ssafy.hellotoday.common.exception.handler;

import com.ssafy.hellotoday.api.dto.ExceptionResponseDto;
import com.ssafy.hellotoday.common.exception.CustomException;
import com.ssafy.hellotoday.common.exception.message.BaseErrorEnum;
import com.ssafy.hellotoday.common.exception.message.TokenErrorEnum;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.security.SignatureException;

@RestControllerAdvice
public class ControllerAdvice {

    @ExceptionHandler(CustomException.class)
    private ResponseEntity<ExceptionResponseDto> exception(CustomException e) {

        return ResponseEntity
                .status(e.getStatus())
                .body(ExceptionResponseDto.builder()
                        .code(e.getCode())
                        .message(e.getMessage())
                        .build());
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    private ResponseEntity<ExceptionResponseDto> paramException() {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ExceptionResponseDto.builder()
                        .code(BaseErrorEnum.INVALID_PARAM.getCode())
                        .message(BaseErrorEnum.INVALID_PARAM.getMessage())
                        .build());
    }

    @ExceptionHandler(JwtException.class)
    private ResponseEntity<ExceptionResponseDto> jwtSignatureException() {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ExceptionResponseDto.builder()
                        .code(TokenErrorEnum.INVALID_SIGNATURE.getCode())
                        .message(TokenErrorEnum.INVALID_SIGNATURE.getMessage())
                        .build());
    }
}
