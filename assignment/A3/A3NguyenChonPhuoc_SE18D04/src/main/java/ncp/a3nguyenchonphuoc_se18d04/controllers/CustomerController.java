package ncp.a3nguyenchonphuoc_se18d04.controllers;

import lombok.RequiredArgsConstructor;
import ncp.a3nguyenchonphuoc_se18d04.pojos.User;
import ncp.a3nguyenchonphuoc_se18d04.pojos.enums.Role;
import ncp.a3nguyenchonphuoc_se18d04.repositories.IUserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Get all customers (Staff only)
     */
    @GetMapping
    public ResponseEntity<?> getAllCustomers() {
        try {
            List<User> customers = userRepository.findAll().stream()
                    .filter(u -> u.getRole() == Role.CUSTOMER)
                    .toList();
            return ResponseEntity.ok(customers);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi lấy danh sách khách hàng"));
        }
    }

    /**
     * Get customer by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable Long id) {
        try {
            Optional<User> user = userRepository.findById(id);
            if (user.isEmpty() || user.get().getRole() != Role.CUSTOMER) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(user.get());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi lấy thông tin khách hàng"));
        }
    }

    /**
     * Create new customer
     */
    @PostMapping
    public ResponseEntity<?> createCustomer(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String password = request.get("password");
            String fullName = request.get("fullName");

            if (email == null || email.isEmpty() || password == null || password.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email và mật khẩu không được để trống"));
            }

            if (userRepository.findByEmail(email).isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email đã tồn tại"));
            }

            User customer = User.builder()
                    .email(email)
                    .password(passwordEncoder.encode(password))
                    .fullName(fullName != null ? fullName : "")
                    .role(Role.CUSTOMER)
                    .status("ACTIVE")
                    .active(true)
                    .build();

            User saved = userRepository.save(customer);
            return ResponseEntity.ok(Map.of("message", "Tạo khách hàng thành công", "customer", saved));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi tạo khách hàng: " + e.getMessage()));
        }
    }

    /**
     * Update customer information
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomer(
            @PathVariable Long id,
            @RequestBody Map<String, Object> updateRequest) {
        try {
            User customer = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng"));

            if (customer.getRole() != Role.CUSTOMER) {
                return ResponseEntity.badRequest().body(Map.of("error", "User này không phải khách hàng"));
            }

            if (updateRequest.containsKey("email") && updateRequest.get("email") != null) {
                String newEmail = updateRequest.get("email").toString();
                if (!newEmail.equals(customer.getEmail()) && userRepository.findByEmail(newEmail).isPresent()) {
                    return ResponseEntity.badRequest().body(Map.of("error", "Email đã tồn tại"));
                }
                customer.setEmail(newEmail);
            }

            if (updateRequest.containsKey("fullName") && updateRequest.get("fullName") != null) {
                customer.setFullName(updateRequest.get("fullName").toString());
            }

            if (updateRequest.containsKey("phone") && updateRequest.get("phone") != null) {
                customer.setPhone(updateRequest.get("phone").toString());
            }

            if (updateRequest.containsKey("status") && updateRequest.get("status") != null) {
                customer.setStatus(updateRequest.get("status").toString());
            }

            User updated = userRepository.save(customer);
            return ResponseEntity.ok(Map.of("message", "Cập nhật khách hàng thành công", "customer", updated));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi cập nhật khách hàng: " + e.getMessage()));
        }
    }

    /**
     * Delete customer (if not in any booking)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id) {
        try {
            User customer = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng"));

            if (customer.getRole() != Role.CUSTOMER) {
                return ResponseEntity.badRequest().body(Map.of("error", "User này không phải khách hàng"));
            }

            // Kiểm tra xem khách hàng có booking nào không
            // Nếu có, chỉ deactivate user
            userRepository.delete(customer);
            return ResponseEntity.ok(Map.of("message", "Xóa khách hàng thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi xóa khách hàng: " + e.getMessage()));
        }
    }

    /**
     * Search customer by email
     */
    @GetMapping("/search")
    public ResponseEntity<?> searchCustomer(@RequestParam String email) {
        try {
            Optional<User> user = userRepository.findByEmail(email);
            if (user.isEmpty() || user.get().getRole() != Role.CUSTOMER) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(user.get());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi tìm kiếm khách hàng"));
        }
    }
}
