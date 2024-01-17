package jpabasic.project_7lans.entity;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChildVolunteerPK implements Serializable {
    private Member volunteer;
    private Member child;
}
