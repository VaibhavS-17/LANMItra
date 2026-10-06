package com.lanmitra.service;

import com.lanmitra.dto.request.StationRequest;
import com.lanmitra.dto.response.StationResponse;
import com.lanmitra.entity.Cafe;
import com.lanmitra.entity.Station;
import com.lanmitra.entity.User;
import com.lanmitra.enums.StationType;
import com.lanmitra.repository.CafeRepository;
import com.lanmitra.repository.StationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StationServiceTest {

    @Mock
    private StationRepository stationRepository;

    @Mock
    private CafeRepository cafeRepository;

    @InjectMocks
    private StationService stationService;

    private User owner;
    private Cafe cafe;
    private StationRequest request;
    private Station savedStation;

    @BeforeEach
    void setUp() {
        owner = new User();
        owner.setId(1L);

        cafe = new Cafe();
        cafe.setId(1L);
        cafe.setOwner(owner);

        request = new StationRequest();
        request.setLabel("PC-1");
        request.setType(StationType.PC);
        request.setSpecs("RTX 3060");
        request.setHourlyRate(new BigDecimal("50.0"));

        savedStation = new Station();
        savedStation.setId(1L);
        savedStation.setCafe(cafe);
        savedStation.setLabel(request.getLabel());
        savedStation.setType(request.getType());
        savedStation.setSpecs(request.getSpecs());
        savedStation.setHourlyRate(request.getHourlyRate());
        savedStation.setIsActive(true);
    }

    @Test
    void addStation_Success() {
        when(cafeRepository.findById(1L)).thenReturn(Optional.of(cafe));
        when(stationRepository.existsByCafeIdAndLabel(1L, "PC-1")).thenReturn(false);
        when(stationRepository.save(any(Station.class))).thenReturn(savedStation);

        StationResponse response = stationService.addStation(1L, 1L, request);

        assertNotNull(response);
        assertEquals("PC-1", response.getLabel());
        verify(stationRepository).save(any(Station.class));
    }

    @Test
    void addStation_DuplicateLabel_ThrowsDuplicateResource() {
        when(cafeRepository.findById(1L)).thenReturn(Optional.of(cafe));
        when(stationRepository.existsByCafeIdAndLabel(1L, "PC-1")).thenReturn(true);

        assertThrows(com.lanmitra.exception.DuplicateResourceException.class, 
            () -> stationService.addStation(1L, 1L, request));
    }

    @Test
    void addStation_NotOwner_ThrowsAccessDenied() {
        User otherOwner = new User();
        otherOwner.setId(2L);
        Cafe otherCafe = new Cafe();
        otherCafe.setId(1L);
        otherCafe.setOwner(otherOwner);

        when(cafeRepository.findById(1L)).thenReturn(Optional.of(otherCafe));

        assertThrows(org.springframework.security.access.AccessDeniedException.class, 
            () -> stationService.addStation(1L, 1L, request));
    }

    @Test
    void listStations_Success() {
        when(stationRepository.findByCafeId(1L)).thenReturn(java.util.List.of(savedStation));
        var result = stationService.listStations(1L);
        assertEquals(1, result.size());
    }

    @Test
    void updateStation_Success() {
        when(stationRepository.findById(1L)).thenReturn(Optional.of(savedStation));
        when(stationRepository.save(any(Station.class))).thenReturn(savedStation);
        
        StationRequest updateRequest = new StationRequest();
        updateRequest.setLabel("PC-1");
        updateRequest.setHourlyRate(new BigDecimal("60.0"));
        updateRequest.setType(StationType.PC);
        
        StationResponse result = stationService.updateStation(1L, 1L, updateRequest);
        assertNotNull(result);
        verify(stationRepository).save(any(Station.class));
    }

    @Test
    void deactivateStation_Success() {
        when(stationRepository.findById(1L)).thenReturn(Optional.of(savedStation));
        stationService.deactivateStation(1L, 1L);
        verify(stationRepository).save(any(Station.class));
    }
}
