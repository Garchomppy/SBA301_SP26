package ncp.a2nguyenchonphuoc_se18d04.pojos;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "SystemAccount")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountId;

    @Column(nullable = false, unique = true)
    private String accountName;

    @Column(unique = true)
    private String accountEmail;

    @Column(nullable = false)
    private String accountPassword;

    @Column(nullable = false)
    private Integer accountRole; // 1 = Admin, 2 = Staff

    private Boolean isActive = true;
}