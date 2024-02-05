package jpabasic.project_7lans.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/testMethod")
    public ResponseEntity<String> testMethod(){
        String msg = "Test 1232341234234146sadfsdafsdfsdafsdada2423";
        return new ResponseEntity(msg, HttpStatus.OK);
    }
}