package com.lanmitra.entity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import com.lanmitra.enums.BookingStatus;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "bookings")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Booking {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "station_id", nullable = false)
    private Station station;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id", nullable = false)
    private User player;
    
    @Column(nullable = false)
    private LocalDate bookingDate;
    
    @Column(nullable = false)
    private LocalTime startTime;
    
    @Column(nullable = false)
    private LocalTime endTime;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status = BookingStatus.CONFIRMED;
    
    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Transient
    private Long stationId;

    @Transient
    private LocalDate date;

    public Long getStationId() {
        if (stationId != null) return stationId;
        return station != null ? station.getId() : null;
    }

    public void setStationId(Long stationId) {
        this.stationId = stationId;
        if (this.station == null && stationId != null) {
            Station s = new Station();
            s.setId(stationId);
            this.station = s;
        }
    }

    public LocalDate getDate() {
        return date != null ? date : bookingDate;
    }

    public void setDate(LocalDate date) {
        this.date = date;
        if (this.bookingDate == null) {
            this.bookingDate = date;
        }
    }

    @Transient
    public String getCafeName() {
        return (station != null && station.getCafe() != null) ? station.getCafe().getName() : null;
    }

    @Transient
    public String getStationLabel() {
        return station != null ? station.getLabel() : null;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Station getStation() { return station; }
    public void setStation(Station station) { this.station = station; }
    public User getPlayer() { return player; }
    public void setPlayer(User player) { this.player = player; }
    public LocalDate getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDate bookingDate) { this.bookingDate = bookingDate; }
    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }
    public LocalTime getEndTime() { return endTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }
    public BigDecimal getTotalPrice() { return totalPrice; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }
    public BookingStatus getStatus() { return status; }
    public void setStatus(BookingStatus status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}


