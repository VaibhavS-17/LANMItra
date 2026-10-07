package com.lanmitra.repository;

import com.lanmitra.entity.PlayerStat;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PlayerStatRepository extends JpaRepository<PlayerStat, Long> {
    Optional<PlayerStat> findByPlayerIdAndGame(Long playerId, String game);
    
    // Fetch top players for a specific game ordered by ELO
    List<PlayerStat> findByGameOrderByEloScoreDesc(String game, Pageable pageable);
    
    // Global leaderboard across games? Usually it's per game.
    // Fetch top players by ELO across all games
    List<PlayerStat> findAllByOrderByEloScoreDesc(Pageable pageable);

    // Fetch all stats for a specific player
    List<PlayerStat> findByPlayerId(Long playerId);
}
