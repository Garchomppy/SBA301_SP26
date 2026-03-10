package ncp.lab8.services;

import lombok.RequiredArgsConstructor;
import ncp.lab8.pojos.Book;
import ncp.lab8.repositories.IBookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService implements IBookService {

    private final IBookRepository bookRepository;
    private final SequenceGeneratorService sequenceGenerator;

    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    @Override
    public void save(Book book) {
        if (book.getId() == null || book.getId() <= 0) {
            book.setId((int) sequenceGenerator.generateSequence(Book.class.getSimpleName() + "_sequence"));
        }
        bookRepository.save(book);
    }

    @Override
    public void delete(int id) {
        bookRepository.deleteById(id);
    }

    @Override
    public Book findById(int id) {
        return bookRepository.findById(id).orElse(null);
    }
}