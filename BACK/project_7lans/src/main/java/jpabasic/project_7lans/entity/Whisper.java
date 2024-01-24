package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Whisper {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Member writer;

    @ManyToOne(fetch = FetchType.LAZY)
    private Relation relation;

    private String content;

    private LocalDateTime createDate;

    private boolean readStatus;

    @Builder
    public Whisper(
            Member writer,
            Relation relation,
            String content
    ){
        this.writer = writer;
        this.relation = relation;
        this.content = content;
        this.createDate = LocalDateTime.now(); // 작성 했을 때의 기본 시간
        this.readStatus = false; // 작성 후의 기본 상태는 false(읽지 않음) 상태이다.
    }


}
