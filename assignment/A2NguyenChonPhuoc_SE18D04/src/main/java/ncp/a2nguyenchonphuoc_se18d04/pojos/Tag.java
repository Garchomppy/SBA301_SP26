package ncp.a2nguyenchonphuoc_se18d04.pojos;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Tag")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tagId;

    @Column(nullable = false, unique = true)
    private String tagName;

    private String note;
}