package ncp.lab8.repositories;


import ncp.lab8.pojos.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IStudentRepository extends MongoRepository<Student, Integer> {
    Student findByEmail(String email);
}