package jpabasic.project_7lans.service;

import jpabasic.project_7lans.entity.ChildVolunteerRelation;
import jpabasic.project_7lans.entity.Member;
import jpabasic.project_7lans.entity.Whisper;
import jpabasic.project_7lans.repository.WhisperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class WhisperServiceImpl implements WhisperService {

    public final WhisperRepository whisperRepository;

    public void saveWhisper(ChildVolunteerRelation relation, Member writer, String content) {
        Whisper whisper = Whisper.builder()
                .childVolunteerRelation(relation)
                .content(content)
                .writer(writer)
                .build();
        whisperRepository.save(whisper);
    }

    public List<Whisper> findWhispers(ChildVolunteerRelation relation) {
        return whisperRepository.findByChildVolunteerRelation(relation);
    }

    public List<Whisper> findUnreadWhispers(ChildVolunteerRelation relation) {
        List<Whisper> whispers = whisperRepository.findByChildVolunteerRelation(relation);
        List<Whisper> result = new ArrayList<>();
        for (Whisper whisper : whispers) {
            if (!whisper.isReadStatus()) {
                result.add(whisper);
            }
        }
        return result;
    }
}
