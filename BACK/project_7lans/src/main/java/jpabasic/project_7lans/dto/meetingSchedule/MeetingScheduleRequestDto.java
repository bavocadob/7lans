package jpabasic.project_7lans.dto.meetingSchedule;

import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.entity.ScheduleType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class MeetingScheduleRequestDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class create {
        @NotNull(message = "[MeetingScheduleRequestDto.create] relationId 은 Null 일 수 없습니다.")
        private Long relationId;
        @NotNull(message = "[MeetingScheduleRequestDto.create] ScheduledStartTime 은 Null 일 수 없습니다.")
        private LocalDateTime ScheduledStartTime;
        @NotNull(message = "[MeetingScheduleRequestDto.create] ScheduledEndTime 은 Null 일 수 없습니다.")
        private LocalDateTime ScheduledEndTime;

        @Builder
        create(
                Long relationId,
                LocalDateTime ScheduledStartTime,
                LocalDateTime ScheduledEndTime
        ){
            this.relationId = relationId;
            this.ScheduledStartTime = ScheduledStartTime;
            this.ScheduledEndTime = ScheduledEndTime;

        }
    }
}
