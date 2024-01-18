package jpabasic.project_7lans.service;

import jpabasic.project_7lans.entity.ChildVolunteerRelation;
import jpabasic.project_7lans.entity.Member;
import jpabasic.project_7lans.entity.Whisper;

import java.util.ArrayList;
import java.util.List;

public interface WhisperService {

    public void saveWhisper(ChildVolunteerRelation relation, Member writer, String content);

    public List<Whisper> findWhispers(ChildVolunteerRelation relation);

    public List<Whisper> findUnreadWhispers(ChildVolunteerRelation relation);
}
