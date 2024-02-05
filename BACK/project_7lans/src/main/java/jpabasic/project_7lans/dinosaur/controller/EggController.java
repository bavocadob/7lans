package jpabasic.project_7lans.dinosaur.controller;

import io.swagger.v3.oas.annotations.Operation;
import jpabasic.project_7lans.dinosaur.dto.EggResponseDto;
import jpabasic.project_7lans.dinosaur.service.EggService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class EggController {

    private final EggService eggService;

    @Operation(summary = "친구 관계에 있는 알 정보")
    @GetMapping("/egg/{id}")
    public ResponseEntity<EggResponseDto.detail> getMyEgg(@PathVariable Long id) {
        return ResponseEntity.ok(eggService.getMyEgg(id));
    }
}
