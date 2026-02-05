package ncp.a2nguyenchonphuoc_se18d04.controllers;

import ncp.a2nguyenchonphuoc_se18d04.pojos.NewsArticle;
import ncp.a2nguyenchonphuoc_se18d04.services.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/news")
public class NewsArticleController {

    @Autowired
    private ArticleService newsArticleService;

    // Tạo bài viết mới
    @PostMapping
    public ResponseEntity<NewsArticle> createNews(@RequestBody NewsArticle news) {
        try {
            NewsArticle created = newsArticleService.createNews(news);
            return new ResponseEntity<>(created, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Sửa bài viết
    @PutMapping("/{id}")
    public ResponseEntity<NewsArticle> updateNews(@PathVariable Integer id, @RequestBody NewsArticle news) {
        try {
            NewsArticle updated = newsArticleService.updateNews(id, news);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Xóa bài viết
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable Integer id) {
        try {
            newsArticleService.deleteNews(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Lấy bài viết theo ID
    @GetMapping("/{id}")
    public ResponseEntity<NewsArticle> getNewsById(@PathVariable Integer id) {
        Optional<NewsArticle> news = newsArticleService.getNewsById(id);
        return news.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Lấy tất cả bài viết (Admin/Staff)
    @GetMapping
    public ResponseEntity<List<NewsArticle>> getAllNews() {
        return ResponseEntity.ok(newsArticleService.getAllNews());
    }

    // Lấy bài viết active (cho public - không cần auth)
    @GetMapping("/active")
    public ResponseEntity<List<NewsArticle>> getActiveNews() {
        return ResponseEntity.ok(newsArticleService.getActiveNews());
    }

    // Lấy bài viết của một Staff
    @GetMapping("/staff/{accountId}")
    public ResponseEntity<List<NewsArticle>> getNewsByStaff(@PathVariable Integer accountId) {
        return ResponseEntity.ok(newsArticleService.getNewsByStaff(accountId));
    }

    // Tìm kiếm theo tiêu đề
    @GetMapping("/search")
    public ResponseEntity<List<NewsArticle>> searchNews(@RequestParam String title) {
        return ResponseEntity.ok(newsArticleService.searchByTitle(title));
    }
}