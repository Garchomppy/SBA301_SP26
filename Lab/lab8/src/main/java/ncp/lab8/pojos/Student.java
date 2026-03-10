package ncp.lab8.pojos;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Builder
@Document(collection = "students") // Collection name trong MongoDB
public class Student {
    @Id
    private Integer id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private int marks;

    @Builder.Default
    private List<Book> books = new ArrayList<>();
}