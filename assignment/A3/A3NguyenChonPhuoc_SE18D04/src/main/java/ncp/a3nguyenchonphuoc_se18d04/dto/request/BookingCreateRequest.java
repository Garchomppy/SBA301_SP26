package ncp.a3nguyenchonphuoc_se18d04.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingCreateRequest {

    @NotNull(message = "Ngày check-in không được để trống")
    @FutureOrPresent(message = "Ngày check-in phải từ hôm nay trở đi")
    private LocalDate checkInDate;

    @NotNull(message = "Ngày check-out không được để trống")
    @Future(message = "Ngày check-out phải trong tương lai")
    private LocalDate checkOutDate;

    @NotEmpty(message = "Phải chọn ít nhất 1 phòng")
    private List<@Positive(message = "ID phòng phải là số dương") Long> roomIds;
}