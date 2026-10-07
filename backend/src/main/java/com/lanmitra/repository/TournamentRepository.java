package com.lanmitra.repository;

import com.lanmitra.entity.Tournament;
import com.lanmitra.enums.TournamentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TournamentRepository extends JpaRepository<Tournament, Long> {
    List<Tournament> findByStatus(TournamentStatus status);
    List<Tournament> findByCafeId(Long cafeId);
}
