package ncp.a3nguyenchonphuoc_se18d04.controllers;

import lombok.RequiredArgsConstructor;
import ncp.a3nguyenchonphuoc_se18d04.pojos.User;
import ncp.a3nguyenchonphuoc_se18d04.repositories.IUserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Get current user profile
     */
    @GetMapping
    public ResponseEntity<?> getProfile(Authentication authentication) {
        try {
            String email = authentication.getName();
            Optional<User> user = userRepository.findByEmail(email);

            if (user.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(user.get());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi lấy thông tin profile"));
        }
    }

    /**
     * Update user profile (name, phone, birthday)
     */
    @PutMapping
    public ResponseEntity<?> updateProfile(
            @RequestBody Map<String, Object> updateRequest,
            Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));

            // Update allowed fields
            if (updateRequest.containsKey("fullName") && updateRequest.get("fullName") != null) {
                String fullName = updateRequest.get("fullName").toString();
                if (fullName.trim().length() < 3) {
                    return ResponseEntity.badRequest().body(Map.of("error", "Họ tên phải có ít nhất 3 ký tự"));
                }
                user.setFullName(fullName);
            }

            if (updateRequest.containsKey("phone") && updateRequest.get("phone") != null) {
                String phone = updateRequest.get("phone").toString();
                if (phone.matches("\\d{10}")) {
                    user.setPhone(phone);
                } else if (!phone.isEmpty()) {
                    return ResponseEntity.badRequest().body(Map.of("error", "Số điện thoại không hợp lệ"));
                }
            }

            if (updateRequest.containsKey("birthday") && updateRequest.get("birthday") != null) {
                try {
                    user.setBirthday(java.time.LocalDate.parse(updateRequest.get("birthday").toString()));
                } catch (Exception e) {
                    return ResponseEntity.badRequest().body(Map.of("error", "Định dạng ngày sinh không hợp lệ"));
                }
            }

            userRepository.save(user);
            return ResponseEntity.ok(Map.of("message", "Cập nhật profile thành công", "user", user));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi cập nhật profile: " + e.getMessage()));
        }
    }

    /**
     * Change password
     */
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody Map<String, String> passwordRequest,
            Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));

            String oldPassword = passwordRequest.get("oldPassword");
            String newPassword = passwordRequest.get("newPassword");
            String confirmPassword = passwordRequest.get("confirmPassword");

            // Validate old password
            if (oldPassword == null || !passwordEncoder.matches(oldPassword, user.getPassword())) {
                return ResponseEntity.badRequest().body(Map.of("error", "Mật khẩu cũ không chính xác"));
            }

            // Validate new password
            if (newPassword == null || newPassword.length() < 6) {
                return ResponseEntity.badRequest().body(Map.of("error", "Mật khẩu mới phải có ít nhất 6 ký tự"));
            }

            if (!newPassword.equals(confirmPassword)) {
                return ResponseEntity.badRequest().body(Map.of("error", "Mật khẩu xác nhận không khớp"));
            }

            // Update password
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);

            return ResponseEntity.ok(Map.of("message", "Đổi mật khẩu thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi đổi mật khẩu"));
        }
    }
}
