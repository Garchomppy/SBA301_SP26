package ncp.a2nguyenchonphuoc_se18d04.services;

import ncp.a2nguyenchonphuoc_se18d04.pojos.Account;
import ncp.a2nguyenchonphuoc_se18d04.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByAccountEmail(username)
                .orElseGet(() -> accountRepository.findByAccountName(username)
                        .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy: " + username)));

        String role = account.getAccountRole() == 1 ? "ADMIN" : "STAFF";

        return User.builder()
                .username(account.getAccountEmail())
                .password(account.getAccountPassword())
                .authorities(new SimpleGrantedAuthority("ROLE_" + role))
                .disabled(!account.getIsActive())
                .build();
    }
}