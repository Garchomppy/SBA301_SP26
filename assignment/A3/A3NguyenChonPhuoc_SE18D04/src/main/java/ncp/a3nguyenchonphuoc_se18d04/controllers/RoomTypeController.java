package ncp.a3nguyenchonphuoc_se18d04.controllers;

import lombok.RequiredArgsConstructor;
import ncp.a3nguyenchonphuoc_se18d04.pojos.RoomType;
import ncp.a3nguyenchonphuoc_se18d04.services.IRoomTypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/room-types")
@RequiredArgsConstructor
public class RoomTypeController {

    private final IRoomTypeService roomTypeService;

    // Public endpoint for fetching room types (permitted in SecurityConfig)
    @GetMapping
    public ResponseEntity<List<RoomType>> getAllRoomTypes() {
        List<RoomType> roomTypes = roomTypeService.getAllRoomTypes();
        return ResponseEntity.ok(roomTypes);
    }
}
