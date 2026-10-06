package com.lanmitra.controller;

import com.lanmitra.dto.request.StationRequest;
import com.lanmitra.dto.response.StationResponse;
import com.lanmitra.entity.User;
import com.lanmitra.exception.ResourceNotFoundException;
import com.lanmitra.repository.UserRepository;
import com.lanmitra.service.StationService;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/cafes/{cafeId}/stations")
public class StationController {

    private final StationService stationService;
    private final UserRepository userRepository;

    public StationController(StationService stationService, UserRepository userRepository) {
        this.stationService = stationService;
        this.userRepository = userRepository;
    }

    private Long getUserIdFromPrincipal(Principal principal) {
        if (principal == null) return null;
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return user.getId();
    }

    @GetMapping
    public ResponseEntity<List<StationResponse>> getStations(@PathVariable Long cafeId) {
        return ResponseEntity.ok(stationService.listStations(cafeId));
    }

    @PostMapping
    @PreAuthorize("hasRole('CAFE_OWNER') or hasRole('ADMIN')")
    public ResponseEntity<StationResponse> addStation(
            @PathVariable Long cafeId,
            @Valid @RequestBody StationRequest request,
            Principal principal) {
        Long ownerId = getUserIdFromPrincipal(principal);
        StationResponse response = stationService.addStation(cafeId, ownerId, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('CAFE_OWNER') or hasRole('ADMIN')")
    public ResponseEntity<StationResponse> updateStation(
            @PathVariable Long cafeId,
            @PathVariable Long id,
            @Valid @RequestBody StationRequest request,
            Principal principal) {
        Long ownerId = getUserIdFromPrincipal(principal);
        StationResponse response = stationService.updateStation(id, ownerId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('CAFE_OWNER') or hasRole('ADMIN')")
    public ResponseEntity<Void> deactivateStation(
            @PathVariable Long cafeId,
            @PathVariable Long id,
            Principal principal) {
        Long ownerId = getUserIdFromPrincipal(principal);
        stationService.deactivateStation(id, ownerId);
        return ResponseEntity.noContent().build();
    }
}
