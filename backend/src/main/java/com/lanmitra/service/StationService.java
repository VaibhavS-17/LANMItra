package com.lanmitra.service;

import com.lanmitra.dto.request.StationRequest;
import com.lanmitra.dto.response.StationResponse;
import com.lanmitra.entity.Cafe;
import com.lanmitra.entity.Station;
import com.lanmitra.repository.CafeRepository;
import com.lanmitra.repository.StationRepository;
import org.springframework.stereotype.Service;

@Service
public class StationService {
    
    private final StationRepository stationRepository;
    private final CafeRepository cafeRepository;

    public StationService(StationRepository stationRepository, CafeRepository cafeRepository) {
        this.stationRepository = stationRepository;
        this.cafeRepository = cafeRepository;
    }

    public StationResponse addStation(Long cafeId, Long ownerId, StationRequest request) {
        Cafe cafe = cafeRepository.findById(cafeId)
                .orElseThrow(() -> new com.lanmitra.exception.ResourceNotFoundException("Cafe not found"));
        
        if (!cafe.getOwner().getId().equals(ownerId)) {
            throw new org.springframework.security.access.AccessDeniedException("User is not the owner of this cafe");
        }

        if (stationRepository.existsByCafeIdAndLabel(cafeId, request.getLabel())) {
            throw new com.lanmitra.exception.DuplicateResourceException("Station with this label already exists in this cafe");
        }

        Station station = new Station();
        station.setCafe(cafe);
        station.setLabel(request.getLabel());
        station.setType(request.getType());
        station.setSpecs(request.getSpecs());
        station.setHourlyRate(request.getHourlyRate());
        station.setIsActive(true);

        return mapToResponse(stationRepository.save(station));
    }

    public java.util.List<StationResponse> listStations(Long cafeId) {
        return stationRepository.findByCafeId(cafeId).stream()
                .map(this::mapToResponse)
                .toList();
    }

    public StationResponse updateStation(Long id, Long ownerId, StationRequest request) {
        Station station = stationRepository.findById(id)
                .orElseThrow(() -> new com.lanmitra.exception.ResourceNotFoundException("Station not found"));
        
        if (!station.getCafe().getOwner().getId().equals(ownerId)) {
            throw new org.springframework.security.access.AccessDeniedException("Not owner");
        }

        if (!station.getLabel().equals(request.getLabel()) && 
            stationRepository.existsByCafeIdAndLabel(station.getCafe().getId(), request.getLabel())) {
            throw new com.lanmitra.exception.DuplicateResourceException("Duplicate label");
        }

        station.setLabel(request.getLabel());
        station.setType(request.getType());
        station.setSpecs(request.getSpecs());
        station.setHourlyRate(request.getHourlyRate());

        return mapToResponse(stationRepository.save(station));
    }

    public void deactivateStation(Long id, Long ownerId) {
        Station station = stationRepository.findById(id)
                .orElseThrow(() -> new com.lanmitra.exception.ResourceNotFoundException("Station not found"));
        
        if (!station.getCafe().getOwner().getId().equals(ownerId)) {
            throw new org.springframework.security.access.AccessDeniedException("Not owner");
        }

        station.setIsActive(false);
        stationRepository.save(station);
    }

    private StationResponse mapToResponse(Station station) {
        StationResponse response = new StationResponse();
        response.setId(station.getId());
        response.setCafeId(station.getCafe().getId());
        response.setLabel(station.getLabel());
        response.setType(station.getType());
        response.setSpecs(station.getSpecs());
        response.setHourlyRate(station.getHourlyRate());
        response.setActive(station.isIsActive());
        return response;
    }
}
