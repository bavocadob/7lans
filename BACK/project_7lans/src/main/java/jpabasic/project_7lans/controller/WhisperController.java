package jpabasic.project_7lans.controller;

import jakarta.validation.Valid;
import jpabasic.project_7lans.dto.whisepr.WhisperRequestDto;
import jpabasic.project_7lans.dto.whisepr.WhisperResponseDto;
import jpabasic.project_7lans.service.WhisperServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// 속닥속닥 관련 컨트롤러
@RestController
@RequiredArgsConstructor
public class WhisperController {
    private final WhisperServiceImpl whisperServiceImpl;

    // 속닥속닥 1건 작성(작성자 id, 상대방과의 관계 id, 작성 내용 content 받는다.)
    @PostMapping(path = "/whisper")
    public ResponseEntity createWhisper(@RequestBody WhisperRequestDto.create whisperCreateDto){
        try{
            whisperServiceImpl.createWhisper(whisperCreateDto);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // 속닥속닥 1건 조회 (관계 Id, 해당 속닥속닥 Id 필요)
    @GetMapping(path = "/whisper/{whisperId}")
    public ResponseEntity<WhisperResponseDto.detail> whisperDetail(@PathVariable Long whisperId){
        try{
            WhisperResponseDto.detail whisperDTo = whisperServiceImpl.whisperDetail(WhisperRequestDto.detailById.createDto(whisperId));
            return new ResponseEntity<WhisperResponseDto.detail>(whisperDTo,HttpStatus.OK);

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 나와 상대방의 관계의 속닥속닥 리스트 전체 조회 (관계 Id로 조회)
    @GetMapping(path = "/whisper/list/{relationId}")
    public ResponseEntity<List<WhisperResponseDto.detail>> whisperList(@PathVariable @Valid Long relationId){
        try{
            List<WhisperResponseDto.detail> whisperList = whisperServiceImpl.whisperList(WhisperRequestDto.listById.createDto(relationId));
            return new ResponseEntity<List<WhisperResponseDto.detail>>(whisperList,HttpStatus.OK);

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 나와 상대방의 관계에서 내가 읽지 않은 속닥속닥 리스트 전체 조회 (관계 Id 필요)
    @GetMapping(path = "/whisper/unreadList/{relationId}")
    public ResponseEntity<List<WhisperResponseDto.detail>> whisperUnreadList(@PathVariable @Valid Long relationId){
        try{
            List<WhisperResponseDto.detail> whisperList = whisperServiceImpl.whisperListUnread(WhisperRequestDto.listById.createDto(relationId));
            return new ResponseEntity<List<WhisperResponseDto.detail>>(whisperList,HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
