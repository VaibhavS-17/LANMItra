package com.lanmitra.entity;

import com.lanmitra.enums.StationType;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "stations", uniqueConstraints = {@UniqueConstraint(columnNames = {"cafe_id", "label"})})
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

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Cafe getCafe() { return cafe; }
    public void setCafe(Cafe cafe) { this.cafe = cafe; }
    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
    public StationType getType() { return type; }
    public void setType(StationType type) { this.type = type; }
    public String getSpecs() { return specs; }
    public void setSpecs(String specs) { this.specs = specs; }
    public BigDecimal getHourlyRate() { return hourlyRate; }
    public void setHourlyRate(BigDecimal hourlyRate) { this.hourlyRate = hourlyRate; }
    public boolean isIsActive() { return isActive; }
    public void setIsActive(boolean isActive) { this.isActive = isActive; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
