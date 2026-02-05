package ncp.a2nguyenchonphuoc_se18d04.services;

import ncp.a2nguyenchonphuoc_se18d04.pojos.Account;
import ncp.a2nguyenchonphuoc_se18d04.repositories.AccountRepository;
import ncp.a2nguyenchonphuoc_se18d04.repositories.NewsArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService implements IAccountService{
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private NewsArticleRepository newsArticleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Account createAccount(Account account) {
        if (account.getAccountEmail() != null && accountRepository.existsByAccountEmail(account.getAccountEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }
        if (accountRepository.existsByAccountName(account.getAccountName())) {
            throw new RuntimeException("Tên đăng nhập đã tồn tại");
        }

        // Hash password trước khi lưu
        if (account.getAccountPassword() != null && !account.getAccountPassword().isEmpty()) {
            account.setAccountPassword(passwordEncoder.encode(account.getAccountPassword()));
        }

        account.setCreatedDate(LocalDateTime.now());
        if (account.getIsActive() == null) {
            account.setIsActive(true);
        }
        return accountRepository.save(account);
    }

    @Override
    public Account updateAccount(Integer id, Account account) {
        Account existing = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản"));

        if (account.getAccountPassword() != null && !account.getAccountPassword().isEmpty()) {
            existing.setAccountPassword(passwordEncoder.encode(account.getAccountPassword()));
        }

        existing.setAccountName(account.getAccountName());
        existing.setAccountEmail(account.getAccountEmail());
        existing.setAccountRole(account.getAccountRole());
        existing.setIsActive(account.getIsActive());

        return accountRepository.save(existing);
    }

    @Override
    public void deleteAccount(Integer id) {
        if (!canDeleteAccount(id)) {
            throw new RuntimeException("Không thể xóa tài khoản này vì đã tạo bài viết");
        }
        accountRepository.deleteById(id);
    }

    @Override
    public Optional<Account> getAccountById(Integer id) {
        return accountRepository.findById(id);
    }

    @Override
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public Optional<Account> findByEmail(String email) {
        return accountRepository.findByAccountEmail(email);
    }

    @Override
    public Optional<Account> findByUsername(String username) {
        return accountRepository.findByAccountName(username);
    }

    @Override
    public List<Account> findByRole(Integer role) {
        return accountRepository.findByAccountRole(role);
    }

    public Optional<Account> login(String email, String rawPassword) {
        Optional<Account> accountOpt = accountRepository.findByAccountEmail(email);

        if (accountOpt.isPresent()) {
            Account account = accountOpt.get();
            if (passwordEncoder.matches(rawPassword, account.getAccountPassword())) {
                return Optional.of(account);
            }
        }
        return Optional.empty();
    }

    @Override
    public boolean canDeleteAccount(Integer accountId) {
        // Kiểm tra xem tài khoản này có tạo bài viết nào chưa
        return !newsArticleRepository.existsByCreatedBy_AccountId(accountId);
    }
}
