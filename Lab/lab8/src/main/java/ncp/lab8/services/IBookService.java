package ncp.lab8.services;

import ncp.lab8.pojos.Book;

import java.util.List;

public interface IBookService {
    List<Book> findAll();
    void save(Book book);
    void delete(int id);
    Book findById(int id);
}