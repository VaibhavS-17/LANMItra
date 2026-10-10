package com.lanmitra.service;
import com.lanmitra.entity.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.util.Map;
import java.util.HashMap;

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

    public Station addStation(Long cafeId, Long ownerId, Station request) {
        Cafe cafe = cafeRepository.findById(cafeId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cafe not found"));
        
        if (!cafe.getOwner().getId().equals(ownerId)) {
            throw new org.springframework.security.access.AccessDeniedException("User is not the owner of this cafe");
        }

        if (stationRepository.existsByCafeIdAndLabel(cafeId, request.getLabel())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Station with this label already exists in this cafe");
        }

        Station station = new Station();
        station.setCafe(cafe);
        station.setLabel(request.getLabel());
        station.setType(request.getType());
        station.setSpecs(request.getSpecs());
        station.setHourlyRate(request.getHourlyRate());
        station.setIsActive(true);

        return stationRepository.save(station);
    }

    public Station getStationById(Long id) {
        Station station = stationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Station not found"));
        return station;
    }

    public java.util.List<Station> listStations(Long cafeId) {
        return stationRepository.findByCafeId(cafeId);
    }

    public Station updateStation(Long id, Long ownerId, Station request) {
        Station station = stationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Station not found"));
        
        if (!station.getCafe().getOwner().getId().equals(ownerId)) {
            throw new org.springframework.security.access.AccessDeniedException("Not owner");
        }

        if (!station.getLabel().equals(request.getLabel()) && 
            stationRepository.existsByCafeIdAndLabel(station.getCafe().getId(), request.getLabel())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Duplicate label");
        }

        station.setLabel(request.getLabel());
        station.setType(request.getType());
        station.setSpecs(request.getSpecs());
        station.setHourlyRate(request.getHourlyRate());

        return stationRepository.save(station);
    }

    public void deactivateStation(Long id, Long ownerId) {
        Station station = stationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Station not found"));
        
        if (!station.getCafe().getOwner().getId().equals(ownerId)) {
            throw new org.springframework.security.access.AccessDeniedException("Not owner");
        }

        station.setIsActive(false);
        stationRepository.save(station);
    }

    }
