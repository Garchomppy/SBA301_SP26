package ncp.a3nguyenchonphuoc_se18d04.controllers;

import lombok.RequiredArgsConstructor;
import ncp.a3nguyenchonphuoc_se18d04.pojos.User;
import ncp.a3nguyenchonphuoc_se18d04.pojos.enums.Role;
import ncp.a3nguyenchonphuoc_se18d04.repositories.IUserRepository;
import ncp.a3nguyenchonphuoc_se18d04.utils.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        String fullName = request.getOrDefault("fullName", "");

        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body("Email đã tồn tại");
        }

        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .fullName(fullName)
                .role(Role.CUSTOMER)
                .status("ACTIVE")
                .build();

        userRepository.save(user);

        return ResponseEntity.ok("Đăng ký thành công. Hãy đăng nhập.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        // set the authenticated principal in the security context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // generate JWT from the Authentication object (not principal)
        String jwt = jwtUtil.generateToken(authentication);

        return ResponseEntity.ok(Map.of("token", jwt));
    }
}