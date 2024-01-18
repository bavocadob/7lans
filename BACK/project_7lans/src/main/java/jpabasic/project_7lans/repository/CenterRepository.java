package jpabasic.project_7lans.repository;

import jpabasic.project_7lans.entity.ChildCenter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CenterRepository extends JpaRepository<ChildCenter, Long> {
}
