package jpabasic.project_7lans.repository;

import jpabasic.project_7lans.entity.Manager;
import jpabasic.project_7lans.entity.MeetingImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingImageRepository extends JpaRepository<MeetingImage, Long> {
}
