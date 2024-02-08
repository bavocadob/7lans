package jpabasic.project_7lans.meetingSchedule.dto;

import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.meetingSchedule.entity.ScheduleType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
