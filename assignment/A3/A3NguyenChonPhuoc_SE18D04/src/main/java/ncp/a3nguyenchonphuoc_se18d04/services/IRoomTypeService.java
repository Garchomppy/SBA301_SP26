package ncp.a3nguyenchonphuoc_se18d04.services;

import ncp.a3nguyenchonphuoc_se18d04.pojos.RoomType;

import java.util.List;

public interface IRoomTypeService {

    RoomType createRoomType(RoomType roomType);

    RoomType updateRoomType(Long id, RoomType roomType);

    void deleteRoomType(Long id);

    RoomType getById(Long id);

    List<RoomType> getAllRoomTypes();

    boolean existsByName(String name);
}