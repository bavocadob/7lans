package jpabasic.project_7lans.repository;

import jpabasic.project_7lans.entity.Whisper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WhisperRepository extends JpaRepository<Whisper, Long> {


}
