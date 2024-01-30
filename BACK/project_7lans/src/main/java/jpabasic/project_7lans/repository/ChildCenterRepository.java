package jpabasic.project_7lans.repository;

import jpabasic.project_7lans.dto.childCenter.ChildCenterResponseDto;
import jpabasic.project_7lans.entity.ChildCenter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChildCenterRepository extends JpaRepository<ChildCenter, Long> {
}
