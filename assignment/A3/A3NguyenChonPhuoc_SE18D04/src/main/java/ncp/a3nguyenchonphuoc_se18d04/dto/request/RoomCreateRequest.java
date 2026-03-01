package ncp.a3nguyenchonphuoc_se18d04.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;
import ncp.a3nguyenchonphuoc_se18d04.pojos.enums.RoomStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomCreateRequest {

    @NotBlank(message = "Số phòng không được để trống")
    @Size(max = 20, message = "Số phòng tối đa 20 ký tự")
    private String roomNumber;

    @NotNull(message = "ID loại phòng không được để trống")
    @Positive(message = "ID loại phòng phải là số dương")
    private Long roomTypeId;

    @NotNull(message = "Trạng thái phòng không được để trống")
    private RoomStatus status;

    private String note;
}