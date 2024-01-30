package jpabasic.project_7lans.controller;


import jpabasic.project_7lans.dto.relation.RelationRequestDto;
import jpabasic.project_7lans.dto.relation.RelationResponseDto;
import jpabasic.project_7lans.service.RelationService;
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

    @PostMapping("/create")
    public ResponseEntity<RelationResponseDto.info> createRelation(@RequestBody RelationRequestDto.create requestDto) {
        return ResponseEntity.ok(relationService.createRelation(requestDto));
    }

}
