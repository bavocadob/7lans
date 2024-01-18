package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.ChildDto;
import jpabasic.project_7lans.dto.MemberDto;
import jpabasic.project_7lans.entity.Child;
import jpabasic.project_7lans.entity.ChildCenter;
import jpabasic.project_7lans.entity.SocialType;
import jpabasic.project_7lans.repository.ChildRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class ChildServiceTest {


    @InjectMocks
    private ChildService childService;

    @Mock
    private ChildRepository childRepository;

    @Test
    void joinMember() {
        ChildCenter childCenter = null;

        ChildDto childDto = ChildDto.builder()
                .email("test@test.com")
                .socialId("socialId")
                .password("password")
                .phoneNumber("010-1234-5678")
                .profileImgPath("path/to/image.jpg")
                .socialType(SocialType.KAKAO) // 가정
                .birth(LocalDate.of(2010, 1, 1))
                .childCenter(childCenter)
                .specialContent("special content")
                .build();

        Child child = childDto.toEntity();

        when(childRepository.save(any(Child.class))).thenReturn(child);

        Child joinedChild = (Child) childService.joinMember((MemberDto) childDto);


        assertEquals(childDto.getEmail(), joinedChild.getEmail());
        assertEquals(childDto.getSocialId(), joinedChild.getSocialId());
        assertEquals(childDto.getPassword(), joinedChild.getPassword());
        assertEquals(childDto.getPhoneNumber(), joinedChild.getPhoneNumber());
        assertEquals(childDto.getProfileImgPath(), joinedChild.getProfileImgPath());
        assertEquals(childDto.getSocialType(), joinedChild.getSocialType());
        assertEquals(childDto.getBirth(), joinedChild.getBirth());
        assertEquals(childDto.getChildCenter(), joinedChild.getChildCenter());
        assertEquals(childDto.getSpecialContent(), joinedChild.getSpecialContent());


    }
}