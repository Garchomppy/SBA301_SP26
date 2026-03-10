package ncp.pe_sba301_sp25_be_de190224.controllers;

import lombok.RequiredArgsConstructor;
import ncp.pe_sba301_sp25_be_de190224.config.JwtUtils;
import ncp.pe_sba301_sp25_be_de190224.dto.AuthRequest;
import ncp.pe_sba301_sp25_be_de190224.dto.AuthResponse;
import ncp.pe_sba301_sp25_be_de190224.services.IAccountMemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    private final JwtUtils jwtUtils;
    private final IAccountMemberService memberService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmailAddress(), request.getMemberPassword()));
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmailAddress());
        final String jwt = jwtUtils.generateToken(userDetails);
        return ResponseEntity.ok(new AuthResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<ncp.pe_sba301_sp25_be_de190224.pojos.AccountMember> register(
            @RequestBody ncp.pe_sba301_sp25_be_de190224.pojos.AccountMember member) {
        return ResponseEntity.status(org.springframework.http.HttpStatus.CREATED)
                .body(memberService.register(member));
    }
}
