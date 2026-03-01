package ncp.a3nguyenchonphuoc_se18d04.repositories;


import ncp.a3nguyenchonphuoc_se18d04.pojos.Room;
import ncp.a3nguyenchonphuoc_se18d04.pojos.enums.RoomStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IRoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByStatus(RoomStatus status);

    boolean existsByRoomNumber(String roomNumber);

    @Query("SELECT r FROM Room r WHERE r.status <> ncp.a3nguyenchonphuoc_se18d04.pojos.enums.RoomStatus.UNAVAILABLE")
    List<Room> findAllAvailableRooms();
}