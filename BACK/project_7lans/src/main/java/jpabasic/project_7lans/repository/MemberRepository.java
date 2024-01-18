package jpabasic.project_7lans.repository;

import jakarta.persistence.Id;
import jpabasic.project_7lans.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

}
