package com.lanmitra.service;
import com.lanmitra.entity.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.util.Map;
import java.util.HashMap;

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
    public Cafe createCafe(Long ownerId, Cafe request) {
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
        return saved;
    }

    public java.util.List<Cafe> findAll() {
        return cafeRepository.findAll();
    }

    public java.util.List<Cafe> search(String query) {
        return cafeRepository.findByCityContainingIgnoreCaseOrNameContainingIgnoreCase(query, query)
                ;
    }

    public Cafe findById(Long id) {
        return cafeRepository.findById(id).orElseThrow();
    }

    public java.util.List<Cafe> findByOwner(Long ownerId) {
        return cafeRepository.findByOwnerId(ownerId);
    }

    @Transactional
    public Cafe updateCafe(Long id, Long ownerId, Cafe request) {
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
        
        return cafeRepository.save(cafe);
    }

    }
