package jpabasic.project_7lans.repository;

import jpabasic.project_7lans.entity.Child;
import jpabasic.project_7lans.entity.Relation;
import jpabasic.project_7lans.entity.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface RelationRepository extends JpaRepository<Relation, Long> {
    List<Relation> findByChild(Child child);

    List<Relation> findByVolunteer(Volunteer volunteer);

}
