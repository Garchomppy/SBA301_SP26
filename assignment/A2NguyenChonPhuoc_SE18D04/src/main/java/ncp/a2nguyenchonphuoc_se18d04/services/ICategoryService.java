package ncp.a2nguyenchonphuoc_se18d04.services;

import ncp.a2nguyenchonphuoc_se18d04.pojos.Category;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface ICategoryService {
    Category createCategory(Category category);
    Category updateCategory(Integer id, Category category);
    void deleteCategory(Integer id);
    Optional<Category> getCategoryById(Integer id);
    List<Category> getAllCategories();

    List<Category> searchByName(String name);
    List<Category> getRootCategories(); // Danh mục gốc
    List<Category> getChildCategories(Integer parentId);

    boolean canDeleteCategory(Integer categoryId);
}
