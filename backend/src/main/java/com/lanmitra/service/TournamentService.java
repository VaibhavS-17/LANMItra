package com.lanmitra.service;

import com.lanmitra.dto.request.TournamentRegistrationRequest;
import com.lanmitra.dto.request.TournamentRequest;
import com.lanmitra.dto.response.TournamentResponse;
import com.lanmitra.entity.Cafe;
import com.lanmitra.entity.Tournament;
import com.lanmitra.entity.TournamentRegistration;
import com.lanmitra.entity.User;
import com.lanmitra.enums.TournamentStatus;
import com.lanmitra.exception.ResourceNotFoundException;
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
    public TournamentResponse createTournament(TournamentRequest req) {
        Tournament t = new Tournament();
        t.setName(req.getName());
        t.setGame(req.getGame());
        t.setStartDate(req.getStartDate());
        t.setEndDate(req.getEndDate());
        t.setPrizePool(req.getPrizePool());
        t.setEntryFee(req.getEntryFee());
        t.setMaxParticipants(req.getMaxParticipants());
        
        if (req.getCafeId() != null) {
            Cafe cafe = cafeRepository.findById(req.getCafeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Cafe not found"));
            t.setCafe(cafe);
        }
        
        Tournament saved = tournamentRepository.save(t);
        return mapToResponse(saved);
    }

    public List<TournamentResponse> getAllActiveTournaments() {
        return tournamentRepository.findAll().stream()
                .filter(t -> t.getStatus() == TournamentStatus.UPCOMING || t.getStatus() == TournamentStatus.ONGOING)
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public TournamentResponse getTournamentDetails(Long id) {
        Tournament t = tournamentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tournament not found"));
        return mapToResponse(t);
    }

    @Transactional
    public void registerPlayer(Long tournamentId, String email, TournamentRegistrationRequest req) {
        Tournament t = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new ResourceNotFoundException("Tournament not found"));
                
        User player = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

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

    private TournamentResponse mapToResponse(Tournament t) {
        TournamentResponse res = new TournamentResponse();
        res.setId(t.getId());
        res.setName(t.getName());
        res.setGame(t.getGame());
        res.setStartDate(t.getStartDate());
        res.setEndDate(t.getEndDate());
        res.setPrizePool(t.getPrizePool());
        res.setEntryFee(t.getEntryFee());
        res.setMaxParticipants(t.getMaxParticipants());
        res.setStatus(t.getStatus());
        if (t.getCafe() != null) {
            res.setCafeId(t.getCafe().getId());
            res.setCafeName(t.getCafe().getName());
        }
        
        // Count registrations
        int regCount = registrationRepository.findByTournamentId(t.getId()).size();
        res.setRegisteredPlayerCount(regCount);
        return res;
    }
}
