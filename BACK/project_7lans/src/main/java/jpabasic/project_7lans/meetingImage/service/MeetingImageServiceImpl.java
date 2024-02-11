package jpabasic.project_7lans.meetingImage.service;

import jakarta.validation.Valid;
import jpabasic.project_7lans.meetingImage.dto.MeetingImageRequestDto;
import jpabasic.project_7lans.meetingImage.dto.MeetingImageResponseDto;
import jpabasic.project_7lans.meetingImage.entity.MeetingImage;
import jpabasic.project_7lans.meetingImage.repository.MeetingImageRepository;
import jpabasic.project_7lans.meetingSchedule.entity.MeetingSchedule;
import jpabasic.project_7lans.meetingSchedule.repository.MeetingScheduleRepository;
import jpabasic.project_7lans.member.entity.Volunteer;
import jpabasic.project_7lans.member.repository.VolunteerRepository;
import jpabasic.project_7lans.relation.entity.Relation;
import jpabasic.project_7lans.relation.repository.RelationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.*;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MeetingImageServiceImpl implements MeetingImageService{

    private final MeetingScheduleRepository meetingScheduleRepository;
    private final MeetingImageRepository meetingImageRepository;
    private final VolunteerRepository volunteerRepository;
    private final RelationRepository relationRepository;

    // ================================================================================
    // ================================================================================
    // 생성

    //사진 1장 저장(캡쳐하면 선택해서 무조건 저장)
    @Transactional
    public void saveMeetingImage(@RequestBody @Valid MeetingImageRequestDto.saveMeetingImage saveReqDto){
        log.info("[MeetingImageServiceImpl.saveMeetingImage] start... ");

        //미팅 스케줄 찾기
        MeetingSchedule meetingSchedule = meetingScheduleRepository.findById(saveReqDto.getMeetingId())
                        .orElseThrow(()-> new IllegalArgumentException("no such meetingSchedule. meetingId:"+saveReqDto.getMeetingId()));

        // 미팅 이미지 생성
        MeetingImage meetingImage = MeetingImage.builder()
                .meetingImagePath(saveReqDto.getMeetingImagePath())
                .build();

        // 미팅 스케줄에 미팅 이미지 추가
        meetingSchedule.addMeetingImage(meetingImage);

        // 미팅 이미지 저장
        meetingImageRepository.save(meetingImage);
        log.info("[MeetingImageServiceImpl.saveMeetingImage] SUCCESS!!! ");
    }

    // ================================================================================
    // ================================================================================
    // 조회

    // 선택한 날짜 날짜 사진들 보기
    public List<MeetingImageResponseDto.imageList> imageList(Long meetingId){
        log.info("[MeetingImageServiceImpl.imageList] start... ");
        // 미팅 스케줄 찾기
        MeetingSchedule meetingSchedule = meetingScheduleRepository.findById(meetingId)
                .orElseThrow(()-> new IllegalArgumentException("no such meetingSchedule. meetingId:"+meetingId));

        // 해당 미팅 스케줄의 이미지 리스트 가져오기
        List<MeetingImage> meetingImageList = meetingSchedule.getMeetingImageList();

        // 반환하기 위한 DTO 리스트 생성
        List<MeetingImageResponseDto.imageList> imageDtoList = new ArrayList<>();

        // Entity 를 DTO 로 변환 및 DTO 리스트에 추가
        for(MeetingImage meetingImage: meetingImageList){
            imageDtoList.add(MeetingImageResponseDto.imageList.toImageListDto(meetingImage));
        }

        // DTO 리스트 반환
        log.info("[MeetingImageServiceImpl.imageList] SUCCESS!!! ");
        return imageDtoList;
    }

    // ================================================================================
    // 지난 랜덤 화상 미팅 사진
    @Override
    public List<MeetingImageResponseDto.randomMeetingImage> randomMeetingImage(Long volunteerId){
        Volunteer volunteer = volunteerRepository.findById(volunteerId)
                .orElseThrow(()-> new IllegalArgumentException("no such volunteer. volunteerId:"+volunteerId));

        List<Relation> relationList = relationRepository.findByVolunteer(volunteer);


        // 관계 맺은 아동이 없으면 return null;
        if(relationList.size() == 0 ) return null;

        List<MeetingImageResponseDto.randomMeetingImage> randomImages = new ArrayList<>();

        int index = 0;
        while(index < 5){
            if(relationList.size() != 0){
                List<MeetingSchedule> meetingScheduleList = relationList.get(new Random().nextInt(relationList.size())).getMeetingScheduleList();
                if(meetingScheduleList.size() != 0){
                    MeetingSchedule meetingSchedule = meetingScheduleList.get(new Random().nextInt(meetingScheduleList.size()));
                    List<MeetingImage> meetingImageList = meetingSchedule.getMeetingImageList();
                    if(meetingImageList.size() != 0){
                        MeetingImage meetingImage = meetingImageList.get(new Random().nextInt(meetingImageList.size()));
                        randomImages.add(MeetingImageResponseDto.toRandomMeetingImageDto(meetingImage));
                        index++;
                    }
                }
            }
        }
        return randomImages;
    }

    // ================================================================================
    // ================================================================================
    // 수정

    //썸네일 수정하기
    @Transactional
    public void changeThumbnail(MeetingImageRequestDto.changeThumbnailImage changeReqDto){
        log.info("[MeetingImageServiceImpl.changeThumbnail] start... ");

        MeetingImage meetingImage = meetingImageRepository.findById(changeReqDto.getMeetingImageId())
                        .orElseThrow(()-> new IllegalArgumentException("no such meetingImage. meetingImageId:"+changeReqDto.getMeetingImageId()));

        MeetingSchedule meetingSchedule = meetingImage.getMeetingSchedule();

        meetingSchedule.changeThumbnail(meetingImage.getMeetingImagePath());

        log.info("[MeetingImageServiceImpl.changeThumbnail] SUCCESS!!! ");
    }

    // ================================================================================
    // ================================================================================
    // 삭제
}
