package com.lanmitra.controller;

import com.lanmitra.dto.response.PlayerStatResponse;
import com.lanmitra.service.PlayerStatService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leaderboards")
public class LeaderboardController {

    private final PlayerStatService playerStatService;

    public LeaderboardController(PlayerStatService playerStatService) {
        this.playerStatService = playerStatService;
    }

    @GetMapping
    public ResponseEntity<List<PlayerStatResponse>> getLeaderboards(
            @RequestParam(required = false) String game,
            @RequestParam(defaultValue = "50") int limit) {
        return ResponseEntity.ok(playerStatService.getLeaderboard(game, limit));
    }

    @PostMapping("/update")
    @PreAuthorize("hasRole('CAFE_OWNER')")
    public ResponseEntity<?> updateElo(@RequestBody Map<String, Object> payload) {
        String playerEmail = payload.get("playerEmail").toString();
        String game = payload.get("game").toString();
        boolean won = Boolean.parseBoolean(payload.get("won").toString());
        
        playerStatService.updateElo(playerEmail, game, won);
        return ResponseEntity.ok("Elo updated successfully");
    }
}
