package ncp.fptu.services;

import ncp.fptu.entities.Student;
import ncp.fptu.repositories.IStudentRepository;
import ncp.fptu.repositories.StudentRepository;

import java.util.List;

public class StudentService implements IStudentService {
    private IStudentRepository repository = new StudentRepository();


    @Override
    public void save(Student student) {
        // Kiểm tra email trùng lặp
        Student existingStudent = findByEmail(student.getEmail());
        repository.findByEmail(student.getEmail());
        if (existingStudent != null) {
            throw new IllegalArgumentException("Email đã tồn tại: " + student.getEmail());
        }

        // Kiểm tra điểm hợp lệ
        if (student.getMarks() == null || student.getMarks() < 0 || student.getMarks() > 10) {
            throw new IllegalArgumentException("Điểm phải từ 0 đến 10");
        }

        // Gọi xuống repository để lưu dữ liệu
        repository.save(student);
    }

    @Override
    public void update(Student student) {
        // Đảm bảo sinh viên tồn tại trong DB
        Student existingStudent = repository.findById(student.getId());
        if (existingStudent == null) throw new IllegalArgumentException("Không tồn tại sinh viên " + student.getId() + " để cập nhật");

        // Kiểm tra email mới (nếu thay đổi) không trùng với người khác
        Student studentWithEmail = repository.findByEmail(student.getEmail());
        if (studentWithEmail != null && studentWithEmail.getId() != student.getId()) {
            throw new IllegalArgumentException("Email đã tồn tại: " + student.getEmail());
        }

        // Kiểm tra điểm hợp lệ
        if (student.getMarks() == null || student.getMarks() < 0 || student.getMarks() > 10) {
            throw new IllegalArgumentException("Điểm phải từ 0 đến 10");
        }

        // Gọi xuống repository để cập nhật dữ liệu
        repository.update(student);
    }

    @Override
    public void delete(Student student) {
        // Kiểm tra sinh viên đó có đang mượn sách không trước khi xóa
        if (student.getBooks() != null && !student.getBooks().isEmpty()) {
            throw new RuntimeException("Không thể sinh viên vì tồn tại sách đang mượn.");
        }
        repository.delete(student);
    }

    @Override
    public Student findById(int studentId) {
        // Kiểm tra ID có hợp lệ không trước khi tìm kiếm
        if (studentId <= 0) throw new IllegalArgumentException("ID sinh viên không hợp lệ");
        return repository.findById(studentId);
    }

    @Override
    public Student findByEmail(String email) {
        if (email == null || email.trim().isEmpty()) throw new IllegalArgumentException("Email không được để trống");
        return repository.findByEmail(email);
    }

    @Override
    public List<Student> findAll() {
        return repository.findAll();
    }
}
