package ncp.a2nguyenchonphuoc_se18d04.repositories;

import ncp.a2nguyenchonphuoc_se18d04.pojos.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    // Tìm danh mục theo tên (dùng để search)
    List<Category> findByCategoryNameContainingIgnoreCase(String name);

    // Tìm tất cả danh mục gốc (không có cha)
    List<Category> findByParentCategoryIsNull();

    // Tìm tất cả danh mục con của một danh mục cha
    List<Category> findByParentCategory_CategoryId(Integer parentId);

    // Tìm danh mục theo trạng thái hoạt động
    List<Category> findByIsActive(Boolean isActive);

    boolean existsByParentCategory_CategoryId(Integer parentId);
}