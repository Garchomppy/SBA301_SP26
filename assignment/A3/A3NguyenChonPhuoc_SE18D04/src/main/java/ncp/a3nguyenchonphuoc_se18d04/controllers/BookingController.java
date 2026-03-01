package ncp.a3nguyenchonphuoc_se18d04.controllers;

import lombok.RequiredArgsConstructor;
import ncp.a3nguyenchonphuoc_se18d04.dto.request.BookingCreateRequest;
import ncp.a3nguyenchonphuoc_se18d04.dto.respone.BookingResponse;
import ncp.a3nguyenchonphuoc_se18d04.pojos.Booking;
import ncp.a3nguyenchonphuoc_se18d04.pojos.User;
import ncp.a3nguyenchonphuoc_se18d04.repositories.IUserRepository;
import ncp.a3nguyenchonphuoc_se18d04.services.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    private final IUserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createBooking(
            @RequestBody BookingCreateRequest request,
            Authentication authentication) {
        try {
            String email = authentication.getName();
            User customer = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));

            BookingResponse response = bookingService.createBooking(customer, request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi tạo booking: " + e.getMessage()));
        }
    }


    @GetMapping("/my-history")
    public ResponseEntity<?> getMyBookingHistory(Authentication authentication) {
        try {
            String email = authentication.getName();
            User customer = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));

            List<Booking> bookings = bookingService.getBookingsByCustomer(customer);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi lấy lịch sử booking"));
        }
    }

    /**
     * Get booking detail by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingDetail(
            @PathVariable Long id,
            Authentication authentication) {
        try {
            String email = authentication.getName();
            User customer = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));

            Booking booking = bookingService.getBookingById(id);

            // Check if user is the owner or staff
            if (!booking.getCustomer().getId().equals(customer.getId()) &&
                    !customer.getRole().toString().equals("STAFF")) {
                return ResponseEntity.status(403).body(Map.of("error", "Không có quyền xem booking này"));
            }

            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi lấy chi tiết booking"));
        }
    }

    /**
     * Cancel a booking
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelBooking(
            @PathVariable Long id,
            Authentication authentication) {
        try {
            String email = authentication.getName();
            User customer = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));

            bookingService.cancelBooking(id, customer);
            return ResponseEntity.ok(Map.of("message", "Hủy booking thành công"));
        } catch (SecurityException e) {
            return ResponseEntity.status(403).body(Map.of("error", e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi hủy booking"));
        }
    }
}
