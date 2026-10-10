package com.lanmitra.service;
import com.lanmitra.entity.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.util.Map;
import java.util.HashMap;

import com.lanmitra.entity.Cafe;
import com.lanmitra.entity.Tournament;
import com.lanmitra.entity.TournamentRegistration;
import com.lanmitra.entity.User;
import com.lanmitra.enums.TournamentStatus;

import com.lanmitra.repository.CafeRepository;
import com.lanmitra.repository.TournamentRegistrationRepository;
import com.lanmitra.repository.TournamentRepository;
import com.lanmitra.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TournamentService {

    private final TournamentRepository tournamentRepository;
    private final TournamentRegistrationRepository registrationRepository;
    private final CafeRepository cafeRepository;
    private final UserRepository userRepository;

    public TournamentService(TournamentRepository tournamentRepository,
                             TournamentRegistrationRepository registrationRepository,
                             CafeRepository cafeRepository,
                             UserRepository userRepository) {
        this.tournamentRepository = tournamentRepository;
        this.registrationRepository = registrationRepository;
        this.cafeRepository = cafeRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Tournament createTournament(Tournament req) {
        Tournament t = new Tournament();
        t.setName(req.getName());
        t.setGame(req.getGame());
        t.setStartDate(req.getStartDate());
        t.setEndDate(req.getEndDate());
        t.setPrizePool(req.getPrizePool());
        t.setEntryFee(req.getEntryFee());
        t.setMaxParticipants(req.getMaxParticipants());
        
        if (req.getCafe().getId() != null) {
            Cafe cafe = cafeRepository.findById(req.getCafe().getId())
                    .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Cafe not found"));
            t.setCafe(cafe);
        }
        
        Tournament saved = tournamentRepository.save(t);
        return saved;
    }

    public List<Tournament> getAllActiveTournaments() {
        return tournamentRepository.findAll().stream()
                .filter(t -> t.getStatus() == TournamentStatus.UPCOMING || t.getStatus() == TournamentStatus.ONGOING)
                
                .collect(Collectors.toList());
    }

    public Tournament getTournamentDetails(Long id) {
        Tournament t = tournamentRepository.findById(id)
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Tournament not found"));
        return t;
    }

    @Transactional
    public void registerPlayer(Long tournamentId, String email, TournamentRegistration req) {
        Tournament t = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Tournament not found"));
                
        User player = userRepository.findByEmail(email)
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "User not found"));

        if (t.getStatus() != TournamentStatus.UPCOMING) {
            throw new IllegalStateException("Registration is closed for this tournament");
        }

        int currentPlayers = registrationRepository.findByTournamentId(tournamentId).size();
        if (t.getMaxParticipants() != null && currentPlayers >= t.getMaxParticipants()) {
            throw new IllegalStateException("Tournament is full");
        }

        if (registrationRepository.existsByTournamentIdAndPlayerId(tournamentId, player.getId())) {
            throw new IllegalStateException("You are already registered for this tournament");
        }

        TournamentRegistration reg = new TournamentRegistration();
        reg.setTournament(t);
        reg.setPlayer(player);
        reg.setTeamName(req.getTeamName());
        registrationRepository.save(reg);
    }

    }
