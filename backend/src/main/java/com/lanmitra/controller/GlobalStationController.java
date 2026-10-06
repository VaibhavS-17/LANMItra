package com.lanmitra.controller;

import com.lanmitra.dto.response.StationResponse;
import com.lanmitra.service.StationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stations")
public class GlobalStationController {

    private final StationService stationService;

    public GlobalStationController(StationService stationService) {
        this.stationService = stationService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<StationResponse> getStation(@PathVariable Long id) {
        return ResponseEntity.ok(stationService.getStationById(id));
    }
}
