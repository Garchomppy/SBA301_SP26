package ncp.a2nguyenchonphuoc_se18d04.controllers;

import ncp.a2nguyenchonphuoc_se18d04.exception.JwtUtils;
import ncp.a2nguyenchonphuoc_se18d04.exception.LoginRequest;
import ncp.a2nguyenchonphuoc_se18d04.pojos.Account;
import ncp.a2nguyenchonphuoc_se18d04.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private JwtUtils jwtUtils;

    // Tạo tài khoản mới (Admin)
    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        try {
            Account created = accountService.createAccount(account);
            return new ResponseEntity<>(created, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null); // hoặc custom error response
        }
    }

    // Sửa tài khoản
    @PutMapping("/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable Integer id, @RequestBody Account account) {
        try {
            Account updated = accountService.updateAccount(id, account);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Xóa tài khoản (kiểm tra ràng buộc)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Integer id) {
        try {
            accountService.deleteAccount(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build(); // Không xóa được
        }
    }

    // Lấy tài khoản theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable Integer id) {
        Optional<Account> account = accountService.getAccountById(id);
        return account.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Lấy tất cả tài khoản
    @GetMapping
    public ResponseEntity<List<Account>> getAllAccounts() {
        return ResponseEntity.ok(accountService.getAllAccounts());
    }

    // Tìm theo role (Admin/Staff)
    @GetMapping("/role/{role}")
    public ResponseEntity<List<Account>> getAccountsByRole(@PathVariable Integer role) {
        return ResponseEntity.ok(accountService.findByRole(role));
    }

    // Login (dùng để đăng nhập - trả về account nếu đúng)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Account> accountOpt = accountService.login(request.getEmail(), request.getPassword());

        if (accountOpt.isPresent()) {
            Account account = accountOpt.get();
            // Tạo token từ email
            String token = jwtUtils.generateToken(account.getAccountEmail());

            // Trả về cả account và token cho React
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("account", account);

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sai email hoặc mật khẩu");
    }
}