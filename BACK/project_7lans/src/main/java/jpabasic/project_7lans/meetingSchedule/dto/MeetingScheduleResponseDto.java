package jpabasic.project_7lans.meetingSchedule.dto;

import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.activityLog.dto.ActivityLogResponseDto;
import jpabasic.project_7lans.activityLog.entity.ActivityLog;
import jpabasic.project_7lans.meetingSchedule.entity.MeetingSchedule;
import jpabasic.project_7lans.meetingSchedule.entity.ScheduleType;
import jpabasic.project_7lans.relation.entity.Relation;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

public class MeetingScheduleResponseDto {

    /*
    위에서부터 아래로 내려가는 방향 순서대로
    생성, 조회, 수정, 삭제의 코드가 있다.
    가장 아래는 현재 사용되지 않으면서 주석처리된 코드들이 있다.
     */


    // =================================================================================================================
    // =================================================================================================================
    // 생성


    // =================================================================================================================
    // =================================================================================================================
    // 조회

    // 일정 년도, 일정 월의 화상 미팅 조회
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
        Integer day;
        @NotNull(message = "[MeetingScheduleRequestDto.monthList] time 는 Null 일 수 없습니다.")
        LocalTime time;

        // 바로 아래의 DTO를 사용할 것
        @Builder
        monthList(
                Long meetingId,
                String thumbnailImgPath,
                String meetingUrl,
                ScheduleType status,
                Integer day,
                LocalTime time
        ){
            this.meetingId = meetingId;
            this.thumbnailImgPath = thumbnailImgPath;
            this.meetingUrl = meetingUrl;
            this.status = status;
            this.day = day;
            this.time = time;
        }
    }

    // monthList 를 위한 DTO
    public static MeetingScheduleResponseDto.monthList toMonthListDto(MeetingSchedule meetingSchedule){
        return monthList.builder()
                .meetingId(meetingSchedule.getId())
                .thumbnailImgPath(meetingSchedule.getThumbnailImgPath())
                .meetingUrl(meetingSchedule.getMeetingUrl())
                .status(meetingSchedule.getStatus())
                .day(meetingSchedule.getScheduledStartTime().getDayOfMonth())
                .time(meetingSchedule.getScheduledStartTime().toLocalTime())
                .build();
    }

    // =================================================================================================================
    // =================================================================================================================
    // 수정

    // =================================================================================================================
    // =================================================================================================================
    // 삭제

    // =================================================================================================================
    // =================================================================================================================
    // 일단 주석된 코드들

//    //이미지 조회
//    @Getter
//    @NoArgsConstructor(access = AccessLevel.PROTECTED)
//    public static class imgList{
//        @NotNull(message = "[MeetingScheduleRequestDto.imgList] imgId 는 Null 일 수 없습니다.")
//        Long imgId;
//        @NotNull(message = "[MeetingScheduleRequestDto.imgList] imgPath 는 Null 일 수 없습니다.")
//        String imgPath;
//
//
//        @Builder
//        imgList(
//                Long imgId,
//                String imgPath
//        ){
//            this.imgId = imgId;
//            this.imgPath = imgPath;
//        }
//    }
}
