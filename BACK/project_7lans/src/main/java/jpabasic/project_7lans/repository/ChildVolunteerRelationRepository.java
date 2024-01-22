package jpabasic.project_7lans.repository;

import jpabasic.project_7lans.entity.Child;
import jpabasic.project_7lans.entity.ChildVolunteerRelation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChildVolunteerRelationRepository extends JpaRepository<ChildVolunteerRelation, Long> {
    List<ChildVolunteerRelation> findByChild(Child child);
}
