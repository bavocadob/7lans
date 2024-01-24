package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChildCenter {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String address;

    private String phoneNumber;

    @OneToMany(mappedBy = "childCenter", cascade = CascadeType.ALL)
    private List<CenterRalation> centerRalationList = new ArrayList<>();

    @OneToMany(mappedBy = "childCenter", cascade = CascadeType.ALL)
    private List<CenterActivityLog> centerActivityLogList = new ArrayList<>();

    public void changeName(String name) {
        this.name = name;
    }

    public void changeAddress(String address) {
        this.address = address;
    }

    public void changePhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Builder
    public ChildCenter(
            String name,
            String address,
            String phoneNumber
    ){
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}
