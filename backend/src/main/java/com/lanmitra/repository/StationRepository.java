package com.lanmitra.repository;

import com.lanmitra.entity.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StationRepository extends JpaRepository<Station, Long> {
    List<Station> findByCafeId(Long cafeId);
    boolean existsByCafeIdAndLabel(Long cafeId, String label);
}
