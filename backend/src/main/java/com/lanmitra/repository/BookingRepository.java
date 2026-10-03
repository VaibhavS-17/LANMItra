package com.lanmitra.repository;

import com.lanmitra.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByPlayerId(Long playerId);
    
    @Query("SELECT b FROM Booking b WHERE b.station.cafe.id = :cafeId AND b.bookingDate = :date")
    List<Booking> findByCafeIdAndDate(@Param("cafeId") Long cafeId, @Param("date") LocalDate date);

    @Query("SELECT b FROM Booking b WHERE b.station.id = :stationId AND b.bookingDate = :date AND b.status = 'CONFIRMED'")
    List<Booking> findConfirmedByStationIdAndDate(@Param("stationId") Long stationId, @Param("date") LocalDate date);

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.station.id = :stationId " +
           "AND b.bookingDate = :date AND b.status = 'CONFIRMED' " +
           "AND b.startTime < :endTime AND b.endTime > :startTime")
    long countConflictingBookings(@Param("stationId") Long stationId, @Param("date") LocalDate date, 
                                  @Param("startTime") LocalTime startTime, @Param("endTime") LocalTime endTime);
}
