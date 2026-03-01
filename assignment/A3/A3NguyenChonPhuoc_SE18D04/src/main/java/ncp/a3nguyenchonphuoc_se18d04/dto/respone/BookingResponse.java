package ncp.a3nguyenchonphuoc_se18d04.dto.respone;

import lombok.*;
import ncp.a3nguyenchonphuoc_se18d04.pojos.enums.BookingStatus;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponse {

    private Long id;
    private String customerEmail;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private BookingStatus status;
    private Double totalAmount;
    private List<String> roomNumbers;
}