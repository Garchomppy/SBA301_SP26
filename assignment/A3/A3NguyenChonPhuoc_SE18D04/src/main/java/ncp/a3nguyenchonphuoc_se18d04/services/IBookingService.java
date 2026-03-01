package ncp.a3nguyenchonphuoc_se18d04.services;

import ncp.a3nguyenchonphuoc_se18d04.dto.request.BookingCreateRequest;
import ncp.a3nguyenchonphuoc_se18d04.dto.respone.BookingResponse;
import ncp.a3nguyenchonphuoc_se18d04.pojos.Booking;
import ncp.a3nguyenchonphuoc_se18d04.pojos.User;
import ncp.a3nguyenchonphuoc_se18d04.pojos.enums.BookingStatus;

import java.time.LocalDate;
import java.util.List;

public interface IBookingService {

    BookingResponse createBooking(User customer, BookingCreateRequest request);

    Booking getBookingById(Long id);

    List<Booking> getBookingsByCustomer(User customer);

    List<Booking> getAllBookings(); // cho staff

    void updateBookingStatus(Long bookingId, BookingStatus newStatus); // cho staff

    void cancelBooking(Long bookingId, User currentUser); // customer hoặc staff
}