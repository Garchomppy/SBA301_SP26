package ncp.lab6.controllers;

import lombok.RequiredArgsConstructor;
import ncp.lab6.pojos.User;
import ncp.lab6.services.IUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
public class UserControllers {

    private final IUserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User request) {
        return ResponseEntity.ok(userService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(userService.login(request));
    }
}