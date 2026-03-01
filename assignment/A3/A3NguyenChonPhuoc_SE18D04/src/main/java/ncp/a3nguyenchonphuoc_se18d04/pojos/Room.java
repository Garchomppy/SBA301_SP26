package ncp.a3nguyenchonphuoc_se18d04.pojos;

import jakarta.persistence.*;
import lombok.*;
import ncp.a3nguyenchonphuoc_se18d04.pojos.enums.RoomStatus;
import ncp.a3nguyenchonphuoc_se18d04.pojos.BookingDetail;

@Entity
@Table(name = "rooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String roomNumber;

    @Column(length = 500)
    private String description;

    private Integer maxCapacity;

    @ManyToOne
    @JoinColumn(name = "room_type_id")
    private RoomType roomType;

    @Enumerated(EnumType.STRING)
    private RoomStatus status;

    // Bi-directional relationship để biết phòng đã được đặt trong chi tiết nào
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<BookingDetail> bookingDetails = new java.util.ArrayList<>();

}