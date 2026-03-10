package ncp.lab8.pojos;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;
import java.util.HashSet;

@Data // Tự động tạo Getter, Setter, toString, equals, hashCode
@NoArgsConstructor // Tạo Constructor không đối số
@AllArgsConstructor // Tạo Constructor đầy đủ đối số
@Builder // Hỗ trợ khởi tạo đối tượng theo pattern Builder
@Document(collection = "books") // Chỉ định collection trong MongoDB
public class Book {
    @Id
    private Integer id;
    private String title;
    private String author;
    private String isbn;

    @Builder.Default
    private Set<Student> student = new HashSet<>();
}