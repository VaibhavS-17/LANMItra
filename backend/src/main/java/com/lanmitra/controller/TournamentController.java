package com.lanmitra.controller;

import com.lanmitra.dto.request.TournamentRegistrationRequest;
import com.lanmitra.dto.request.TournamentRequest;
import com.lanmitra.dto.response.TournamentResponse;
import com.lanmitra.service.TournamentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tournaments")
public class TournamentController {

    private final TournamentService tournamentService;

    public TournamentController(TournamentService tournamentService) {
        this.tournamentService = tournamentService;
    }

    @GetMapping
    public ResponseEntity<List<TournamentResponse>> getAllActiveTournaments() {
        return ResponseEntity.ok(tournamentService.getAllActiveTournaments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TournamentResponse> getTournamentDetails(@PathVariable Long id) {
        return ResponseEntity.ok(tournamentService.getTournamentDetails(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('CAFE_OWNER')")
    public ResponseEntity<TournamentResponse> createTournament(@RequestBody TournamentRequest request) {
        TournamentResponse response = tournamentService.createTournament(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/register")
    @PreAuthorize("hasRole('PLAYER')")
    public ResponseEntity<?> registerPlayer(@PathVariable Long id, 
                                            @RequestBody TournamentRegistrationRequest request,
                                            Authentication authentication) {
        try {
            tournamentService.registerPlayer(id, authentication.getName(), request);
            return ResponseEntity.ok().body("Successfully registered for the tournament");
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
