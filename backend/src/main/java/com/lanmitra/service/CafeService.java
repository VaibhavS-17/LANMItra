package com.lanmitra.service;

import com.lanmitra.dto.request.CafeRequest;
import com.lanmitra.dto.response.CafeResponse;
import com.lanmitra.entity.Cafe;
import com.lanmitra.entity.User;
import com.lanmitra.repository.CafeRepository;
import com.lanmitra.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CafeService {
    
    private final CafeRepository cafeRepository;
    private final UserRepository userRepository;
    
    public CafeService(CafeRepository cafeRepository, UserRepository userRepository) {
        this.cafeRepository = cafeRepository;
        this.userRepository = userRepository;
    }
    
    @Transactional
    public CafeResponse createCafe(Long ownerId, CafeRequest request) {
        User owner = userRepository.findById(ownerId).orElseThrow();
        if (owner.getRole() != com.lanmitra.enums.UserRole.CAFE_OWNER) {
            throw new org.springframework.security.access.AccessDeniedException("User is not a CAFE_OWNER");
        }
        Cafe cafe = new Cafe();
        cafe.setOwner(owner);
        cafe.setName(request.getName());
        cafe.setAddress(request.getAddress());
        cafe.setCity(request.getCity());
        cafe.setDescription(request.getDescription());
        cafe.setImageUrl(request.getImageUrl());
        cafe.setPhone(request.getPhone());
        cafe.setOpeningTime(request.getOpeningTime());
        cafe.setClosingTime(request.getClosingTime());
        cafe.setIsActive(true);
        
        Cafe saved = cafeRepository.save(cafe);
        return mapToResponse(saved);
    }

    public java.util.List<CafeResponse> findAll() {
        return cafeRepository.findAll().stream().map(this::mapToResponse).toList();
    }

    public java.util.List<CafeResponse> search(String query) {
        return cafeRepository.findByCityContainingIgnoreCaseOrNameContainingIgnoreCase(query, query)
                .stream().map(this::mapToResponse).toList();
    }

    public CafeResponse findById(Long id) {
        return cafeRepository.findById(id).map(this::mapToResponse).orElseThrow();
    }

    public java.util.List<CafeResponse> findByOwner(Long ownerId) {
        return cafeRepository.findByOwnerId(ownerId).stream().map(this::mapToResponse).toList();
    }

    @Transactional
    public CafeResponse updateCafe(Long id, Long ownerId, CafeRequest request) {
        Cafe cafe = cafeRepository.findById(id).orElseThrow();
        if (!cafe.getOwner().getId().equals(ownerId)) {
            throw new org.springframework.security.access.AccessDeniedException("Not owner");
        }
        cafe.setName(request.getName());
        if (request.getAddress() != null) cafe.setAddress(request.getAddress());
        if (request.getCity() != null) cafe.setCity(request.getCity());
        if (request.getDescription() != null) cafe.setDescription(request.getDescription());
        if (request.getImageUrl() != null) cafe.setImageUrl(request.getImageUrl());
        if (request.getPhone() != null) cafe.setPhone(request.getPhone());
        if (request.getOpeningTime() != null) cafe.setOpeningTime(request.getOpeningTime());
        if (request.getClosingTime() != null) cafe.setClosingTime(request.getClosingTime());
        
        return mapToResponse(cafeRepository.save(cafe));
    }

    private CafeResponse mapToResponse(Cafe saved) {
        CafeResponse response = new CafeResponse();
        response.setId(saved.getId());
        response.setName(saved.getName());
        if (saved.getOwner() != null) response.setOwnerId(saved.getOwner().getId());
        response.setAddress(saved.getAddress());
        response.setCity(saved.getCity());
        response.setDescription(saved.getDescription());
        response.setImageUrl(saved.getImageUrl());
        response.setPhone(saved.getPhone());
        response.setOpeningTime(saved.getOpeningTime());
        response.setClosingTime(saved.getClosingTime());
        response.setActive(saved.isIsActive());
        return response;
    }
}
