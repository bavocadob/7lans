package jpabasic.project_7lans.dto.volunteer;

import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.entity.Volunteer;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class VolunteerResponseDto {
    // ===============================================================================
    // 조회

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detail {
        @NotNull(message = "[VolunteerResponseDto.detail] volunteerId 는 null 이 될 수 없습니다.")
        private Long volunteerId;
        @NotNull(message = "[VolunteerResponseDto.detail] volunteerEmail 는 null 이 될 수 없습니다.")
        private String volunteerEmail;
        @NotNull(message = "[VolunteerResponseDto.detail] volunteerName 는 null 이 될 수 없습니다.")
        private String volunteerName;
        @NotNull(message = "[VolunteerResponseDto.detail] volunteerPhoneNumber 는 null 이 될 수 없습니다.")
        private String volunteerPhoneNumber;
        @NotNull(message = "[VolunteerResponseDto.detail] volunteerBirth 는 null 이 될 수 없습니다.")
        private LocalDate volunteerBirth;
        @NotNull(message = "[VolunteerResponseDto.detail] volunteerProfileImagePath 는 Null 일 수 없습니다.")
        private String volunteerProfileImagePath;
        @NotNull(message = "[VolunteerResponseDto.detail] volunteerEnterDate 는 Null 일 수 없습니다.")
        private LocalDateTime volunteerEnterDate;

        @Builder
        detail(
                Long volunteerId,
                String volunteerEmail,
                String volunteerName,
                String volunteerPhoneNumber,
                LocalDate volunteerBirth,
                String volunteerProfileImagePath,
                LocalDateTime volunteerEnterDate
        ){
          this.volunteerId = volunteerId;
          this.volunteerEmail = volunteerEmail;
          this.volunteerName = volunteerName;
          this.volunteerPhoneNumber = volunteerPhoneNumber;
          this.volunteerBirth = volunteerBirth;
          this.volunteerProfileImagePath = volunteerProfileImagePath;
          this.volunteerEnterDate = volunteerEnterDate;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class list {
        @NotNull(message = "[VolunteerResponseDto.list] volunteerId 는 null 이 될 수 없습니다.")
        private Long volunteerId;
        @NotNull(message = "[VolunteerResponseDto.list] volunteerEmail 는 null 이 될 수 없습니다.")
        private String volunteerEmail;
        @NotNull(message = "[VolunteerResponseDto.list] volunteerName 는 null 이 될 수 없습니다.")
        private String volunteerName;
        @NotNull(message = "[VolunteerResponseDto.list] volunteerBirth 는 null 이 될 수 없습니다.")
        private LocalDate volunteerBirth;
        @NotNull(message = "[VolunteerResponseDto.list] volunteerProfileImagePath 는 Null 일 수 없습니다.")
        private String volunteerProfileImagePath;

        @Builder
        list(
                Long volunteerId,
                String volunteerEmail,
                String volunteerName,
                LocalDate volunteerBirth,
                String volunteerProfileImagePath
        ){
            this.volunteerId = volunteerId;
            this.volunteerEmail = volunteerEmail;
            this.volunteerName = volunteerName;
            this.volunteerBirth = volunteerBirth;
            this.volunteerProfileImagePath = volunteerProfileImagePath;
        }
    }

    // ===============================================================================
    // 생성자 메소드
    public static VolunteerResponseDto.list toListDto(Volunteer volunteer){
        return VolunteerResponseDto.list.builder()
                .volunteerId(volunteer.getId())
                .volunteerEmail(volunteer.getEmail())
                .volunteerName(volunteer.getName())
                .volunteerBirth(volunteer.getBirth())
                .volunteerProfileImagePath(volunteer.getProfileImgPath())
                .build();
    }
}
