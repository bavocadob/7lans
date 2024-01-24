package jpabasic.project_7lans.dto.whisepr;

import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.entity.Relation;
import jpabasic.project_7lans.entity.Member;
import jpabasic.project_7lans.entity.Whisper;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class WhisperResponseDto {


    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detail {
        @NotNull(message = "[WhisperResponseDto.detail] whisperId 는 Null 일 수 없습니다.")
        private Long whisperId;

        @NotNull(message = "[WhisperResponseDto.detail] writer 는 Null 일 수 없습니다.")
        private Member writer;

        @NotNull(message = "[WhisperResponseDto.detail] childVolunteerRelationId 는 Null 일 수 없습니다.")
        private Relation relation;

        @NotNull(message = "[WhisperResponseDto.detail] content 는 Null 일 수 없습니다.")
        private String content;

        @NotNull(message = "[WhisperResponseDto.detail] createDate 는 Null 일 수 없습니다.")
        private LocalDateTime createDate;

        @NotNull(message = "[WhisperResponseDto.detail] readStatus 는 Null 일 수 없습니다.")
        private boolean readStatus;

        @Builder
        detail(
                Long whisperId,
                Member writer,
                Relation relation,
                String content,
                LocalDateTime createDate,
                boolean readStatus
        ){
            this.whisperId = whisperId;
            this.writer = writer;
            this.relation = relation;
            this.content = content;
            this.createDate = createDate;
            this.readStatus = readStatus;
        }


    }

    public static WhisperResponseDto.detail convertToDetailDto(Whisper whisper) {
        return WhisperResponseDto.detail.builder()
                .whisperId(whisper.getId())
                .writer(whisper.getWriter())
                .content(whisper.getContent())
                .createDate(whisper.getCreateDate())
                .readStatus(whisper.isReadStatus())
                .build();
    }



}
