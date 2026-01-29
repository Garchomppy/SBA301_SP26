package ncp.be.pojos;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;

@Entity
@Table(name = "orchid")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Orchids implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orchid_id")
    private Integer orchidID;

    @Column(name = "name", nullable = false, length = 255)
    private String orchidName;

    @Column(name = "is_natural", columnDefinition = "bit default 0")
    private Boolean isNatural;

    @Column(name = "orchid_description", columnDefinition = "nvarchar(MAX)")
    private String orchidDescription;

    @Column(name = "orchid_category", length = 255)
    private String orchidCategory;

    @Column(name = "is_attractive", columnDefinition = "bit default 0")
    private Boolean isAttractive;

    @Column(name = "orchid_url", length = 1000)
    private String orchidURL;
}