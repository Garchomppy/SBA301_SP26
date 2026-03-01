package ncp.a3nguyenchonphuoc_se18d04.filters;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import ncp.a3nguyenchonphuoc_se18d04.utils.JwtUtil;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// new imports for logging
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    // ...existing code...
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // Detailed logging to help diagnose missing Authorization header / token issues
        logger.info("JWT Filter - Incoming request: {} {}", request.getMethod(), request.getRequestURI());

        try {
            String authHeader = request.getHeader("Authorization");
            logger.info("JWT Filter - Auth header: {}", (authHeader != null ? "present" : "missing"));

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                // No token present or wrong format; continue filter chain anonymously
                filterChain.doFilter(request, response);
                return;
            }

            String jwt = authHeader.substring(7);
            String username = jwtUtil.extractUsername(jwt);
            logger.info("JWT Filter - Extracted username from token: {}", username);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                logger.info("JWT Filter - Loaded user: {} , Authorities: {}", username, userDetails.getAuthorities());

                if (jwtUtil.validateToken(jwt, username)) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    logger.info("JWT Filter - Authentication set for user: {}", username);
                } else {
                    logger.warn("JWT Filter - Token validation failed for user: {}", username);
                }
            }

        } catch (Exception e) {
            // Log full stack trace to aid debugging; do not swallow silently
            logger.error("JWT Filter - Exception while processing token", e);
        }

        filterChain.doFilter(request, response);
    }
}