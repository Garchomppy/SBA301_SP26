package ncp.a3nguyenchonphuoc_se18d04.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ncp.a3nguyenchonphuoc_se18d04.dto.request.RoomCreateRequest;
import ncp.a3nguyenchonphuoc_se18d04.dto.request.RoomUpdateRequest;
import ncp.a3nguyenchonphuoc_se18d04.dto.respone.RoomResponse;
import ncp.a3nguyenchonphuoc_se18d04.pojos.Room;
import ncp.a3nguyenchonphuoc_se18d04.pojos.RoomType;
import ncp.a3nguyenchonphuoc_se18d04.services.RoomService;
import ncp.a3nguyenchonphuoc_se18d04.services.RoomTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;
    private final RoomTypeService roomTypeService; // nếu cần

    // Public: Ai cũng xem được danh sách phòng (không cần auth)
    @GetMapping("/rooms")
    public ResponseEntity<List<RoomResponse>> getAllRooms() {
        List<Room> rooms = roomService.getAllRooms();
        List<RoomResponse> responses = rooms.stream()
                .map(this::mapToResponse) // hàm map entity → DTO
                .toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/rooms/available")
    public ResponseEntity<List<RoomResponse>> getAvailableRooms() {
        List<Room> rooms = roomService.getAvailableRooms();
        List<RoomResponse> responses = rooms.stream()
                .map(this::mapToResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/rooms/{id}")
    public ResponseEntity<RoomResponse> getRoomById(@PathVariable Long id) {
        Room room = roomService.getRoomById(id);
        return ResponseEntity.ok(mapToResponse(room));
    }

    // Chỉ STAFF mới tạo/sửa/xóa phòng
    @PostMapping("/admin/rooms")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<RoomResponse> createRoom(@Valid @RequestBody RoomCreateRequest request) {
        Room room = mapToEntity(request); // hàm map DTO → entity
        Room saved = roomService.createRoom(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapToResponse(saved));
    }

    @PutMapping("/admin/rooms/{id}")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<RoomResponse> updateRoom(@PathVariable Long id, @Valid @RequestBody RoomUpdateRequest request) {
        Room updated = roomService.updateRoom(id, mapToEntity(request));
        return ResponseEntity.ok(mapToResponse(updated));
    }

    @DeleteMapping("/admin/rooms/{id}")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<?> deleteRoom(@PathVariable Long id) {
        try {
            boolean deleted = roomService.deleteRoom(id);
            if (deleted) {
                return ResponseEntity.ok(java.util.Map.of(
                        "message", "Xóa phòng thành công",
                        "action", "deleted"
                ));
            } else {
                // service already changed status to UNAVAILABLE
                return ResponseEntity.ok(java.util.Map.of(
                        "message", "Phòng đang có booking, chỉ có thể đổi trạng thái thành không khả dụng",
                        "action", "status_changed"
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(java.util.Map.of("error", "Lỗi xóa phòng: " + e.getMessage()));
        }
    }

    // Hàm map ví dụ (có thể dùng MapStruct sau)
    private RoomResponse mapToResponse(Room room) {
        return RoomResponse.builder()
                .id(room.getId())
                .roomNumber(room.getRoomNumber())
                .roomTypeName(room.getRoomType() != null ? room.getRoomType().getName() : null)
                .capacity(room.getRoomType() != null ? room.getRoomType().getCapacity() : null)
                .pricePerNight(room.getRoomType() != null ? room.getRoomType().getPricePerNight() : null)
                .status(room.getStatus())
                .note(room.getDescription())
                .build();
    }

    private Room mapToEntity(RoomCreateRequest request) {
        Room room = new Room();
        room.setRoomNumber(request.getRoomNumber());
        room.setStatus(request.getStatus());
        room.setDescription(request.getNote());
        // set RoomType từ service nếu cần
        RoomType type = roomTypeService.getById(request.getRoomTypeId());
        room.setRoomType(type);
        return room;
    }

    // Added: map RoomUpdateRequest -> Room to support update endpoint
    private Room mapToEntity(RoomUpdateRequest request) {
        Room room = new Room();
        if (request.getRoomNumber() != null) {
            room.setRoomNumber(request.getRoomNumber());
        }
        if (request.getStatus() != null) {
            room.setStatus(request.getStatus());
        }
        if (request.getNote() != null) {
            room.setDescription(request.getNote());
        }
        if (request.getRoomTypeId() != null) {
            RoomType type = roomTypeService.getById(request.getRoomTypeId());
            room.setRoomType(type);
        }
        return room;
    }
}

