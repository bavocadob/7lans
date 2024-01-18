package jpabasic.project_7lans.controller;

import jpabasic.project_7lans.entity.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Collections;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ChildVolunteerRelationControllerTest {

    @Autowired
    private MockMvc mockMvc;

//    @MockBean
//    private ChildVolunteerRelationServiceImpl childVolunteerRelationService;
//
//    @Test
//    public void findByVolunteerIdTest() throws Exception {
//        Member volunteer = new Volunteer();
//        volunteer.setId(1L);
//        Member child = new Child();
//        child.setId(2L);
//        ChildCenter childCenter = new ChildCenter();
//        childCenter.setId(1L);
//
//        ChildVolunteerRelation relation = new ChildVolunteerRelation();
//        relation.setChild(child);
//        relation.setVolunteer(volunteer);
//        relation.setChildCenter(childCenter);
//
//
//        when(childVolunteerRelationService.findByVolunteerId(1L))
//                .thenReturn(Collections.singletonList(relation));
//
//
//        MvcResult mvcResult = mockMvc.perform(get("/api/relations/volunteer/1"))
//                .andExpect(status().isOk())
//                .andExpect(MockMvcResultMatchers.jsonPath("$[0].volunteer.id").value(1L))
//                .andReturn();
//
//
//        String content = mvcResult.getResponse().getContentAsString();
//        System.out.println(content);
//        verify(childVolunteerRelationService, times(1)).findByVolunteerId(1L);
//    }

    @Test
    public void findByChildIdTest() throws Exception {

    }
}
