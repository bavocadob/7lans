package jpabasic.project_7lans.meetingSchedule.repository;

import jpabasic.project_7lans.meetingSchedule.entity.MeetingImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingImageRepository extends JpaRepository<MeetingImage, Long> {
}
