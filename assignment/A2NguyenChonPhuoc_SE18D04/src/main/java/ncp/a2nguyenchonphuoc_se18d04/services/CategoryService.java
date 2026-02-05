package ncp.a2nguyenchonphuoc_se18d04.services;

import ncp.a2nguyenchonphuoc_se18d04.pojos.Category;
import ncp.a2nguyenchonphuoc_se18d04.repositories.CategoryRepository;
import ncp.a2nguyenchonphuoc_se18d04.repositories.NewsArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService implements ICategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private NewsArticleRepository newsArticleRepository;

    @Override
    public Category createCategory(Category category) {
        if (category.getCategoryName() == null || category.getCategoryName().isBlank()) {
            throw new RuntimeException("Tên danh mục không được để trống");
        }
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Integer id, Category category) {
        Category existing = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục"));

        existing.setCategoryName(category.getCategoryName());
        existing.setCategoryDescription(category.getCategoryDescription());
        existing.setParentCategory(category.getParentCategory());
        existing.setIsActive(category.getIsActive());

        return categoryRepository.save(existing);
    }

    @Override
    public void deleteCategory(Integer id) {
        if (!canDeleteCategory(id)) {
            throw new RuntimeException("Không thể xóa danh mục này vì đã có bài viết hoặc có danh mục con");
        }
        categoryRepository.deleteById(id);
    }

    @Override
    public Optional<Category> getCategoryById(Integer id) {
        return categoryRepository.findById(id);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public List<Category> searchByName(String name) {
        return categoryRepository.findByCategoryNameContainingIgnoreCase(name);
    }

    @Override
    public List<Category> getRootCategories() {
        return categoryRepository.findByParentCategoryIsNull();
    }

    @Override
    public List<Category> getChildCategories(Integer parentId) {
        return categoryRepository.findByParentCategory_CategoryId(parentId);
    }

    @Override
    public boolean canDeleteCategory(Integer categoryId) {
        // Không cho xóa nếu có bài viết thuộc danh mục này
        boolean hasNews = newsArticleRepository.existsByCategory_CategoryId(categoryId);
        // Không cho xóa nếu có danh mục con
        boolean hasChildren = categoryRepository.existsByParentCategory_CategoryId(categoryId);

        return !hasNews && !hasChildren;
    }
}
