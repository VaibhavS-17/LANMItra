package com.lanmitra.controller;

import com.lanmitra.dto.request.BookingRequest;
import com.lanmitra.dto.response.BookingResponse;
import com.lanmitra.entity.User;
import com.lanmitra.exception.ResourceNotFoundException;
import com.lanmitra.repository.UserRepository;
import com.lanmitra.service.BookingService;
import jakarta.validation.Valid;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")

public class BookingController {

    private final BookingService bookingService;
    private final UserRepository userRepository;

    public BookingController(BookingService bookingService, UserRepository userRepository) {
        this.bookingService = bookingService;
        this.userRepository = userRepository;
    }

    private Long getUserIdFromPrincipal(Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return user.getId();
    }

    @GetMapping("/stations/{id}/availability")
    public ResponseEntity<Map<String, Object>> getAvailability(
            @PathVariable Long id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(bookingService.getAvailability(id, date));
    }

    @PostMapping("/bookings")
    @PreAuthorize("hasRole('PLAYER') or hasRole('ADMIN')")
    public ResponseEntity<BookingResponse> createBooking(
            @Valid @RequestBody BookingRequest request,
            Principal principal) {
        Long playerId = getUserIdFromPrincipal(principal);
        BookingResponse response = bookingService.createBooking(request, playerId);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/bookings/my")
    public ResponseEntity<List<BookingResponse>> getMyBookings(Principal principal) {
        Long playerId = getUserIdFromPrincipal(principal);
        return ResponseEntity.ok(bookingService.getMyBookings(playerId));
    }

    @PutMapping("/bookings/{id}/cancel")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long id, Principal principal) {
        Long playerId = getUserIdFromPrincipal(principal);
        bookingService.cancelBooking(id, playerId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/cafes/{id}/bookings")
    @PreAuthorize("hasRole('CAFE_OWNER') or hasRole('ADMIN')")
    public ResponseEntity<List<BookingResponse>> getCafeBookings(
            @PathVariable Long id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            Principal principal) {
        Long ownerId = getUserIdFromPrincipal(principal);
        return ResponseEntity.ok(bookingService.getCafeBookings(id, date, ownerId));
    }
}
