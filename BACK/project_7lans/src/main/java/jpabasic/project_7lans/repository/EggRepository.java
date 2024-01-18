package jpabasic.project_7lans.repository;

import jpabasic.project_7lans.entity.ChildVolunteerRelation;
import jpabasic.project_7lans.entity.Egg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EggRepository extends JpaRepository<Egg, Long> {

    List<Egg> findByRelation(ChildVolunteerRelation relation);
}
