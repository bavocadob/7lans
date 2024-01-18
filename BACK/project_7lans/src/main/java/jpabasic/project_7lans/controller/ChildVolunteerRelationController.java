package jpabasic.project_7lans.controller;

import jpabasic.project_7lans.entity.ChildVolunteerRelation;
import jpabasic.project_7lans.entity.Member;
import jpabasic.project_7lans.entity.ChildCenter;
import jpabasic.project_7lans.service.ChildVolunteerRelationServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/relations")
public class ChildVolunteerRelationController {

    private final ChildVolunteerRelationServiceImpl childVolunteerRelationService;

    public ChildVolunteerRelationController(ChildVolunteerRelationServiceImpl service) {
        this.childVolunteerRelationService = service;
    }

    @PostMapping
    public ResponseEntity<ChildVolunteerRelation> createRelation(@RequestBody Member volunteer, Member child, ChildCenter childCenter) {
        return ResponseEntity.ok(childVolunteerRelationService.createRelation(volunteer, child, childCenter));
    }

    @GetMapping("/volunteer/{volunteerId}")
    public ResponseEntity<List<ChildVolunteerRelation>> findByVolunteerId(@PathVariable Long volunteerId) {
        return ResponseEntity.ok(childVolunteerRelationService.findByVolunteerId(volunteerId));
    }

    @GetMapping("/child/{childId}")
    public ResponseEntity<List<ChildVolunteerRelation>> findByChildId(@PathVariable Long childId) {
        return ResponseEntity.ok(childVolunteerRelationService.findByChildId(childId));
    }
}
