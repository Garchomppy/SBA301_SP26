package ncp.a2nguyenchonphuoc_se18d04.repositories;

import ncp.a2nguyenchonphuoc_se18d04.pojos.NewsArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsArticleRepository extends JpaRepository<NewsArticle, Integer> {
    // Tìm bài viết theo trạng thái (active = 1 để hiển thị công khai)
    List<NewsArticle> findByNewsStatus(Integer status);

    // Tìm bài viết của một tài khoản (Staff xem lịch sử bài viết của mình)
    List<NewsArticle> findByCreatedBy_AccountId(Integer accountId);

    // Tìm bài viết theo danh mục
    List<NewsArticle> findByCategory_CategoryId(Integer categoryId);

    // Tìm bài viết theo tiêu đề (search)
    List<NewsArticle> findByNewsTitleContainingIgnoreCase(String title);

    // Tìm bài viết có tag cụ thể (dùng JPQL)
    @Query("SELECT n FROM NewsArticle n JOIN n.tags t WHERE t.tagName = :tagName")
    List<NewsArticle> findByTagName(String tagName);

    // Tìm bài viết active + search theo tiêu đề
    @Query("SELECT n FROM NewsArticle n WHERE n.newsStatus = 1 AND LOWER(n.newsTitle) LIKE LOWER(CONCAT('%', :title, '%'))")
    List<NewsArticle> searchActiveNewsByTitle(String title);

    boolean existsByCategory_CategoryId(Integer categoryId);

    boolean existsByCreatedBy_AccountId(Integer accountId);
}