package jpabasic.project_7lans.repository;

import jpabasic.project_7lans.entity.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
}
