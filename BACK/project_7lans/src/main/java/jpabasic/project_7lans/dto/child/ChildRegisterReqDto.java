package jpabasic.project_7lans.dto.child;

import java.time.LocalDate;

public class ChildRegisterReqDto {
    String email;
    String name;
    String password;
    String phoneNumber;
    LocalDate birth;
    Long childCenterId;
}
