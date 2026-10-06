package com.lanmitra.dto.response;

import com.lanmitra.enums.StationType;
import java.math.BigDecimal;

public class StationResponse {
    private Long id;
    private Long cafeId;
    private String label;
    private StationType type;
    private String specs;
    private BigDecimal hourlyRate;
    private boolean isActive;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getCafeId() { return cafeId; }
    public void setCafeId(Long cafeId) { this.cafeId = cafeId; }
    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
    public StationType getType() { return type; }
    public void setType(StationType type) { this.type = type; }
    public String getSpecs() { return specs; }
    public void setSpecs(String specs) { this.specs = specs; }
    public BigDecimal getHourlyRate() { return hourlyRate; }
    public void setHourlyRate(BigDecimal hourlyRate) { this.hourlyRate = hourlyRate; }
    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
}
