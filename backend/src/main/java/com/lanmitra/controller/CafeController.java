package com.lanmitra.controller;

import com.lanmitra.dto.request.CafeRequest;
import com.lanmitra.dto.response.CafeResponse;
import com.lanmitra.entity.User;
import com.lanmitra.exception.ResourceNotFoundException;
import com.lanmitra.repository.UserRepository;
import com.lanmitra.service.CafeService;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/cafes")
public class CafeController {

    private final CafeService cafeService;
    private final UserRepository userRepository;

    public CafeController(CafeService cafeService, UserRepository userRepository) {
        this.cafeService = cafeService;
        this.userRepository = userRepository;
    }

    private Long getUserIdFromPrincipal(Principal principal) {
        if (principal == null) return null;
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return user.getId();
    }

    @GetMapping
    public ResponseEntity<List<CafeResponse>> getCafes(@RequestParam(required = false) String cityOrName) {
        if (cityOrName != null && !cityOrName.isBlank()) {
            return ResponseEntity.ok(cafeService.search(cityOrName));
        }
        return ResponseEntity.ok(cafeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CafeResponse> getCafe(@PathVariable Long id) {
        return ResponseEntity.ok(cafeService.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('CAFE_OWNER') or hasRole('ADMIN')")
    public ResponseEntity<CafeResponse> createCafe(@Valid @RequestBody CafeRequest request, Principal principal) {
        Long ownerId = getUserIdFromPrincipal(principal);
        CafeResponse response = cafeService.createCafe(ownerId, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('CAFE_OWNER') or hasRole('ADMIN')")
    public ResponseEntity<CafeResponse> updateCafe(@PathVariable Long id, @Valid @RequestBody CafeRequest request, Principal principal) {
        Long ownerId = getUserIdFromPrincipal(principal);
        CafeResponse response = cafeService.updateCafe(id, ownerId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('CAFE_OWNER') or hasRole('ADMIN')")
    public ResponseEntity<List<CafeResponse>> getMyCafes(Principal principal) {
        Long ownerId = getUserIdFromPrincipal(principal);
        return ResponseEntity.ok(cafeService.findByOwner(ownerId));
    }
}
