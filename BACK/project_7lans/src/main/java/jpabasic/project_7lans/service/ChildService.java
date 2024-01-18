package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.ChildDto;
import jpabasic.project_7lans.dto.MemberDto;
import jpabasic.project_7lans.entity.Child;
import jpabasic.project_7lans.entity.Member;
import jpabasic.project_7lans.repository.ChildRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ChildService implements MemberService {

    private final ChildRepository childRepository;

    @Override
    public Member joinMember(MemberDto memberDto) {
        ChildDto childDto = (ChildDto) memberDto;
        Child child = childDto.toEntity();
        return (Member)childRepository.save(child);
    }
}
