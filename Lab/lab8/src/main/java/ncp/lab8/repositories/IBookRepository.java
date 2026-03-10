package ncp.lab8.repositories;

import ncp.lab8.pojos.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBookRepository extends MongoRepository<Book, Integer> {

    // Tìm kiếm sách theo tiêu đề [cite: 5]
    List<Book> findByTitleContainingIgnoreCase(String title);

    // Tìm kiếm sách theo tác giả [cite: 5]
    List<Book> findByAuthor(String author);
}