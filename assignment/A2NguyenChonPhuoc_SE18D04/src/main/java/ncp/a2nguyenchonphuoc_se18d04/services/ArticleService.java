package ncp.a2nguyenchonphuoc_se18d04.services;

import ncp.a2nguyenchonphuoc_se18d04.pojos.NewsArticle;
import ncp.a2nguyenchonphuoc_se18d04.repositories.NewsArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ArticleService implements IArticleService {
    @Autowired
    private NewsArticleRepository newsArticleRepository;

    @Override
    public NewsArticle createNews(NewsArticle news) {
        news.setCreatedDate(LocalDateTime.now());
        news.setModifiedDate(LocalDateTime.now());
        news.setNewsStatus(1); // mặc định active
        return newsArticleRepository.save(news);
    }

    @Override
    public NewsArticle updateNews(Integer id, NewsArticle news) {
        NewsArticle existing = newsArticleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bài viết"));

        existing.setNewsTitle(news.getNewsTitle());
        existing.setHeadline(news.getHeadline());
        existing.setNewsContent(news.getNewsContent());
        existing.setNewsSource(news.getNewsSource());
        existing.setCategory(news.getCategory());
        existing.setNewsStatus(news.getNewsStatus());
        existing.setTags(news.getTags());
        existing.setModifiedDate(LocalDateTime.now());

        return newsArticleRepository.save(existing);
    }

    @Override
    public void deleteNews(Integer id) {
        if (!newsArticleRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy bài viết để xóa");
        }
        newsArticleRepository.deleteById(id);
    }

    @Override
    public Optional<NewsArticle> getNewsById(Integer id) {
        return newsArticleRepository.findById(id);
    }

    @Override
    public List<NewsArticle> getAllNews() {
        return newsArticleRepository.findAll();
    }

    @Override
    public List<NewsArticle> getActiveNews() {
        return newsArticleRepository.findByNewsStatus(1);
    }

    @Override
    public List<NewsArticle> getNewsByStaff(Integer accountId) {
        return newsArticleRepository.findByCreatedBy_AccountId(accountId);
    }

    @Override
    public List<NewsArticle> searchByTitle(String title) {
        return newsArticleRepository.findByNewsTitleContainingIgnoreCase(title);
    }
}
