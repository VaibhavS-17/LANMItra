package com.lanmitra.service;

import com.lanmitra.dto.response.PlayerStatResponse;
import com.lanmitra.entity.PlayerStat;
import com.lanmitra.entity.User;
import com.lanmitra.exception.ResourceNotFoundException;
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

    public List<PlayerStatResponse> getLeaderboard(String game, int limit) {
        List<PlayerStat> stats;
        if (game != null && !game.isEmpty()) {
            stats = playerStatRepository.findByGameOrderByEloScoreDesc(game, PageRequest.of(0, limit));
        } else {
            stats = playerStatRepository.findAllByOrderByEloScoreDesc(PageRequest.of(0, limit));
        }

        return stats.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional
    public void updateElo(Long playerId, String game, boolean won) {
        User player = userRepository.findById(playerId)
                .orElseThrow(() -> new ResourceNotFoundException("Player not found"));

        PlayerStat stat = playerStatRepository.findByPlayerIdAndGame(playerId, game)
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

    private PlayerStatResponse mapToResponse(PlayerStat stat) {
        PlayerStatResponse res = new PlayerStatResponse();
        res.setPlayerName(stat.getPlayer().getName());
        res.setGame(stat.getGame());
        res.setEloScore(stat.getEloScore());
        res.setMatchesPlayed(stat.getMatchesPlayed());
        res.setWins(stat.getWins());
        res.setLosses(stat.getLosses());
        
        double winRate = 0;
        if (stat.getMatchesPlayed() > 0) {
            winRate = ((double) stat.getWins() / stat.getMatchesPlayed()) * 100.0;
        }
        // Round to 1 decimal place
        res.setWinRate(Math.round(winRate * 10.0) / 10.0);
        return res;
    }
}
