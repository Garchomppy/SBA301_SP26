package ncp.a3nguyenchonphuoc_se18d04.dto.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import ncp.a3nguyenchonphuoc_se18d04.pojos.enums.RoomStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomUpdateRequest {

    @Size(max = 20, message = "Số phòng tối đa 20 ký tự")
    private String roomNumber;

    private Long roomTypeId;
    private RoomStatus status;
    private String note;
}