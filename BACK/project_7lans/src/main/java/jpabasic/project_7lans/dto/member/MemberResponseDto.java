package jpabasic.project_7lans.dto.member;

import lombok.Data;

public class MemberResponseDto {

    @Data
    public static class loginResponseDto{
        private Long id;

        public loginResponseDto(Long id) {
            this.id = id;
        }
    }
}
