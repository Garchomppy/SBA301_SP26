package ncp.a2nguyenchonphuoc_se18d04.repositories;

import ncp.a2nguyenchonphuoc_se18d04.pojos.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    // Tìm theo email (dùng để login)
    Optional<Account> findByAccountEmail(String email);

    // Tìm theo tên đăng nhập
    Optional<Account> findByAccountName(String accountName);

    // Kiểm tra email đã tồn tại (khi tạo tài khoản mới)
    boolean existsByAccountEmail(String email);

    // Kiểm tra tên đăng nhập đã tồn tại
    boolean existsByAccountName(String accountName);

    // Tìm tất cả tài khoản theo role (Admin = 1, Staff = 2)
    List<Account> findByAccountRole(Integer role);
}