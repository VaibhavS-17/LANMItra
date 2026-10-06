package com.lanmitra.dto.request;

import com.lanmitra.enums.StationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class StationRequest {
    @NotBlank
    private String label;
    @NotNull
    private StationType type;
    private String specs;
    @NotNull
    private BigDecimal hourlyRate;

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
    public StationType getType() { return type; }
    public void setType(StationType type) { this.type = type; }
    public String getSpecs() { return specs; }
    public void setSpecs(String specs) { this.specs = specs; }
    public BigDecimal getHourlyRate() { return hourlyRate; }
    public void setHourlyRate(BigDecimal hourlyRate) { this.hourlyRate = hourlyRate; }
}
