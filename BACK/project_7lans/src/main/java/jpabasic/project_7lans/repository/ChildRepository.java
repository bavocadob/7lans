package jpabasic.project_7lans.repository;

import jpabasic.project_7lans.entity.Child;
import jpabasic.project_7lans.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChildRepository extends JpaRepository<Child, Long> {

}
