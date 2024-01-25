package jpabasic.project_7lans.controller;

import jpabasic.project_7lans.dto.whisepr.WhisperRequestDto;
import jpabasic.project_7lans.dto.whisepr.WhisperResponseDto;
import jpabasic.project_7lans.service.WhisperServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

// 속닥속닥 관련 컨트롤러
@RestController
@RequiredArgsConstructor
public class WhisperController {
    private final WhisperServiceImpl whisperServiceImpl;

    // 속닥속닥 1건 작성
    @PostMapping(path = "/whisper")
    public WhisperResponseDto.detail createWhisper(){

        return null;
    }

    // 속닥속닥 1건 조회
    @GetMapping(path = "/whisper/{whisperId}")
    public WhisperResponseDto.detail whisperDetail(@PathVariable Long whisperId){

        return null;
    }

    // 내 관계에 포함된 속닥속닥 여러건 조회
    @GetMapping(path = "/whisper/list")
    public WhisperResponseDto.detail whisperList(){

        return null;
    }

}
