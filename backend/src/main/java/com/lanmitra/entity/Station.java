package com.lanmitra.entity;

import com.lanmitra.enums.StationType;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "stations", uniqueConstraints = {@UniqueConstraint(columnNames = {"cafe_id", "label"})})
@Data
public class Station {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cafe_id", nullable = false)
    private Cafe cafe;
    
    @Column(nullable = false, length = 50)
    private String label;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StationType type;
    
    @Column(length = 500)
    private String specs;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal hourlyRate;
    
    @Column(nullable = false)
    private boolean isActive = true;
    
    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
