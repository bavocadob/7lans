package jpabasic.project_7lans.meetingSchedule.dto;

import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.meetingSchedule.entity.ScheduleType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class MeetingScheduleResponseDto {

    //일정 달력 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class monthList{
        @NotNull(message = "[MeetingScheduleRequestDto.monthList] id 는 Null 일 수 없습니다.")
        Long meetingId;
        @NotNull(message = "[MeetingScheduleRequestDto.monthList] thumbnailImgPath 는 Null 일 수 없습니다.")
        String thumbnailImgPath;
        @NotNull(message = "[MeetingScheduleRequestDto.monthList] meetingUrl 는 Null 일 수 없습니다.")
        String meetingUrl;
        @NotNull(message = "[MeetingScheduleRequestDto.monthList] status 는 Null 일 수 없습니다.")
        ScheduleType status;
        @NotNull(message = "[MeetingScheduleRequestDto.monthList] day 는 Null 일 수 없습니다.")
        int day;

        @Builder
        monthList(
                Long meetingId,
                String thumbnailImgPath,
                String meetingUrl,
                ScheduleType status,
                int day
        ){
            this.meetingId = meetingId;
            this.thumbnailImgPath = thumbnailImgPath;
            this.meetingUrl = meetingUrl;
            this.status = status;
            this.day = day;
        }
    }

    //이미지 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class imgList{
        @NotNull(message = "[MeetingScheduleRequestDto.imgList] imgId 는 Null 일 수 없습니다.")
        Long imgId;
        @NotNull(message = "[MeetingScheduleRequestDto.imgList] imgPath 는 Null 일 수 없습니다.")
        String imgPath;


        @Builder
        imgList(
                Long imgId,
                String imgPath
        ){
            this.imgId = imgId;
            this.imgPath = imgPath;
        }
    }
}
