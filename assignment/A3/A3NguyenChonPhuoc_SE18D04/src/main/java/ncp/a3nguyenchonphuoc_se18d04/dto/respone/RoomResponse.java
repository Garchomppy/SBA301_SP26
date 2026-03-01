package ncp.a3nguyenchonphuoc_se18d04.dto.respone;

import lombok.*;
import ncp.a3nguyenchonphuoc_se18d04.pojos.enums.RoomStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomResponse {

    private Long id;
    private String roomNumber;
    private String roomTypeName;
    private Integer capacity;
    private Double pricePerNight;
    private RoomStatus status;
    private String note;
}