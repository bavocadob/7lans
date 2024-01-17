package jpabasic.project_7lans.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class ChildCenter {
    @Id @GeneratedValue
    private Long id;

    private String name;

    private String address;

    private String phoneNumber;
}
