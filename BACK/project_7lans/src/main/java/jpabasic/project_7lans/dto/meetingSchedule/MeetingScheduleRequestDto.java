package jpabasic.project_7lans.dto.meetingSchedule;

import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.entity.ScheduleType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

public class MeetingScheduleRequestDto {


    //이미지 저장하기
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class saveImg{
        @NotNull(message = "[MeetingScheduleRequestDto.saveImgList] meetingId 는 Null 일 수 없습니다.")
        Long meetingId;
        @NotNull(message = "[MeetingScheduleRequestDto.saveImgList] meetingId 는 Null 일 수 없습니다.")
        MultipartFile file;



        @Builder
        saveImg(
                Long meetingId,
                MultipartFile file
        ){
            this.meetingId = meetingId;
            this.file = file;

        }
    }

}
