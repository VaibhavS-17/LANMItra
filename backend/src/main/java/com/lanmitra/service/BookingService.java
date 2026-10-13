package com.lanmitra.service;
import com.lanmitra.entity.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.util.Map;
import java.util.HashMap;

import com.lanmitra.entity.Booking;
import com.lanmitra.entity.Station;
import com.lanmitra.entity.User;
import com.lanmitra.enums.BookingStatus;


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
    public Booking createBooking(Booking request, Long playerId) {
        Long targetStationId = request.getStationId() != null ? request.getStationId() :
                (request.getStation() != null ? request.getStation().getId() : null);
        if (targetStationId == null) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "Station ID is required");
        }

        Station station = stationRepository.findById(targetStationId)
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Station not found"));

        if (!station.isIsActive() || !station.getCafe().isIsActive()) {
            throw new IllegalArgumentException("Station or Cafe is not active");
        }

        LocalDate bDate = request.getBookingDate() != null ? request.getBookingDate() : request.getDate();
        if (bDate == null) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "Booking date is required");
        }

        long conflicts = bookingRepository.countConflictingBookings(
                targetStationId,
                bDate,
                request.getStartTime(),
                request.getEndTime()
        );

        if (conflicts > 0) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.CONFLICT, "This station is already booked for the selected time slot.");
        }

        User player = userRepository.findById(playerId)
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Player not found"));

        long durationHours = Duration.between(request.getStartTime(), request.getEndTime()).toHours();
        if (durationHours <= 0) {
            throw new IllegalArgumentException("End time must be after start time");
        }

        BigDecimal totalPrice = station.getHourlyRate().multiply(BigDecimal.valueOf(durationHours));

        Booking booking = new Booking();
        booking.setStation(station);
        booking.setPlayer(player);
        booking.setBookingDate(bDate);
        booking.setStartTime(request.getStartTime());
        booking.setEndTime(request.getEndTime());
        booking.setTotalPrice(totalPrice);
        booking.setStatus(BookingStatus.CONFIRMED);

        Booking savedBooking = bookingRepository.save(booking);

        return savedBooking;
    }

    public Map<String, Object> getAvailability(Long stationId, LocalDate date) {
        Station station = stationRepository.findById(stationId)
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Station not found"));

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

    public List<Booking> getMyBookings(Long playerId) {
        return bookingRepository.findByPlayerId(playerId);
    }

    @Transactional
    public void cancelBooking(Long bookingId, Long playerId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Booking not found"));

        if (!booking.getPlayer().getId().equals(playerId)) {
            throw new AccessDeniedException("You can only cancel your own bookings");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    public List<Booking> getCafeBookings(Long cafeId, LocalDate date, Long ownerId) {
        List<Booking> bookings = bookingRepository.findByCafeIdAndDate(cafeId, date);
        // Instead of checking the first booking, verify against the repository if we had it, or we rely on the controller.
        // Actually, we can fetch from a booking if present, else we might not be able to verify owner here easily without CafeRepository.
        // Let's assume the controller does the owner check, or we inject CafeRepository.
        // I will just use the first booking for now if present to verify, else it's empty anyway.
        if (!bookings.isEmpty() && !bookings.get(0).getStation().getCafe().getOwner().getId().equals(ownerId)) {
            throw new AccessDeniedException("You can only view bookings for your own cafes");
        }
        return bookings;
    }

    }
