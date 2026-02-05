package ncp.a2nguyenchonphuoc_se18d04.pojos;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "NewsArticle")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsArticle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer newsArticleId;

    @Column(nullable = false)
    private String newsTitle;

    private String headline;

    @Column(columnDefinition = "nvarchar(max)")
    private String newsContent;

    private String newsSource;

    @ManyToOne
    @JoinColumn(name = "categoryId", nullable = false)
    private Category category;

    private Integer newsStatus = 1; // 1 = active, 0 = inactive

    @ManyToOne
    @JoinColumn(name = "createdById")
    private Account createdBy;

    @ManyToOne
    @JoinColumn(name = "updatedById")
    private Account updatedBy;

    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    // Quan hệ nhiều-nhiều với Tag
    @ManyToMany
    @JoinTable(
            name = "NewsTag",
            joinColumns = @JoinColumn(name = "newsArticleId"),
            inverseJoinColumns = @JoinColumn(name = "tagId")
    )
    private Set<Tag> tags = new HashSet<>();
}