package com.lanmitra.service;

import com.lanmitra.dto.request.BookingRequest;
import com.lanmitra.dto.response.BookingResponse;
import com.lanmitra.entity.Booking;
import com.lanmitra.entity.Cafe;
import com.lanmitra.entity.Station;
import com.lanmitra.entity.User;
import com.lanmitra.enums.BookingStatus;
import com.lanmitra.exception.BookingConflictException;
import com.lanmitra.repository.BookingRepository;
import com.lanmitra.repository.StationRepository;
import com.lanmitra.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.access.AccessDeniedException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BookingServiceTest {

    @Mock
    private BookingRepository bookingRepository;
    @Mock
    private StationRepository stationRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private BookingService bookingService;

    private User player;
    private Cafe cafe;
    private Station station;

    @BeforeEach
    void setUp() {
        player = new User();
        player.setId(1L);

        cafe = new Cafe();
        cafe.setId(1L);
        cafe.setIsActive(true);
        cafe.setOpeningTime(LocalTime.of(10, 0));
        cafe.setClosingTime(LocalTime.of(23, 0));

        station = new Station();
        station.setId(1L);
        station.setCafe(cafe);
        station.setIsActive(true);
        station.setHourlyRate(BigDecimal.valueOf(100));
        station.setLabel("PC1");
    }

    @Test
    void createBooking_Success() {
        BookingRequest request = new BookingRequest();
        request.setStationId(1L);
        request.setDate(LocalDate.now());
        request.setStartTime(LocalTime.of(12, 0));
        request.setEndTime(LocalTime.of(14, 0));

        when(stationRepository.findById(1L)).thenReturn(Optional.of(station));
        when(bookingRepository.countConflictingBookings(eq(1L), any(), any(), any())).thenReturn(0L);
        when(userRepository.findById(1L)).thenReturn(Optional.of(player));
        
        Booking savedBooking = new Booking();
        savedBooking.setId(10L);
        savedBooking.setStation(station);
        savedBooking.setPlayer(player);
        savedBooking.setBookingDate(request.getDate());
        savedBooking.setStartTime(request.getStartTime());
        savedBooking.setEndTime(request.getEndTime());
        savedBooking.setTotalPrice(BigDecimal.valueOf(200));
        savedBooking.setStatus(BookingStatus.CONFIRMED);

        when(bookingRepository.save(any(Booking.class))).thenReturn(savedBooking);

        BookingResponse response = bookingService.createBooking(request, 1L);

        assertNotNull(response);
        assertEquals(10L, response.getId());
        assertEquals(BigDecimal.valueOf(200), response.getTotalPrice());
        verify(bookingRepository, times(1)).save(any(Booking.class));
    }

    @Test
    void createBooking_DoubleBooking_Rejects() {
        BookingRequest request = new BookingRequest();
        request.setStationId(1L);
        request.setDate(LocalDate.now());
        request.setStartTime(LocalTime.of(12, 0));
        request.setEndTime(LocalTime.of(14, 0));

        when(stationRepository.findById(1L)).thenReturn(Optional.of(station));
        when(bookingRepository.countConflictingBookings(eq(1L), any(), any(), any())).thenReturn(1L);

        assertThrows(BookingConflictException.class, () -> bookingService.createBooking(request, 1L));
    }

    @Test
    void getAvailability_Success() {
        LocalDate date = LocalDate.now();
        when(stationRepository.findById(1L)).thenReturn(Optional.of(station));
        when(bookingRepository.findConfirmedByStationIdAndDate(1L, date)).thenReturn(Collections.emptyList());

        Map<String, Object> availability = bookingService.getAvailability(1L, date);

        assertNotNull(availability);
        assertEquals(1L, availability.get("stationId"));
        
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> slots = (List<Map<String, Object>>) availability.get("slots");
        assertFalse(slots.isEmpty());
        // From 10 to 23, should be 13 slots
        assertEquals(13, slots.size());
        assertTrue((Boolean) slots.get(0).get("available"));
    }

    @Test
    void cancelBooking_Success() {
        Booking booking = new Booking();
        booking.setId(1L);
        booking.setPlayer(player);
        booking.setStatus(BookingStatus.CONFIRMED);

        when(bookingRepository.findById(1L)).thenReturn(Optional.of(booking));

        bookingService.cancelBooking(1L, 1L);

        assertEquals(BookingStatus.CANCELLED, booking.getStatus());
        verify(bookingRepository, times(1)).save(booking);
    }

    @Test
    void cancelBooking_NotOwner_ThrowsAccessDenied() {
        Booking booking = new Booking();
        booking.setId(1L);
        User anotherPlayer = new User();
        anotherPlayer.setId(2L);
        booking.setPlayer(anotherPlayer);
        booking.setStatus(BookingStatus.CONFIRMED);

        when(bookingRepository.findById(1L)).thenReturn(Optional.of(booking));

        assertThrows(AccessDeniedException.class, () -> bookingService.cancelBooking(1L, 1L));
    }
}
