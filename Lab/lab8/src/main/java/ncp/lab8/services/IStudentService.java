package ncp.lab8.services;

import ncp.lab8.pojos.Student;

import java.util.List;

public interface IStudentService {

    void save(Student student);

    void delete(Student student);

    List<Student> findAll();

    Student findByEmail(String email);
}
