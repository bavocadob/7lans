package jpabasic.project_7lans.dto.manager;

import java.time.LocalDate;

public class ManagerRegisterReqDto {
    String email;
    String name;
    String password;
    String phoneNumber;
    LocalDate birth;
    Long childCenterId;
}
