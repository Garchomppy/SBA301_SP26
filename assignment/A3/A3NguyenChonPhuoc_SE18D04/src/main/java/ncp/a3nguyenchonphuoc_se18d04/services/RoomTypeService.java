package ncp.a3nguyenchonphuoc_se18d04.services;

import lombok.RequiredArgsConstructor;
import ncp.a3nguyenchonphuoc_se18d04.pojos.RoomType;
import ncp.a3nguyenchonphuoc_se18d04.repositories.IRoomTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class RoomTypeService implements IRoomTypeService {

    private final IRoomTypeRepository roomTypeRepository;

    @Override
    public RoomType createRoomType(RoomType roomType) {
        if (roomTypeRepository.existsByName(roomType.getName())) {
            throw new IllegalArgumentException("Tên loại phòng đã tồn tại");
        }
        return roomTypeRepository.save(roomType);
    }

    @Override
    public RoomType updateRoomType(Long id, RoomType roomType) {
        RoomType existing = getById(id);

        existing.setName(roomType.getName());
        existing.setDescription(roomType.getDescription());
        existing.setCapacity(roomType.getCapacity());
        existing.setPricePerNight(roomType.getPricePerNight());
        existing.setImageUrl(roomType.getImageUrl());

        return roomTypeRepository.save(existing);
    }

    @Override
    public void deleteRoomType(Long id) {
        RoomType type = getById(id);
        // Nếu có phòng thuộc loại này thì không cho xóa (hoặc soft delete)
        // Ở đây giả sử cho xóa luôn để đơn giản assignment
        roomTypeRepository.delete(type);
    }

    @Override
    public RoomType getById(Long id) {
        return roomTypeRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Không tìm thấy loại phòng"));
    }

    @Override
    public List<RoomType> getAllRoomTypes() {
        return roomTypeRepository.findAll();
    }

    @Override
    public boolean existsByName(String name) {
        return roomTypeRepository.existsByName(name);
    }
}