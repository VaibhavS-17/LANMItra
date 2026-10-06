package com.lanmitra.service;

import com.lanmitra.dto.request.CafeRequest;
import com.lanmitra.dto.response.CafeResponse;
import com.lanmitra.entity.Cafe;
import com.lanmitra.entity.User;
import com.lanmitra.enums.UserRole;
import com.lanmitra.repository.CafeRepository;
import com.lanmitra.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CafeServiceTest {

    @Mock
    private CafeRepository cafeRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CafeService cafeService;

    private User owner;
    private CafeRequest request;
    private Cafe savedCafe;

    @BeforeEach
    void setUp() {
        owner = new User();
        owner.setId(1L);
        owner.setEmail("owner@example.com");
        owner.setRole(UserRole.CAFE_OWNER);

        request = new CafeRequest();
        request.setName("Cyber Cafe");
        request.setAddress("123 Main St");
        request.setCity("Mumbai");
        request.setDescription("A cool cafe");
        request.setImageUrl("http://image.com");
        request.setPhone("1234567890");
        request.setOpeningTime(LocalTime.of(9, 0));
        request.setClosingTime(LocalTime.of(22, 0));

        savedCafe = new Cafe();
        savedCafe.setId(1L);
        savedCafe.setName(request.getName());
        savedCafe.setAddress(request.getAddress());
        savedCafe.setCity(request.getCity());
        savedCafe.setOwner(owner);
    }

    @Test
    void createCafe_Success() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(owner));
        when(cafeRepository.save(any(Cafe.class))).thenReturn(savedCafe);

        CafeResponse response = cafeService.createCafe(1L, request);

        assertNotNull(response);
        assertEquals("Cyber Cafe", response.getName());
        verify(cafeRepository, times(1)).save(any(Cafe.class));
    }

    @Test
    void createCafe_NonOwner_ThrowsAccessDenied() {
        User nonOwner = new User();
        nonOwner.setId(2L);
        nonOwner.setRole(UserRole.PLAYER);
        
        when(userRepository.findById(2L)).thenReturn(Optional.of(nonOwner));

        assertThrows(org.springframework.security.access.AccessDeniedException.class, 
            () -> cafeService.createCafe(2L, request));
    }
    @Test
    void findAll_ReturnsList() {
        when(cafeRepository.findAll()).thenReturn(java.util.List.of(savedCafe));
        var result = cafeService.findAll();
        assertEquals(1, result.size());
        assertEquals("Cyber Cafe", result.get(0).getName());
    }

    @Test
    void search_ReturnsList() {
        when(cafeRepository.findByCityContainingIgnoreCaseOrNameContainingIgnoreCase("Mumbai", "Mumbai"))
            .thenReturn(java.util.List.of(savedCafe));
        var result = cafeService.search("Mumbai");
        assertEquals(1, result.size());
    }

    @Test
    void findById_Success() {
        when(cafeRepository.findById(1L)).thenReturn(Optional.of(savedCafe));
        CafeResponse result = cafeService.findById(1L);
        assertEquals("Cyber Cafe", result.getName());
    }

    @Test
    void findByOwner_ReturnsList() {
        when(cafeRepository.findByOwnerId(1L)).thenReturn(java.util.List.of(savedCafe));
        var result = cafeService.findByOwner(1L);
        assertEquals(1, result.size());
    }

    @Test
    void updateCafe_Success() {
        when(cafeRepository.findById(1L)).thenReturn(Optional.of(savedCafe));
        when(cafeRepository.save(any(Cafe.class))).thenReturn(savedCafe);
        
        CafeRequest updateRequest = new CafeRequest();
        updateRequest.setName("Updated Cafe");
        
        CafeResponse result = cafeService.updateCafe(1L, 1L, updateRequest);
        assertNotNull(result);
        verify(cafeRepository).save(any(Cafe.class));
    }

    @Test
    void updateCafe_NotOwner_ThrowsAccessDenied() {
        when(cafeRepository.findById(1L)).thenReturn(Optional.of(savedCafe));
        
        CafeRequest updateRequest = new CafeRequest();
        updateRequest.setName("Updated Cafe");
        
        assertThrows(org.springframework.security.access.AccessDeniedException.class, 
            () -> cafeService.updateCafe(1L, 2L, updateRequest));
    }
}
