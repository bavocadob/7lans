package jpabasic.project_7lans.childCenter.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ChildCenterRequestDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detailById{
        @NotNull(message = "[ChildCenterRequestDto.detailById] childCenterId 는 Null 일 수 없습니다.")
        private Long childCenterId;

        @Builder detailById(
                Long childCenterId
        ){
            this.childCenterId = childCenterId;
        }
    }
}
