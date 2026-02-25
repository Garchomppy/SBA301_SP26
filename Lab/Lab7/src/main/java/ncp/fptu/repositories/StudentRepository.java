package ncp.fptu.repositories;

import ncp.fptu.daos.StudentDAO;
import ncp.fptu.entities.Student;

import java.util.List;

public class StudentRepository implements IStudentRepository {
    private StudentDAO dao = new StudentDAO();

    @Override
    public void save(Student student) {
        dao.save(student);
    }

    @Override
    public void update(Student student) {
        dao.update(student);
    }

    @Override
    public void delete(Student student) {
        dao.delete(student);
    }

    @Override
    public Student findById(int studentId) {
        return dao.getById(studentId);
    }

    @Override
    public Student findByEmail(String email) {
        return dao.findByEmail(email);
    }

    @Override
    public List<Student> findAll() {
        return dao.getAll();
    }
}
