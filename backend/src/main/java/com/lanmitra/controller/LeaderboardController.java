package com.lanmitra.controller;

import com.lanmitra.dto.response.PlayerStatResponse;
import com.lanmitra.entity.User;
import com.lanmitra.repository.UserRepository;
import com.lanmitra.service.PlayerStatService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leaderboards")
public class LeaderboardController {

    private final PlayerStatService playerStatService;
    private final UserRepository userRepository;

    public LeaderboardController(PlayerStatService playerStatService, UserRepository userRepository) {
        this.playerStatService = playerStatService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<PlayerStatResponse>> getLeaderboards(
            @RequestParam(required = false) String game,
            @RequestParam(defaultValue = "50") int limit) {
        return ResponseEntity.ok(playerStatService.getLeaderboard(game, limit));
    }

    @GetMapping("/my")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<PlayerStatResponse>> getMyStats(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        return ResponseEntity.ok(playerStatService.getMyStats(user.getId()));
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
