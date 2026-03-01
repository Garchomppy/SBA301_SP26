package ncp.a3nguyenchonphuoc_se18d04.services;

import ncp.a3nguyenchonphuoc_se18d04.pojos.Room;
import ncp.a3nguyenchonphuoc_se18d04.pojos.enums.RoomStatus;

import java.util.List;

public interface IRoomService {

    Room createRoom(Room room);

    Room updateRoom(Long id, Room room);

    boolean deleteRoom(Long id);

    Room getRoomById(Long id);

    List<Room> getAllRooms();

    List<Room> getAvailableRooms();

    List<Room> getRoomsByStatus(RoomStatus status);
}