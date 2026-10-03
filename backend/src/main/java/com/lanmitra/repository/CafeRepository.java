package com.lanmitra.repository;

import com.lanmitra.entity.Cafe;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CafeRepository extends JpaRepository<Cafe, Long> {
    List<Cafe> findByCityContainingIgnoreCaseOrNameContainingIgnoreCase(String city, String name);
    List<Cafe> findByOwnerId(Long ownerId);
}
