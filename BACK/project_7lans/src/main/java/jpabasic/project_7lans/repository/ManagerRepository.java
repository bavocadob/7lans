package jpabasic.project_7lans.repository;

import jpabasic.project_7lans.entity.Manager;
import jpabasic.project_7lans.entity.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, Long> {

}
