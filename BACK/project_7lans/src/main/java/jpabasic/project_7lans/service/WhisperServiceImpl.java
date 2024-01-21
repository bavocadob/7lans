package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.whisepr.WhisperRequestDto;
import jpabasic.project_7lans.dto.whisepr.WhisperResponseDto;
import jpabasic.project_7lans.entity.ChildVolunteerRelation;
import jpabasic.project_7lans.entity.Member;
import jpabasic.project_7lans.entity.Whisper;
import jpabasic.project_7lans.repository.ChildVolunteerRelationRepository;
import jpabasic.project_7lans.repository.MemberRepository;
import jpabasic.project_7lans.repository.WhisperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class WhisperServiceImpl implements WhisperService {

    private final WhisperRepository whisperRepository;
    private final MemberRepository memberRepository;
    private final ChildVolunteerRelationRepository childVolunteerRelationRepository;

    @Override
    public void createWhisper(WhisperRequestDto.create whisperCreateDto) {
//        Whisper whisper = Whisper.builder()
//                .childVolunteerRelation(childVolunteerRelationRepository.getReferenceById(whisperCreateDto.getChildVolunteerRelationId()))
//                .content(whisperCreateDto.getContent())
//                .writer(memberRepository.findById(whisperCreateDto.getWriterId()))
//                .build();
//        whisperRepository.save(whisper);
    }

    public List<WhisperResponseDto> findWhispers(ChildVolunteerRelation relation) {
        return null;
//        return whisperRepository.findByChildVolunteerRelation(relation);
    }

    public List<WhisperResponseDto> findUnreadWhispers(ChildVolunteerRelation relation) {
        return null;
//        List<Whisper> whispers = whisperRepository.findByChildVolunteerRelation(relation);
//        List<Whisper> result = new ArrayList<>();
//        for (Whisper whisper : whispers) {
//            if (!whisper.isReadStatus()) {
//                result.add(whisper);
//            }
//        }
//        return result;
    }
}
