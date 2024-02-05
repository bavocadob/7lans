package jpabasic.project_7lans.relation.controller;


import io.swagger.v3.oas.annotations.Operation;
import jpabasic.project_7lans.relation.dto.RelationRequestDto;
import jpabasic.project_7lans.relation.dto.RelationResponseDto;
import jpabasic.project_7lans.relation.service.RelationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/relation")
@RequiredArgsConstructor
public class RelationController {

    private final RelationService relationService;

    @Operation(summary = "관리자가 아동과 봉사자 친구 맺어주기")
    @PostMapping("/create")
    public ResponseEntity<RelationResponseDto.info> createRelation(@RequestBody RelationRequestDto.create requestDto) {
        return ResponseEntity.ok(relationService.createRelation(requestDto));
    }
}
