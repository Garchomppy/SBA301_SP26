package ncp.a3nguyenchonphuoc_se18d04.dto.request;

import lombok.*;
import ncp.a3nguyenchonphuoc_se18d04.pojos.enums.Role;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private Long id;
    private String email;
    private String fullName;
    private String phone;
    private LocalDate birthday;
    private Role role;
    private boolean active;
}