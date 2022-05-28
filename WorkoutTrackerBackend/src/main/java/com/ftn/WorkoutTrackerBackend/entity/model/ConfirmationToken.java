package com.ftn.WorkoutTrackerBackend.entity.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "confirmation_token")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ConfirmationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    @Column(nullable = false)
    private String token;

    @Column(nullable = true)
    private LocalDateTime confirmedAt;

    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "user_id"
    )
    private User user;

    public ConfirmationToken( String token,
                              LocalDateTime confirmedAt, User user) {
        super();
        this.token = token;
        this.confirmedAt = confirmedAt;
        this.user = user;
    }


    @Override
    public String toString() {
        return "ConfirmationToken [id=" + id + ", token=" + token + ", confirmedAt=" + confirmedAt + ", user=" + user
                + "]";
    }

}
