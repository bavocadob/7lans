package jpabasic.project_7lans.controller;

import jpabasic.project_7lans.dto.child.ChildRequestDto;
import jpabasic.project_7lans.dto.child.ChildResponseDto;
import jpabasic.project_7lans.entity.Child;
import jpabasic.project_7lans.entity.ChildVolunteerRelation;
import jpabasic.project_7lans.repository.ChildRepository;
import jpabasic.project_7lans.service.ChildVolunteerRelationService;
import jpabasic.project_7lans.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/vol")
@RequiredArgsConstructor
public class VolunteerController {

    private final ChildVolunteerRelationService relationService;
    private final MemberService memberService;

    //해당 봉사자의 아동 리스트 반환
    @GetMapping("/list/{volunteerId}")
    public ResponseEntity<?> childList(@PathVariable("volunteerId") Long volunteerId){
        try{

            List<ChildVolunteerRelation> relations = relationService.childList(volunteerId);
            List<ChildResponseDto.list> children = new ArrayList<>();

            for(ChildVolunteerRelation relation : relations){
                //children.add((Child) relation.getChild());
                //dto로 변환해서 가져와야함
                Child child = (Child) relation.getChild();
                children.add(ChildResponseDto.list.builder()
                        .childId(child.getId())
                        .childName(child.getName())
                        .childBirth(child.getBirth())
                        .childProfileImagePath(child.getProfileImgPath())
                        .childChildCenterId(child.getChildCenter().getId())
                        .childSpecialContent(child.getSpecialContent())
                        .build());

            }
            return new ResponseEntity<List<ChildResponseDto.list>>(children, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/child/{childId}")
    public ResponseEntity<?> childDetail(@PathVariable("childId") Long childId){
        try{
            ChildResponseDto.detail child = memberService.childDetailById(ChildRequestDto.detailById.builder()
                    .childId(childId).build());

            return new ResponseEntity<ChildResponseDto.detail>(child, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
