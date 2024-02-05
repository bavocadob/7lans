package jpabasic.project_7lans.meetingSchedule.service;

import jpabasic.project_7lans.meetingSchedule.dto.MeetingScheduleRequestDto;
import jpabasic.project_7lans.meetingSchedule.dto.MeetingScheduleResponseDto;

import java.util.List;

public interface MeetingService {

    public List<MeetingScheduleResponseDto.monthList> findMeetingsByRelation(MeetingScheduleRequestDto.meetings meetingsDto);

    List<MeetingScheduleResponseDto.imgList> getImgList(Long meetingId);

    void create(MeetingScheduleRequestDto.create meeting);

    void changeThumbnail(Long imgId);

    Long saveImg(MeetingScheduleRequestDto.saveImg img);

    void choiceImg(List<MeetingScheduleRequestDto.choiceImg> imgs);

    void openMeeting(MeetingScheduleRequestDto.openMeeting meetingDto);

    void closeMeeting(MeetingScheduleRequestDto.closeMeeting meetingDto);
}
