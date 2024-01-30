package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.relation.RelationRequestDto;
import jpabasic.project_7lans.dto.relation.RelationResponseDto;
import jpabasic.project_7lans.entity.Relation;

import java.util.List;

public interface RelationService {

    public RelationResponseDto.info createRelation(RelationRequestDto.create requestDto);

    public void deleteRelation(RelationRequestDto.delete requestDto);

}
