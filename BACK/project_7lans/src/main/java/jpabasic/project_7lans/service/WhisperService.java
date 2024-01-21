package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.whisepr.WhisperRequestDto;
import jpabasic.project_7lans.dto.whisepr.WhisperResponseDto;
import jpabasic.project_7lans.entity.ChildVolunteerRelation;
import jpabasic.project_7lans.entity.Member;
import jpabasic.project_7lans.entity.Whisper;

import java.util.ArrayList;
import java.util.List;

public interface WhisperService {

    public void createWhisper(WhisperRequestDto.create whisperSaveDto);

    public List<WhisperResponseDto> findWhispers(ChildVolunteerRelation relation);

    public List<WhisperResponseDto> findUnreadWhispers(ChildVolunteerRelation relation);
}
