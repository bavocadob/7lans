package jpabasic.project_7lans.repository;

import jpabasic.project_7lans.entity.Child;
import jpabasic.project_7lans.entity.ChildCenter;
import jpabasic.project_7lans.entity.ChildVolunteerRelation;
import jpabasic.project_7lans.entity.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RelationRepository extends JpaRepository<ChildVolunteerRelation, Long> {
    List<ChildVolunteerRelation> findByVolunteer(Volunteer volunteer);

    List<ChildVolunteerRelation> findByChild(Child child);

    List<ChildVolunteerRelation> findByChildCenter(ChildCenter center);

}
