package jpabasic.project_7lans.repository;

import jakarta.persistence.Id;
import jpabasic.project_7lans.entity.Child;
import jpabasic.project_7lans.entity.Member;
import jpabasic.project_7lans.entity.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
//    List<Member> findByMemberType(String memberType);

    public List<Member> findByNameLike(String volunteerName);
}
