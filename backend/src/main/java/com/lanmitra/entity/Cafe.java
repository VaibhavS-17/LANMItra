package com.lanmitra.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "cafes")
@Data
public class Cafe {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;
    
    @Column(nullable = false, length = 200)
    private String name;
    
    @Column(nullable = false, length = 500)
    private String address;
    
    @Column(nullable = false, length = 100)
    private String city;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(length = 500)
    private String imageUrl;
    
    @Column(length = 20)
    private String phone;
    
    @Column(nullable = false)
    private LocalTime openingTime = LocalTime.of(10, 0);
    
    @Column(nullable = false)
    private LocalTime closingTime = LocalTime.of(23, 0);
    
    @Column(nullable = false)
    private boolean isActive = true;
    
    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    public void preUpdate() { this.updatedAt = LocalDateTime.now(); }
}
