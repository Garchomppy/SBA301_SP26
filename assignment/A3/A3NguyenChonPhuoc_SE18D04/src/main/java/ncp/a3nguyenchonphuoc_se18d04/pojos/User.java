package ncp.a3nguyenchonphuoc_se18d04.pojos;

import jakarta.persistence.*;
import lombok.*;
import ncp.a3nguyenchonphuoc_se18d04.pojos.enums.Role;

import java.time.LocalDate;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(length = 100)
    private String fullName;

    @Column(length = 20)
    private String phone;

    private LocalDate birthday;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String status;

    // Thêm field này
    @Column(nullable = false)
    private boolean active = true;
}