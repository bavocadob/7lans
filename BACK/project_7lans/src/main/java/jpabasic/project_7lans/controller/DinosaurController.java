package jpabasic.project_7lans.controller;

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
    public ResponseEntity<DinosaurResponseDto.list> getAllDinosaursForMember(@PathVariable Long id) {
        return ResponseEntity.ok(dinosaurService.getAllDinosaursForMember(id));
    }

    @PostMapping("/dinosaurs/hatch")
    public ResponseEntity<DinosaurResponseDto.hatch> acquireDinosaur(@RequestBody DinosaurRequestDto.acquire requestDto) {
        try {
            return new ResponseEntity<DinosaurResponseDto.hatch>(dinosaurService.acquireDinosaur(requestDto), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/collection")
    public ResponseEntity<Void> changeMyDinosaur(@RequestBody DinosaurRequestDto.change requestDto) {
        dinosaurService.changeMyDinosaur(requestDto);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/egg/{id}")
    public ResponseEntity<EggResponseDto.detail> getMyEgg(@PathVariable Long id) {
        return ResponseEntity.ok(dinosaurService.getMyEgg(id));
    }




}
