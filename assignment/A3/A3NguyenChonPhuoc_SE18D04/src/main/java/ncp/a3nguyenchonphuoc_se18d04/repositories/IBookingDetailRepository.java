package ncp.a3nguyenchonphuoc_se18d04.repositories;

import ncp.a3nguyenchonphuoc_se18d04.pojos.BookingDetail;
import ncp.a3nguyenchonphuoc_se18d04.pojos.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IBookingDetailRepository extends JpaRepository<BookingDetail, Long> {

    List<BookingDetail> findByRoom(Room room);

    boolean existsByRoom(Room room);
}