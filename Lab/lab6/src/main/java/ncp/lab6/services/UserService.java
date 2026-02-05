package ncp.lab6.services;

import lombok.RequiredArgsConstructor;
import ncp.lab6.pojos.User;
import ncp.lab6.repositories.IUserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public String register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "Đăng ký thành công!";
    }

    @Override
    public Map<String, String> login(Map<String, String> credentials) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(credentials.get("username"), credentials.get("password"))
        );
        var user = userRepository.findByUsername(credentials.get("username")).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return Map.of("token", jwtToken);
    }
}
