package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.MemberDto;
import jpabasic.project_7lans.entity.Member;

public interface MemberService {
    Member joinMember(MemberDto memberDto);
}
