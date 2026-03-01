package ncp.a3nguyenchonphuoc_se18d04.dto.request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUpdateRequest {

    @Size(max = 100, message = "Họ tên tối đa 100 ký tự")
    private String fullName;

    @Pattern(regexp = "^\\+?[0-9]{9,15}$", message = "Số điện thoại không hợp lệ")
    private String phone;

    private LocalDate birthday;
}