package jpabasic.project_7lans.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class WhisperServiceImpl{
//
//    private final WhisperRepository whisperRepository;
//    private final MemberRepository memberRepository;
//    private final ChildVolunteerRelationRepository childVolunteerRelationRepository;
//
//    @Override
//    public void createWhisper(WhisperRequestDto.create whisperCreateDto) {
//
//        Relation relation = childVolunteerRelationRepository.findById(whisperCreateDto.getChildVolunteerRelationId())
//                .orElseThrow(() -> new IllegalArgumentException("[WhisperServiceImpl.createWhisper] 존재하지 않는 관계 ID입니다."));
//
//        Member writer = memberRepository.findById(whisperCreateDto.getWriterId())
//                .orElseThrow(() -> new IllegalArgumentException("[WhisperServiceImpl.createWhisper] 존재하지 않는 멤버 ID입니다."));
//
//        Whisper whisper = Whisper.builder()
//                .content(whisperCreateDto.getContent())
//                .writer(writer)
//                .build();
//        whisperRepository.save(whisper);
//    }
//
//    @Override
//    public List<WhisperResponseDto.detail> findWhispers(Long relationId) {
//        Relation relation = childVolunteerRelationRepository.findById(relationId)
//                .orElseThrow(() -> new IllegalArgumentException("[WhisperServiceImpl.findWhisper] 존재하지 않는 관계 ID입니다."));
//
//        return whisperRepository.findByChildVolunteerRelation(relation).stream()
//                .map(WhisperResponseDto::convertToDetailDto)
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public List<WhisperResponseDto.detail> findUnreadWhispers(Long relationId) {
//        Relation relation = childVolunteerRelationRepository.findById(relationId)
//                .orElseThrow(() -> new IllegalArgumentException("[WhisperServiceImpl.findUnreadWhispers] 존재하지 않는 관계 ID입니다."));
//
//        return whisperRepository.findByChildVolunteerRelation(relation).stream()
//                .filter(whisper -> !whisper.isReadStatus()) // 읽지 않은 Whisper만 필터링
//                .map(WhisperResponseDto::convertToDetailDto)
//                .collect(Collectors.toList());
//    }

}
