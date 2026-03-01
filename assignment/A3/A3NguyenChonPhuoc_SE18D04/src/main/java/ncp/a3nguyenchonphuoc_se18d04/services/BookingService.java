package ncp.a3nguyenchonphuoc_se18d04.services;

import lombok.RequiredArgsConstructor;
import ncp.a3nguyenchonphuoc_se18d04.dto.request.BookingCreateRequest;
import ncp.a3nguyenchonphuoc_se18d04.dto.respone.BookingResponse;
import ncp.a3nguyenchonphuoc_se18d04.pojos.Booking;
import ncp.a3nguyenchonphuoc_se18d04.pojos.BookingDetail;
import ncp.a3nguyenchonphuoc_se18d04.pojos.Room;
import ncp.a3nguyenchonphuoc_se18d04.pojos.User;
import ncp.a3nguyenchonphuoc_se18d04.pojos.enums.BookingStatus;
import ncp.a3nguyenchonphuoc_se18d04.pojos.enums.Role;
import ncp.a3nguyenchonphuoc_se18d04.pojos.enums.RoomStatus;
import ncp.a3nguyenchonphuoc_se18d04.repositories.IBookingDetailRepository;
import ncp.a3nguyenchonphuoc_se18d04.repositories.IBookingRepository;
import ncp.a3nguyenchonphuoc_se18d04.repositories.IRoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class BookingService implements IBookingService {

    private final IBookingRepository bookingRepository;
    private final IRoomRepository roomRepository;
    private final IBookingDetailRepository bookingDetailRepository;

    @Override
    @Transactional
    public BookingResponse createBooking(User customer, BookingCreateRequest request) {
        if (request.getRoomIds().isEmpty()) {
            throw new IllegalArgumentException("Phải chọn ít nhất 1 phòng");
        }

        // Kiểm tra phòng có available không
        List<Room> rooms = new ArrayList<>();
        double perNightSum = 0.0;

        for (Long roomId : request.getRoomIds()) {
            Room room = roomRepository.findById(roomId)
                    .orElseThrow(() -> new NoSuchElementException("Không tìm thấy phòng " + roomId));

            if (room.getStatus() != RoomStatus.AVAILABLE) {
                throw new IllegalStateException("Phòng " + room.getRoomNumber() + " không khả dụng");
            }

            perNightSum += room.getRoomType().getPricePerNight();
            rooms.add(room);
        }
        // compute number of nights
        long nights = java.time.temporal.ChronoUnit.DAYS.between(request.getCheckInDate(), request.getCheckOutDate());
        if (nights <= 0)
            nights = 1; // fallback

        double total = perNightSum * (double) nights;

        Booking booking = Booking.builder()
                .customer(customer)
                .checkInDate(request.getCheckInDate())
                .checkOutDate(request.getCheckOutDate())
                .status(BookingStatus.PENDING)
                .totalAmount(total)
                .totalPrice(total)
                .build();

        booking = bookingRepository.save(booking);

        // Tạo details
        for (Room room : rooms) {
            BookingDetail detail = BookingDetail.builder()
                    .booking(booking)
                    .room(room)
                    .startDate(request.getCheckInDate())
                    .endDate(request.getCheckOutDate())
                    .priceAtBooking(room.getRoomType().getPricePerNight())
                    .actualPrice(room.getRoomType().getPricePerNight())
                    .build();
            bookingDetailRepository.save(detail);
            booking.addDetail(detail);
        }

        return mapToResponse(booking);
    }

    @Override
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Không tìm thấy booking"));
    }

    @Override
    public List<Booking> getBookingsByCustomer(User customer) {
        return bookingRepository.findByCustomer(customer);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    @Transactional
    public void updateBookingStatus(Long bookingId, BookingStatus newStatus) {
        Booking booking = getBookingById(bookingId);
        booking.setStatus(newStatus);
        bookingRepository.save(booking);
    }

    @Override
    @Transactional
    public void cancelBooking(Long bookingId, User currentUser) {
        Booking booking = getBookingById(bookingId);

        if (!booking.getCustomer().getId().equals(currentUser.getId()) &&
                currentUser.getRole() != Role.STAFF) {
            throw new SecurityException("Không có quyền hủy booking này");
        }

        if (booking.getStatus() == BookingStatus.CONFIRMED ||
                booking.getStatus() == BookingStatus.COMPLETED) {
            throw new IllegalStateException("Không thể hủy booking đã xác nhận/hoàn tất");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    private BookingResponse mapToResponse(Booking booking) {
        // Bạn có thể tạo DTO riêng chi tiết hơn
        BookingResponse resp = new BookingResponse();
        resp.setId(booking.getId());
        resp.setCustomerEmail(booking.getCustomer().getEmail());
        resp.setCheckInDate(booking.getCheckInDate());
        resp.setCheckOutDate(booking.getCheckOutDate());
        resp.setStatus(booking.getStatus());
        resp.setTotalAmount(booking.getTotalAmount());
        // thêm details nếu cần
        return resp;
    }
}