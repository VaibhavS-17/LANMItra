package com.lanmitra.dto.response;

public class PlayerStatResponse {
    private String playerName;
    private String game;
    private Integer eloScore;
    private Integer matchesPlayed;
    private Integer wins;
    private Integer losses;
    private double winRate;

    public String getPlayerName() { return playerName; }
    public void setPlayerName(String playerName) { this.playerName = playerName; }
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
    public double getWinRate() { return winRate; }
    public void setWinRate(double winRate) { this.winRate = winRate; }
}
