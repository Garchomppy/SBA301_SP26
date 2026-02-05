package ncp.a2nguyenchonphuoc_se18d04.services;


import ncp.a2nguyenchonphuoc_se18d04.pojos.Account;

import java.util.List;
import java.util.Optional;

public interface IAccountService {

    // CRUD cơ bản
    Account createAccount(Account account);
    Account updateAccount(Integer id, Account account);
    void deleteAccount(Integer id);
    Optional<Account> getAccountById(Integer id);
    List<Account> getAllAccounts();

    // Tìm kiếm
    Optional<Account> findByEmail(String email);
    Optional<Account> findByUsername(String username);
    List<Account> findByRole(Integer role);

    // Login (trả về account nếu đúng email + password)
    Optional<Account> login(String email, String password);

    // Kiểm tra ràng buộc trước khi xóa
    boolean canDeleteAccount(Integer accountId);
}