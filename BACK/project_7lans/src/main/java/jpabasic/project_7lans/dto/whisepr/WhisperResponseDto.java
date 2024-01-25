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


    // ===================================================================================================
    // 속닥속닥 1건 조회용
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detail {
        @NotNull(message = "[WhisperResponseDto.detail] whisperId 는 Null 일 수 없습니다.")
        private Long whisperId;

        @NotNull(message = "[WhisperResponseDto.detail] writer 는 Null 일 수 없습니다.")
        private Member writer;

        @NotNull(message = "[WhisperResponseDto.detail] relation 는 Null 일 수 없습니다.")
        private Relation relation;

        @NotNull(message = "[WhisperResponseDto.detail] content 는 Null 일 수 없습니다.")
        private String content;

        @NotNull(message = "[WhisperResponseDto.detail] createDate 는 Null 일 수 없습니다.")
        private LocalDateTime createDate;

        @NotNull(message = "[WhisperResponseDto.detail] readStatus 는 Null 일 수 없습니다.")
        private boolean readStatus;

        @Builder
        public static detail createDetail(
                Long whisperId,
                Member writer,
                Relation relation,
                String content,
                LocalDateTime createDate,
                boolean readStatus
        ) {
            return detail.builder()
                    .whisperId(whisperId)
                    .writer(writer)
                    .relation(relation)
                    .content(content)
                    .createDate(createDate)
                    .readStatus(readStatus)
                    .build();
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

    // ===================================================================================================
    // 메인화면 속닥속닥 리스트 조회용
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class whisperForList {
        @NotNull(message = "[WhisperResponseDto.detail] whisperId 는 Null 일 수 없습니다.")
        private Long whisperId;

        @NotNull(message = "[WhisperResponseDto.detail] childVolunteerRelationId 는 Null 일 수 없습니다.")
        private Relation relation;

        @NotNull(message = "[WhisperResponseDto.detail] readStatus 는 Null 일 수 없습니다.")
        private boolean readStatus;

        @Builder
        public static WhisperResponseDto.whisperForList createDetail(
                Long whisperId,
                Member writer,
                Relation relation,
                String content,
                LocalDateTime createDate,
                boolean readStatus
        ) {
            return WhisperResponseDto.whisperForList.builder()
                    .whisperId(whisperId)
                    .writer(writer)
                    .relation(relation)
                    .content(content)
                    .createDate(createDate)
                    .readStatus(readStatus)
                    .build();
        }

        public static WhisperResponseDto.whisperForList convertToWhisperForList(Whisper whisper) {
            return WhisperResponseDto.whisperForList.builder()
                    .whisperId(whisper.getId())
                    .writer(whisper.getWriter())
                    .content(whisper.getContent())
                    .createDate(whisper.getCreateDate())
                    .readStatus(whisper.isReadStatus())
                    .build();
        }
    }

    // ===================================================================================================
    // 여기부터 새로 추가

}
