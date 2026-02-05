package ncp.lab6.services;

import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Collections;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private JwtService jwtService;
    private final String SECRET_KEY = "Og9xHIUbcpCpTPUYQgOEAId8hNaDulEBM6Bk3fXRO/8="; // 256-bit key
    private final long EXPIRATION = 3600000; // 1 hour

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
        ReflectionTestUtils.setField(jwtService, "secretKey", SECRET_KEY);
        ReflectionTestUtils.setField(jwtService, "jwtExpiration", EXPIRATION);
    }

    @Test
    void testGenerateToken() {
        UserDetails userDetails = new User("testuser", "password", Collections.emptyList());
        String token = jwtService.generateToken(userDetails);

        assertNotNull(token);
        assertEquals("testuser", jwtService.extractUsername(token));
    }

    @Test
    void testIsTokenValid() {
        UserDetails userDetails = new User("testuser", "password", Collections.emptyList());
        String token = jwtService.generateToken(userDetails);

        assertTrue(jwtService.isTokenValid(token, userDetails));
    }

    @Test
    void testIsTokenInvalidForDifferentUser() {
        UserDetails userDetails = new User("testuser", "password", Collections.emptyList());
        UserDetails otherUser = new User("otheruser", "password", Collections.emptyList());
        String token = jwtService.generateToken(userDetails);

        assertFalse(jwtService.isTokenValid(token, otherUser));
    }

    @Test
    void testExtractExpiration() {
        UserDetails userDetails = new User("testuser", "password", Collections.emptyList());
        String token = jwtService.generateToken(userDetails);

        Date expiration = jwtService.extractClaim(token, Claims::getExpiration);
        assertTrue(expiration.after(new Date()));
    }
}
