package ncp.a3nguyenchonphuoc_se18d04.services;

import lombok.RequiredArgsConstructor;
import ncp.a3nguyenchonphuoc_se18d04.pojos.Room;
import ncp.a3nguyenchonphuoc_se18d04.pojos.enums.RoomStatus;
import ncp.a3nguyenchonphuoc_se18d04.repositories.IBookingDetailRepository;
import ncp.a3nguyenchonphuoc_se18d04.repositories.IRoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class RoomService implements IRoomService {

    private final IRoomRepository roomRepository;
    private final IBookingDetailRepository bookingDetailRepository;

    @Override
    public Room createRoom(Room room) {
        if (roomRepository.existsByRoomNumber(room.getRoomNumber())) {
            throw new IllegalArgumentException("Room number already exists");
        }
        return roomRepository.save(room);
    }

    @Override
    public Room updateRoom(Long id, Room room) {
        Room existing = roomRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Room not found"));

        existing.setRoomNumber(room.getRoomNumber());
        existing.setRoomType(room.getRoomType());
        existing.setDescription(room.getDescription());

        return roomRepository.save(existing);
    }


    @Override
    @Transactional
    public boolean deleteRoom(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Room not found"));

        boolean isUsed = bookingDetailRepository.existsByRoom(room);

        if (isUsed) {
            // không xóa vật lý, chỉ đổi status
            room.setStatus(RoomStatus.UNAVAILABLE);
            roomRepository.save(room);
            return false; // not deleted, only status changed
        } else {
            roomRepository.delete(room);
            return true; // actually deleted
        }
    }

    @Override
    public Room getRoomById(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Room not found"));
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public List<Room> getAvailableRooms() {
        return roomRepository.findAllAvailableRooms();
    }


    @Override
    public List<Room> getRoomsByStatus(RoomStatus status) {
        return roomRepository.findByStatus(status);
    }
}