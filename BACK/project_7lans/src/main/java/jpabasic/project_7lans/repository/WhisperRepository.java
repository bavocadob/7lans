package jpabasic.project_7lans.repository;

import jpabasic.project_7lans.entity.Relation;
import jpabasic.project_7lans.entity.Whisper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WhisperRepository extends JpaRepository<Whisper, Long> {

}
