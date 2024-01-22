package jpabasic.project_7lans.dto.whisepr;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
public class WhisperRequestDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class create{
        @NotNull(message = "[WhisperRequestDto.create] writerId 는 Null 일 수 없습니다.")
        private Long writerId;
        @NotNull(message = "[WhisperRequestDto.create] childVolunteerRelationId 는 Null 일 수 없습니다.")
        private Long childVolunteerRelationId;
        @NotNull(message = "[WhisperRequestDto.create] content 는 Null 일 수 없습니다.")
        private String content;

        @Builder
        create(
                Long writerId,
                Long childVolunteerRelationId,
                String content
        ){
            this.writerId = writerId;
            this.childVolunteerRelationId = childVolunteerRelationId;
            this.content = content;
        }
    }
}
