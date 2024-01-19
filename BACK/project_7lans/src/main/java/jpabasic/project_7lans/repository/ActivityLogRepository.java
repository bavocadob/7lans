package jpabasic.project_7lans.repository;

import jpabasic.project_7lans.entity.ActivityLog;
import jpabasic.project_7lans.entity.ChildCenter;
import jpabasic.project_7lans.entity.MeetingSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
    Optional<ActivityLog> findByMeetingSchedule(MeetingSchedule meetingSchedule);
    List<ActivityLog> findByChildCenter(ChildCenter childCenter);
}
