package ncp.a2nguyenchonphuoc_se18d04.services;

import ncp.a2nguyenchonphuoc_se18d04.pojos.NewsArticle;

import java.util.List;
import java.util.Optional;

public interface IArticleService {
    NewsArticle createNews(NewsArticle news);
    NewsArticle updateNews(Integer id, NewsArticle news);
    void deleteNews(Integer id);
    Optional<NewsArticle> getNewsById(Integer id);
    List<NewsArticle> getAllNews();

    // Chỉ hiển thị bài active cho public
    List<NewsArticle> getActiveNews();

    List<NewsArticle> getNewsByStaff(Integer accountId);
    List<NewsArticle> searchByTitle(String title);
}
