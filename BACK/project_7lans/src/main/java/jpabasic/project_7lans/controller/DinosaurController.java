package jpabasic.project_7lans.controller;

import io.swagger.v3.oas.annotations.Operation;
import jpabasic.project_7lans.dto.dinosaur.DinosaurRequestDto;
import jpabasic.project_7lans.dto.dinosaur.DinosaurResponseDto;
import jpabasic.project_7lans.dto.egg.EggResponseDto;
import jpabasic.project_7lans.service.DinosaurService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping
public class DinosaurController {

    private final DinosaurService dinosaurService;

    // TODO URL 및 PathVariable 추후 수정
    @GetMapping("/dinosaurs/{id}")
    @Operation(summary = "유저가 가지고 있는 모든 공룡 리스트")
    public ResponseEntity<DinosaurResponseDto.list> getAllDinosaursForMember(@PathVariable Long id) {
        return ResponseEntity.ok(dinosaurService.getAllDinosaursForMember(id));
    }

    @Operation(summary = "공룡 부화")
    @PostMapping("/dinosaurs/hatch")
    public ResponseEntity<DinosaurResponseDto.hatch> acquireDinosaur(@RequestBody DinosaurRequestDto.acquire requestDto) {
        try {
            return new ResponseEntity<DinosaurResponseDto.hatch>(dinosaurService.acquireDinosaur(requestDto), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "유저가 가지고 있는 대표 공룡")
    @PutMapping("/collection")
    public ResponseEntity<Void> changeMyDinosaur(@RequestBody DinosaurRequestDto.change requestDto) {
        dinosaurService.changeMyDinosaur(requestDto);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "친구 관계에 있는 알 정보")
    @GetMapping("/egg/{id}")
    public ResponseEntity<EggResponseDto.detail> getMyEgg(@PathVariable Long id) {
        return ResponseEntity.ok(dinosaurService.getMyEgg(id));
    }
}
