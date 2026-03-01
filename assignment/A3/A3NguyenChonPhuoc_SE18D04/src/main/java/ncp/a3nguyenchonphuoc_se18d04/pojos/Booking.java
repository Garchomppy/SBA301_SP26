package ncp.a3nguyenchonphuoc_se18d04.pojos;

import jakarta.persistence.*;
import lombok.*;
import ncp.a3nguyenchonphuoc_se18d04.pojos.enums.BookingStatus;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @Builder.Default
    @Column(name = "booking_date", nullable = false)
    private LocalDate bookingDate = LocalDate.now();

    @Column(nullable = false)
    private Double totalAmount;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<BookingDetail> details = new ArrayList<>();

    @Builder.Default
    @Column(name = "total_price", nullable = false)
    private Double totalPrice = 0.0;

    private LocalDate checkInDate;
    private LocalDate checkOutDate;

    public void addDetail(BookingDetail detail) {
        details.add(detail);
        detail.setBooking(this);
    }

    public void removeDetail(BookingDetail detail) {
        details.remove(detail);
        detail.setBooking(null);
    }
}