package com.lanmitra.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "player_stats")
public class PlayerStat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id", nullable = false)
    private User player;
    @Column(nullable = false)
    private String game;
    @Column(nullable = false)
    private Integer eloScore = 1000;
    private Integer matchesPlayed = 0;
    private Integer wins = 0;
    private Integer losses = 0;

    public PlayerStat() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getPlayer() { return player; }
    public void setPlayer(User player) { this.player = player; }
    public String getGame() { return game; }
    public void setGame(String game) { this.game = game; }
    public Integer getEloScore() { return eloScore; }
    public void setEloScore(Integer eloScore) { this.eloScore = eloScore; }
    public Integer getMatchesPlayed() { return matchesPlayed; }
    public void setMatchesPlayed(Integer matchesPlayed) { this.matchesPlayed = matchesPlayed; }
    public Integer getWins() { return wins; }
    public void setWins(Integer wins) { this.wins = wins; }
    public Integer getLosses() { return losses; }
    public void setLosses(Integer losses) { this.losses = losses; }
}
