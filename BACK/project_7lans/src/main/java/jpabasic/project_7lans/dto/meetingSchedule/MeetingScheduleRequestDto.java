package jpabasic.project_7lans.dto.meetingSchedule;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.entity.ScheduleType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class MeetingScheduleRequestDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class create {
        @NotNull(message = "[MeetingScheduleRequestDto.create] relationId 은 Null 일 수 없습니다.")
        private Long relationId;

        @NotNull(message = "[MeetingScheduleRequestDto.create] ScheduledStartTime 은 Null 일 수 없습니다.")
        //@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime ScheduledStartTime;

        @NotNull(message = "[MeetingScheduleRequestDto.create] ScheduledEndTime 은 Null 일 수 없습니다.")
        //@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
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

    //이미지 저장하기
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class saveImg{
        @NotNull(message = "[MeetingScheduleRequestDto.saveImgList] meetingId 는 Null 일 수 없습니다.")
        Long meetingId;
        @NotNull(message = "[MeetingScheduleRequestDto.saveImgList] meetingId 는 Null 일 수 없습니다.")
        MultipartFile file;

        @Builder
        saveImg(
                Long meetingId,
                MultipartFile file
        ){
            this.meetingId = meetingId;
            this.file = file;

        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class choiceImg{
        @NotNull(message = "[MeetingScheduleRequestDto.choiceImg] imgId 는 Null 일 수 없습니다.")
        Long imgId;

        @Builder
        choiceImg(
                Long imgId
        ){
            this.imgId = imgId;

        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class openMeeting{
        @NotNull(message = "[MeetingScheduleRequestDto.openMeeting] meetingId 는 Null 일 수 없습니다.")
        Long meetingId;

        @Builder
        openMeeting(
                Long meetingId
        ){
            this.meetingId = meetingId;

        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class closeMeeting{
        @NotNull(message = "[MeetingScheduleRequestDto.closeMeeting] meetingId 는 Null 일 수 없습니다.")
        Long meetingId;

        @Builder
        closeMeeting(
                Long meetingId
        ){
            this.meetingId = meetingId;

        }
    }
}
