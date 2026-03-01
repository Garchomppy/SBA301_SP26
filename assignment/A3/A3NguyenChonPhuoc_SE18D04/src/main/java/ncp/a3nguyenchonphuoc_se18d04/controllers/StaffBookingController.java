package ncp.a3nguyenchonphuoc_se18d04.controllers;

import lombok.RequiredArgsConstructor;
import ncp.a3nguyenchonphuoc_se18d04.pojos.Booking;
import ncp.a3nguyenchonphuoc_se18d04.pojos.enums.BookingStatus;
import ncp.a3nguyenchonphuoc_se18d04.repositories.IBookingRepository;
import ncp.a3nguyenchonphuoc_se18d04.services.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/bookings")
@RequiredArgsConstructor
public class StaffBookingController {

    private final IBookingRepository bookingRepository;
    private final BookingService bookingService;

    /**
     * Get all bookings (for staff to manage)
     */
    @GetMapping
    public ResponseEntity<?> getAllBookings() {
        try {
            List<Booking> bookings = bookingRepository.findAll();
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi lấy danh sách booking"));
        }
    }

    /**
     * Get booking by ID with all details
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingById(@PathVariable Long id) {
        try {
            Booking booking = bookingRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy booking"));
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi lấy chi tiết booking"));
        }
    }

    /**
     * Get bookings by customer ID
     */
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<?> getBookingsByCustomer(@PathVariable Long customerId) {
        try {
            List<Booking> bookings = bookingRepository.findAll().stream()
                    .filter(b -> b.getCustomer().getId().equals(customerId))
                    .toList();
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi lấy booking của khách hàng"));
        }
    }

    /**
     * Get bookings by status
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<?> getBookingsByStatus(@PathVariable String status) {
        try {
            BookingStatus bookingStatus = BookingStatus.valueOf(status.toUpperCase());
            List<Booking> bookings = bookingRepository.findAll().stream()
                    .filter(b -> b.getStatus() == bookingStatus)
                    .toList();
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi lấy booking theo trạng thái"));
        }
    }

    /**
     * Update booking status (staff only action)
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateBookingStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        try {
            String newStatus = request.get("status");
            Booking booking = bookingRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy booking"));

            BookingStatus status = BookingStatus.valueOf(newStatus.toUpperCase());
            booking.setStatus(status);
            Booking updated = bookingRepository.save(booking);

            return ResponseEntity.ok(Map.of("message", "Cập nhật trạng thái booking thành công", "booking", updated));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi cập nhật trạng thái booking: " + e.getMessage()));
        }
    }

    /**
     * Update booking information
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBooking(
            @PathVariable Long id,
            @RequestBody Map<String, Object> updateRequest) {
        try {
            Booking booking = bookingRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy booking"));

            if (updateRequest.containsKey("totalAmount") && updateRequest.get("totalAmount") != null) {
                booking.setTotalAmount((Double) updateRequest.get("totalAmount"));
            }

            if (updateRequest.containsKey("status") && updateRequest.get("status") != null) {
                BookingStatus status = BookingStatus.valueOf(updateRequest.get("status").toString().toUpperCase());
                booking.setStatus(status);
            }

            Booking updated = bookingRepository.save(booking);
            return ResponseEntity.ok(Map.of("message", "Cập nhật booking thành công", "booking", updated));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi cập nhật booking: " + e.getMessage()));
        }
    }

    /**
     * Delete/Cancel booking by staff
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        try {
            Booking booking = bookingRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy booking"));

            booking.setStatus(BookingStatus.CANCELLED);
            bookingRepository.save(booking);

            return ResponseEntity.ok(Map.of("message", "Hủy booking thành công"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi hủy booking: " + e.getMessage()));
        }
    }

    /**
     * Get booking statistics
     */
    @GetMapping("/stats/overview")
    public ResponseEntity<?> getBookingStats() {
        try {
            List<Booking> allBookings = bookingRepository.findAll();

            long pending = allBookings.stream().filter(b -> b.getStatus() == BookingStatus.PENDING).count();
            long confirmed = allBookings.stream().filter(b -> b.getStatus() == BookingStatus.CONFIRMED).count();
            long completed = allBookings.stream().filter(b -> b.getStatus() == BookingStatus.COMPLETED).count();
            long cancelled = allBookings.stream().filter(b -> b.getStatus() == BookingStatus.CANCELLED).count();

            double totalRevenue = allBookings.stream()
                    .filter(b -> b.getStatus() == BookingStatus.COMPLETED)
                    .mapToDouble(Booking::getTotalAmount)
                    .sum();

            return ResponseEntity.ok(Map.of(
                    "totalBookings", allBookings.size(),
                    "pending", pending,
                    "confirmed", confirmed,
                    "completed", completed,
                    "cancelled", cancelled,
                    "totalRevenue", totalRevenue
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi lấy thống kê"));
        }
    }
}
