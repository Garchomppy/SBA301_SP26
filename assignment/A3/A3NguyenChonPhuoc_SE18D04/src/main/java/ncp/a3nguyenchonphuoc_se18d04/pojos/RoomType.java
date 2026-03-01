package ncp.a3nguyenchonphuoc_se18d04.pojos;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "room_types")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private Integer capacity;

    @Column(nullable = false)
    private Double pricePerNight;

    private String imageUrl;
}