package ncp.a3nguyenchonphuoc_se18d04.repositories;

import ncp.a3nguyenchonphuoc_se18d04.pojos.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoomTypeRepository extends JpaRepository<RoomType, Long> {
    boolean existsByName(String name);
}