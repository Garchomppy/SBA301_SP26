package ncp.a3nguyenchonphuoc_se18d04.repositories;

import ncp.a3nguyenchonphuoc_se18d04.pojos.Booking;
import ncp.a3nguyenchonphuoc_se18d04.pojos.User;
import ncp.a3nguyenchonphuoc_se18d04.pojos.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface IBookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByCustomer(User customer);

    List<Booking> findByStatus(BookingStatus status);

    List<Booking> findByCheckInDateBetween(LocalDate start, LocalDate end);
}