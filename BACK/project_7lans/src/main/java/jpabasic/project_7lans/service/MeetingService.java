package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.meetingSchedule.MeetingScheduleRequestDto;
import jpabasic.project_7lans.dto.meetingSchedule.MeetingScheduleResponseDto;
import jpabasic.project_7lans.entity.MeetingSchedule;
import jpabasic.project_7lans.entity.Relation;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MeetingService {

    public List<MeetingScheduleResponseDto.monthList> findMeetingsByRelation(Long relationId, int month);

    List<MeetingScheduleResponseDto.imgList> getImgList(Long meetingId);

    void create(MeetingScheduleRequestDto.create meeting);

    void changeThumbnail(Long imgId);

    Long saveImg(MeetingScheduleRequestDto.saveImg img);

    void choiceImg(List<MeetingScheduleRequestDto.choiceImg> imgs);

    void openMeeting(MeetingScheduleRequestDto.openMeeting meetingDto);

    void closeMeeting(MeetingScheduleRequestDto.closeMeeting meetingDto);
}
