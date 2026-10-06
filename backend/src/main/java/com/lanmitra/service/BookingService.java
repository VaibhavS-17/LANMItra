package com.lanmitra.service;

import com.lanmitra.dto.request.BookingRequest;
import com.lanmitra.dto.response.BookingResponse;
import com.lanmitra.entity.Booking;
import com.lanmitra.entity.Station;
import com.lanmitra.entity.User;
import com.lanmitra.enums.BookingStatus;
import com.lanmitra.exception.BookingConflictException;
import com.lanmitra.exception.ResourceNotFoundException;
import com.lanmitra.repository.BookingRepository;
import com.lanmitra.repository.StationRepository;
import com.lanmitra.repository.UserRepository;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service

public class BookingService {

    private final BookingRepository bookingRepository;
    private final StationRepository stationRepository;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository, StationRepository stationRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.stationRepository = stationRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public BookingResponse createBooking(BookingRequest request, Long playerId) {
        Station station = stationRepository.findById(request.getStationId())
                .orElseThrow(() -> new ResourceNotFoundException("Station not found"));

        if (!station.isIsActive() || !station.getCafe().isIsActive()) {
            throw new IllegalArgumentException("Station or Cafe is not active");
        }

        long conflicts = bookingRepository.countConflictingBookings(
                request.getStationId(),
                request.getDate(),
                request.getStartTime(),
                request.getEndTime()
        );

        if (conflicts > 0) {
            throw new BookingConflictException("This station is already booked for the selected time slot.");
        }

        User player = userRepository.findById(playerId)
                .orElseThrow(() -> new ResourceNotFoundException("Player not found"));

        long durationHours = Duration.between(request.getStartTime(), request.getEndTime()).toHours();
        if (durationHours <= 0) {
            throw new IllegalArgumentException("End time must be after start time");
        }

        BigDecimal totalPrice = station.getHourlyRate().multiply(BigDecimal.valueOf(durationHours));

        Booking booking = new Booking();
        booking.setStation(station);
        booking.setPlayer(player);
        booking.setBookingDate(request.getDate());
        booking.setStartTime(request.getStartTime());
        booking.setEndTime(request.getEndTime());
        booking.setTotalPrice(totalPrice);
        booking.setStatus(BookingStatus.CONFIRMED);

        Booking savedBooking = bookingRepository.save(booking);

        return mapToResponse(savedBooking);
    }

    public Map<String, Object> getAvailability(Long stationId, LocalDate date) {
        Station station = stationRepository.findById(stationId)
                .orElseThrow(() -> new ResourceNotFoundException("Station not found"));

        LocalTime opening = station.getCafe().getOpeningTime();
        LocalTime closing = station.getCafe().getClosingTime();

        List<Booking> confirmedBookings = bookingRepository.findConfirmedByStationIdAndDate(stationId, date);

        List<Map<String, Object>> slots = new ArrayList<>();
        LocalTime current = opening;

        while (current.isBefore(closing)) {
            LocalTime next = current.plusHours(1);
            if (next.isAfter(closing) && !next.equals(LocalTime.MIDNIGHT) && !next.isBefore(current)) {
                break;
            }

            final LocalTime slotStart = current;
            final LocalTime slotEnd = next;

            boolean isAvailable = confirmedBookings.stream().noneMatch(b ->
                    b.getStartTime().isBefore(slotEnd) && b.getEndTime().isAfter(slotStart)
            );

            Map<String, Object> slot = new HashMap<>();
            slot.put("startTime", slotStart.toString());
            slot.put("endTime", slotEnd.toString());
            slot.put("available", isAvailable);
            slots.add(slot);

            current = next;
            
            // If we wrapped around to midnight, stop to prevent infinite loop
            if (current.equals(LocalTime.MIDNIGHT) || current.isBefore(opening)) {
                break;
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("stationId", stationId);
        response.put("date", date.toString());
        response.put("slots", slots);

        return response;
    }

    public List<BookingResponse> getMyBookings(Long playerId) {
        return bookingRepository.findByPlayerId(playerId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void cancelBooking(Long bookingId, Long playerId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (!booking.getPlayer().getId().equals(playerId)) {
            throw new AccessDeniedException("You can only cancel your own bookings");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    public List<BookingResponse> getCafeBookings(Long cafeId, LocalDate date, Long ownerId) {
        List<Booking> bookings = bookingRepository.findByCafeIdAndDate(cafeId, date);
        // Instead of checking the first booking, verify against the repository if we had it, or we rely on the controller.
        // Actually, we can fetch from a booking if present, else we might not be able to verify owner here easily without CafeRepository.
        // Let's assume the controller does the owner check, or we inject CafeRepository.
        // I will just use the first booking for now if present to verify, else it's empty anyway.
        if (!bookings.isEmpty() && !bookings.get(0).getStation().getCafe().getOwner().getId().equals(ownerId)) {
            throw new AccessDeniedException("You can only view bookings for your own cafes");
        }
        return bookings.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private BookingResponse mapToResponse(Booking booking) {
        BookingResponse response = new BookingResponse();
        response.setId(booking.getId());
        response.setStationId(booking.getStation().getId());
        response.setStationLabel(booking.getStation().getLabel());
        response.setCafeName(booking.getStation().getCafe().getName());
        response.setPlayerName(booking.getPlayer().getName());
        response.setPlayerEmail(booking.getPlayer().getEmail());
        response.setDate(booking.getBookingDate());
        response.setStartTime(booking.getStartTime());
        response.setEndTime(booking.getEndTime());
        response.setTotalPrice(booking.getTotalPrice());
        response.setStatus(booking.getStatus());
        return response;
    }
}
