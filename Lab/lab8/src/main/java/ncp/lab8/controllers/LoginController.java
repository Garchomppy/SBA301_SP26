package ncp.lab8.controllers;

import lombok.RequiredArgsConstructor;
import ncp.lab8.pojos.Student;
import ncp.lab8.services.IStudentService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;

@Controller
@RequiredArgsConstructor
public class LoginController {

    private final IStudentService studentService;

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @PostMapping("/login")
    public String processLogin(@RequestParam String email,
            @RequestParam String password,
            Model model) {
        Student student = studentService.findByEmail(email);

        if (student != null && password.equals(student.getPassword())) {
            return "redirect:/";
        } else {
            model.addAttribute("error", "Invalid email or password");
            return "login";
        }
    }
}
