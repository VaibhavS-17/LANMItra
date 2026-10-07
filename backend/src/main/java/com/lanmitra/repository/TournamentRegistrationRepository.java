package com.lanmitra.repository;

import com.lanmitra.entity.TournamentRegistration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TournamentRegistrationRepository extends JpaRepository<TournamentRegistration, Long> {
    List<TournamentRegistration> findByTournamentId(Long tournamentId);
    List<TournamentRegistration> findByPlayerId(Long playerId);
    Optional<TournamentRegistration> findByTournamentIdAndPlayerId(Long tournamentId, Long playerId);
    boolean existsByTournamentIdAndPlayerId(Long tournamentId, Long playerId);
}
