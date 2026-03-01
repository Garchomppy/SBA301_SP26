package ncp.a3nguyenchonphuoc_se18d04.dto.respone;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomTypeResponse {

    private Long id;
    private String name;
    private String description;
    private Integer capacity;
    private Double pricePerNight;
    private String imageUrl;
}