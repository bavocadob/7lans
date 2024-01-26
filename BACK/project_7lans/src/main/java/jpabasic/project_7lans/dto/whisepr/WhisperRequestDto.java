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
        @NotNull(message = "[WhisperRequestDto.create] relationId 는 Null 일 수 없습니다.")
        private Long relationId;
        @NotNull(message = "[WhisperRequestDto.create] content 는 Null 일 수 없습니다.")
        private String content;

        @Builder
        public static WhisperRequestDto.create create(
                Long writerId,
                Long relationId,
                String content
        ){
            return WhisperRequestDto.create.builder()
                    .writerId(writerId)
                    .relationId(relationId)
                    .content(content)
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detailById{
        @NotNull(message = "[WhisperRequestDto.detailById] whisperId 는 Null 일 수 없습니다.")
        private Long whisperId;

        @Builder
        public static WhisperRequestDto.detailById createDto(
                Long whisperId
        ){
            return WhisperRequestDto.detailById.builder()
                    .whisperId(whisperId)
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class listById{
        @NotNull(message = "[WhisperRequestDto.detailById] whisperId 는 Null 일 수 없습니다.")
        private Long relationId;

        @Builder
        public static WhisperRequestDto.listById createDto(
                Long relationId
        ){
            return WhisperRequestDto.listById.builder()
                    .relationId(relationId)
                    .build();
        }
    }
}
