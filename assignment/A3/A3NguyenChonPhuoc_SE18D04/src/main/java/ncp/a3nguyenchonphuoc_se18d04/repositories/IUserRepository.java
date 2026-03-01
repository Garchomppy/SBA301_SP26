package ncp.a3nguyenchonphuoc_se18d04.repositories;

import ncp.a3nguyenchonphuoc_se18d04.pojos.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}