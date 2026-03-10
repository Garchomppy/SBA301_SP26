package ncp.lab8.services;

import lombok.RequiredArgsConstructor;
import ncp.lab8.pojos.Book;
import ncp.lab8.pojos.Student;
import ncp.lab8.repositories.IStudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor // Lombok tự tạo Constructor cho các field 'final'
public class StudentService implements IStudentService {

    private final IStudentRepository studentRepo;
    private final SequenceGeneratorService sequenceGenerator;

    @Override
    public List<Student> findAll() {
        return studentRepo.findAll();
    }

    @Override
    public void save(Student student) {
        if (student.getId() == null || student.getId() <= 0) {
            student.setId((int) sequenceGenerator.generateSequence(Student.class.getSimpleName() + "_sequence"));
        }
        studentRepo.save(student);
    }

    @Override
    public void delete(Student student) {
        studentRepo.delete(student);
    }

    @Override
    public Student findByEmail(String email) {
        return studentRepo.findByEmail(email);
    }
}