package ncp.a3nguyenchonphuoc_se18d04.services;

import lombok.RequiredArgsConstructor;
import ncp.a3nguyenchonphuoc_se18d04.pojos.User;
import ncp.a3nguyenchonphuoc_se18d04.pojos.enums.Role;
import ncp.a3nguyenchonphuoc_se18d04.repositories.IUserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService, UserDetailsService {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User registerCustomer(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        user.setRole(Role.CUSTOMER);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setStatus("ACTIVE");

        return userRepository.save(user);
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
    }

    @Override
    public List<User> getAllCustomers() {
        // có thể filter role = CUSTOMER nếu cần
        return userRepository.findAll().stream()
                .filter(u -> u.getRole() == Role.CUSTOMER)
                .toList();
    }

    @Override
    public User updateProfile(Long id, User updated) {
        User existing = getUserById(id);

        // chỉ cho phép update một số field
        if (updated.getFullName() != null) existing.setFullName(updated.getFullName());
        if (updated.getPhone() != null) existing.setPhone(updated.getPhone());

        return userRepository.save(existing);
    }

    // Implement UserDetailsService for Spring Security
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities(authorities)
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(!"ACTIVE".equalsIgnoreCase(user.getStatus()))
                .build();
    }
}