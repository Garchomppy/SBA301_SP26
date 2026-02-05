package ncp.a2nguyenchonphuoc_se18d04.repositories;

import ncp.a2nguyenchonphuoc_se18d04.pojos.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {
    // Tìm tag theo tên (dùng khi thêm tag mới hoặc search)
    Optional<Tag> findByTagName(String tagName);

    // Kiểm tra tag đã tồn tại
    boolean existsByTagName(String tagName);

    // Tìm tất cả tag theo tên chứa (search)
    List<Tag> findByTagNameContainingIgnoreCase(String name);
}