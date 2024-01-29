package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.meetingSchedule.MeetingScheduleResponseDto;
import jpabasic.project_7lans.entity.MeetingSchedule;
import jpabasic.project_7lans.entity.Relation;

import java.util.List;

public interface MeetingService {

    public List<MeetingScheduleResponseDto.monthList> findMeetingsByRelation(Long relationId, int month);

    List<MeetingScheduleResponseDto.imgList> getImgList(Long meetingId);
}
