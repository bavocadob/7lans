package jpabasic.project_7lans.meetingSchedule.service;

import jpabasic.project_7lans.meetingSchedule.dto.MeetingScheduleRequestDto;
import jpabasic.project_7lans.meetingSchedule.dto.MeetingScheduleResponseDto;
import jpabasic.project_7lans.meetingSchedule.entity.MeetingSchedule;
import jpabasic.project_7lans.meetingSchedule.entity.ScheduleType;

import java.util.List;

public interface MeetingService {

    // =================================================================================================================
    // =================================================================================================================
    // 생성

    // 화상 미팅 생성
    public void create(MeetingScheduleRequestDto.create meeting);


    // =================================================================================================================
    // =================================================================================================================
    // 조회

    // 해당 관계의 해당 년도, 해당 년월 화상 미팅 정보들 조회
    public List<MeetingScheduleResponseDto.monthList> findMeetingsByRelation(MeetingScheduleRequestDto.meetings meetingsDto);

    //미팅 상태 조회(SCHEDULED)
    public boolean isScheduled(MeetingSchedule meetingSchedule);

    //미팅 상태 조회(OPENED)
    public boolean isOpened(MeetingSchedule meetingSchedule);

    //미팅 상태 조회(CLOSED)
    public boolean isClosed(MeetingSchedule meetingSchedule);


    // =================================================================================================================
    // =================================================================================================================
    // 수정

    // 미팅 열기
    public void openMeeting(MeetingScheduleRequestDto.openMeeting meetingDto);

    // 미팅 닫기
    public void closeMeeting(MeetingScheduleRequestDto.closeMeeting meetingDto);


    // =================================================================================================================
    // =================================================================================================================
    // 삭제

}
