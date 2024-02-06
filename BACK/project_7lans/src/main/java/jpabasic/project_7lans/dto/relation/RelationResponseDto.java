package jpabasic.project_7lans.dto.relation;

import jpabasic.project_7lans.entity.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

public class RelationResponseDto {

    @Getter
    @NoArgsConstructor
    public static class detail {

        // 필요하게 될 때 객체가 아닌 DTO로 return 할 수 있도록 수정
        private Volunteer volunteer;
        private Child child;
        private Egg egg;
        private List<MeetingSchedule> meetingScheduleList;
        private List<Whisper> whisperList;


    }
    @Getter
    @NoArgsConstructor
    public static class info {
        private Long volunteerId;
        private Long childId;
        private Long eggId;

        @Builder
        info(
                Long volunteerId,
                Long childId,
                Long eggId
        ) {
            this.volunteerId = volunteerId;
            this.childId = childId;
            this.eggId = eggId;
        }

        public static RelationResponseDto.info toDto(Relation relation) {
            return info
                    .builder()
                    .volunteerId(relation.getVolunteer().getId())
                    .childId(relation.getChild().getId())
                    .eggId(relation.getEgg().getId())
                    .build();
        }
    }
}