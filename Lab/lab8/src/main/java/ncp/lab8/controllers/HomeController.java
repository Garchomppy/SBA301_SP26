package ncp.lab8.controllers;

import lombok.RequiredArgsConstructor;
import ncp.lab8.pojos.Book;
import ncp.lab8.pojos.Student;
import ncp.lab8.services.BookService;
import ncp.lab8.services.StudentService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class HomeController {

    private final StudentService studentService;
    private final BookService bookService;

    @GetMapping("/")
    public String index(Model model) {
        // Lấy danh sách từ MongoDB để hiển thị lên giao diện [cite: 37]
        List<Student> students = studentService.findAll();
        List<Book> books = bookService.findAll();

        model.addAttribute("studentList", students);
        model.addAttribute("bookList", books);
        return "home"; // Trả về file home.jsp
    }

    @PostMapping("/manageStudent")
    public String manageStudent(@ModelAttribute Student student, @RequestParam String action) {
        switch (action) {
            case "add":
            case "update":
                studentService.save(student);
                break;
            case "delete":
                studentService.delete(student);
                break;
        }
        return "redirect:/";
    }
}