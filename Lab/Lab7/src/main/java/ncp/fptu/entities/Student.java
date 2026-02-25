package ncp.fptu.entities;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "student")
public class Student implements Serializable {
    @Id // Khóa chính (Primary Key)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Tự động tăng giá trị ID
    private int id; // Corresponds to STUDENTS(id IDENTITY(1,1))

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "marks")
    private Double marks; // Điểm trung bình

    @OneToMany(mappedBy = "student", fetch = FetchType.LAZY)
    private Set<Book> books = new HashSet<>();

    public Student(String email, String password, String firstName, String lastName, Double marks) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.marks = marks;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", marks=" + marks +
                '}';
    }

}