package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.whisepr.WhisperRequestDto;
import jpabasic.project_7lans.dto.whisepr.WhisperResponseDto;
import jpabasic.project_7lans.entity.Relation;
import jpabasic.project_7lans.entity.Member;
import jpabasic.project_7lans.entity.Whisper;
import jpabasic.project_7lans.repository.ChildVolunteerRelationRepository;
import jpabasic.project_7lans.repository.MemberRepository;
import jpabasic.project_7lans.repository.WhisperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class WhisperServiceImpl implements WhisperService{

    private final WhisperRepository whisperRepository;
    // 생성
    // 속닥속닥 하나 작성.

    // 조회
    // 나와 상대방의 관계의 속닥속닥 리스트 전체 조회

    // 나와 상대방의 관계에서 내가 읽지 않은 속닥속닥 리스트 전체 조회

    // 속닥속닥 한 건 조회.
}
