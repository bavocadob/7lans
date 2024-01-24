package jpabasic.project_7lans.repository;

import jpabasic.project_7lans.entity.MeetingSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingScheduleRepository extends JpaRepository<MeetingSchedule, Long> {
}
