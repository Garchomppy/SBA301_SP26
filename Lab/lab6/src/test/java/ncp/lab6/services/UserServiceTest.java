package ncp.lab6.services;

import ncp.lab6.pojos.User;
import ncp.lab6.repositories.IUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtService jwtService;

    @Mock
    private IUserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegister() {
        User user = User.builder()
                .username("testuser")
                .password("password")
                .build();

        when(passwordEncoder.encode(any())).thenReturn("encodedPassword");
        when(userRepository.save(any())).thenReturn(user);

        String result = userService.register(user);

        assertEquals("Đăng ký thành công!", result);
        verify(passwordEncoder, times(1)).encode("password");
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testLogin() {
        Map<String, String> credentials = Map.of("username", "testuser", "password", "password");
        User user = User.builder()
                .username("testuser")
                .password("encodedPassword")
                .build();

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(jwtService.generateToken(user)).thenReturn("mockToken");

        Map<String, String> result = userService.login(credentials);

        assertNotNull(result);
        assertEquals("mockToken", result.get("token"));
        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtService, times(1)).generateToken(user);

    @Test
    void testLogin_UserNotFound() {
        Map<String, String> credentials = Map.of("username", "nonexistent", "password", "password");

        when(userRepository.findByUsername("nonexistent")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> userService.login(credentials));
    }

    @Test
    void testLogin_WrongPassword() {
        Map<String, String> credentials = Map.of("username", "testuser", "password", "wrongpassword");

        doThrow(new RuntimeException("Authentication failed")).when(authenticationManager)
                .authenticate(any(UsernamePasswordAuthenticationToken.class));

        assertThrows(RuntimeException.class, () -> userService.login(credentials));
    }
}
