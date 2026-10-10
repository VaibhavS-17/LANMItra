package com.lanmitra.service;
import com.lanmitra.entity.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.util.Map;
import java.util.HashMap;

import com.lanmitra.entity.PlayerStat;
import com.lanmitra.entity.User;

import com.lanmitra.repository.PlayerStatRepository;
import com.lanmitra.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlayerStatService {

    private final PlayerStatRepository playerStatRepository;
    private final UserRepository userRepository;

    public PlayerStatService(PlayerStatRepository playerStatRepository, UserRepository userRepository) {
        this.playerStatRepository = playerStatRepository;
        this.userRepository = userRepository;
    }

    public List<PlayerStat> getLeaderboard(String game, int limit) {
        List<PlayerStat> stats;
        if (game != null && !game.isEmpty()) {
            stats = playerStatRepository.findByGameOrderByEloScoreDesc(game, PageRequest.of(0, limit));
        } else {
            stats = playerStatRepository.findAllByOrderByEloScoreDesc(PageRequest.of(0, limit));
        }

        return stats;
    }

    @Transactional
    public void updateElo(String playerEmail, String game, boolean won) {
        User player = userRepository.findByEmail(playerEmail)
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Player not found with email: " + playerEmail));

        PlayerStat stat = playerStatRepository.findByPlayerIdAndGame(player.getId(), game)
                .orElseGet(() -> {
                    PlayerStat newStat = new PlayerStat();
                    newStat.setPlayer(player);
                    newStat.setGame(game);
                    return newStat;
                });

        stat.setMatchesPlayed(stat.getMatchesPlayed() + 1);
        if (won) {
            stat.setWins(stat.getWins() + 1);
            stat.setEloScore(stat.getEloScore() + 25); // Simple Elo bump
        } else {
            stat.setLosses(stat.getLosses() + 1);
            stat.setEloScore(Math.max(0, stat.getEloScore() - 15)); // Simple Elo drop, prevent < 0
        }

        playerStatRepository.save(stat);
    }

    public List<PlayerStat> getMyStats(Long playerId) {
        return playerStatRepository.findByPlayerId(playerId);
    }

    }
