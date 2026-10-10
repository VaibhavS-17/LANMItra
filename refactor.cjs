const fs = require('fs');
const path = require('path');

const controllersDir = 'backend/src/main/java/com/lanmitra/controller';
const servicesDir = 'backend/src/main/java/com/lanmitra/service';

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Remove DTO imports
    content = content.replace(/import com\.lanmitra\.dto\.[a-zA-Z0-9.]+;/g, '');
    
    // General Entity Replacements for controllers and services
    // AuthService
    if (filePath.includes('AuthService.java') || filePath.includes('AuthController.java')) {
        content = content.replace(/RegisterRequest/g, 'User');
        content = content.replace(/LoginRequest/g, 'User');
        content = content.replace(/AuthResponse/g, 'java.util.Map<String, Object>');
        content = content.replace(/UserResponse/g, 'User');
        // Fix builder
        content = content.replace(/UserResponse\.builder\(\)[\s\S]*?\.build\(\)/g, 'user');
        content = content.replace(/return new AuthResponse\(token, mapToUserResponse\(savedUser\)\);/g, 'return java.util.Map.of("token", token, "user", savedUser);');
        content = content.replace(/return new AuthResponse\(token, mapToUserResponse\(user\)\);/g, 'return java.util.Map.of("token", token, "user", user);');
        content = content.replace(/mapToUserResponse\(user\)/g, 'user');
        content = content.replace(/private User mapToUserResponse\(User user\) \{[\s\S]*?\}/g, '');
        content = content.replace(/request\.getPassword\(\)/g, 'request.getPasswordHash()');
        content = content.replace(/request\.getPasswordHash\(\)Hash\(\)/g, 'request.getPasswordHash()'); // fix double
    }

    // BookingService & BookingController
    if (filePath.includes('BookingService.java') || filePath.includes('BookingController.java')) {
        content = content.replace(/BookingRequest/g, 'Booking');
        content = content.replace(/BookingResponse/g, 'Booking');
        
        // request.getStationId() -> request.getStation().getId()
        content = content.replace(/request\.getStationId\(\)/g, 'request.getStation().getId()');
        // request.getDate() -> request.getBookingDate()
        content = content.replace(/request\.getDate\(\)/g, 'request.getBookingDate()');
        
        content = content.replace(/\.stream\(\)[\s\n]*\.map\(this::mapToResponse\)[\s\n]*\.collect\(java\.util\.stream\.Collectors\.toList\(\)\)/g, '');
        content = content.replace(/\.stream\(\)[\s\n]*\.map\(this::mapToResponse\)[\s\n]*\.collect\(Collectors\.toList\(\)\)/g, '');
        content = content.replace(/return bookings\.stream\(\)[\s\S]*?toList\(\);/g, 'return bookings;');
        content = content.replace(/return bookingRepository\.findByPlayerId\(playerId\)\.stream\(\)[\s\S]*?toList\(\);/g, 'return bookingRepository.findByPlayerId(playerId);');
        
        content = content.replace(/return mapToResponse\(savedBooking\);/g, 'return savedBooking;');
        content = content.replace(/private Booking mapToResponse\(Booking booking\) \{[\s\S]*?\n\}/g, '');
        content = content.replace(/private BookingResponse mapToResponse\(Booking booking\) \{[\s\S]*?\n\}/g, '');
        content = content.replace(/import java\.util\.stream\.Collectors;/g, '');
    }

    // CafeService & CafeController
    if (filePath.includes('CafeService.java') || filePath.includes('CafeController.java')) {
        content = content.replace(/CafeRequest/g, 'Cafe');
        content = content.replace(/CafeResponse/g, 'Cafe');
        
        content = content.replace(/\.stream\(\)[\s\n]*\.map\(this::mapToResponse\)[\s\n]*\.collect\(Collectors\.toList\(\)\)/g, '');
        content = content.replace(/return cafeRepository\.findAll\(\)\.stream\(\)[\s\S]*?toList\(\);/g, 'return cafeRepository.findAll();');
        content = content.replace(/return cafeRepository\.findByOwnerId\(ownerId\)\.stream\(\)[\s\S]*?toList\(\);/g, 'return cafeRepository.findByOwnerId(ownerId);');
        
        content = content.replace(/return mapToResponse\(savedCafe\);/g, 'return savedCafe;');
        content = content.replace(/return mapToResponse\(cafe\);/g, 'return cafe;');
        content = content.replace(/private Cafe mapToResponse\(Cafe cafe\) \{[\s\S]*?\n\}/g, '');
        content = content.replace(/private CafeResponse mapToResponse\(Cafe cafe\) \{[\s\S]*?\n\}/g, '');
    }

    // StationService & StationController
    if (filePath.includes('StationService.java') || filePath.includes('StationController.java') || filePath.includes('GlobalStationController.java')) {
        content = content.replace(/StationRequest/g, 'Station');
        content = content.replace(/StationResponse/g, 'Station');
        
        content = content.replace(/\.stream\(\)[\s\n]*\.map\(this::mapToResponse\)[\s\n]*\.collect\(Collectors\.toList\(\)\)/g, '');
        content = content.replace(/return stationRepository\.findByCafeId\(cafeId\)\.stream\(\)[\s\S]*?toList\(\);/g, 'return stationRepository.findByCafeId(cafeId);');
        content = content.replace(/return stationRepository\.findAll\(\)\.stream\(\)[\s\S]*?toList\(\);/g, 'return stationRepository.findAll();');
        
        content = content.replace(/return mapToResponse\(savedStation\);/g, 'return savedStation;');
        content = content.replace(/return mapToResponse\(station\);/g, 'return station;');
        content = content.replace(/private Station mapToResponse\(Station station\) \{[\s\S]*?\n\}/g, '');
    }

    // TournamentService & TournamentController
    if (filePath.includes('TournamentService.java') || filePath.includes('TournamentController.java')) {
        content = content.replace(/TournamentRequest/g, 'Tournament');
        content = content.replace(/TournamentResponse/g, 'Tournament');
        content = content.replace(/TournamentRegistrationRequest/g, 'TournamentRegistration');
        
        content = content.replace(/req\.getCafeId\(\)/g, 'req.getCafe().getId()');
        
        content = content.replace(/\.stream\(\)[\s\n]*\.map\(this::mapToResponse\)[\s\n]*\.collect\(Collectors\.toList\(\)\)/g, '');
        content = content.replace(/return tournamentRepository\.findAll\(\)\.stream\(\)[\s\S]*?toList\(\);/g, 'return tournamentRepository.findAll();');
        content = content.replace(/return tournamentRepository\.findByCafeId\(cafeId\)\.stream\(\)[\s\S]*?toList\(\);/g, 'return tournamentRepository.findByCafeId(cafeId);');
        
        content = content.replace(/return mapToResponse\(savedTournament\);/g, 'return savedTournament;');
        content = content.replace(/return mapToResponse\(tournament\);/g, 'return tournament;');
        content = content.replace(/private Tournament mapToResponse\(Tournament tournament\) \{[\s\S]*?\n\}/g, '');
    }
    
    // PlayerStatService
    if (filePath.includes('PlayerStatService.java') || filePath.includes('LeaderboardController.java')) {
        content = content.replace(/PlayerStatResponse/g, 'PlayerStat');
        
        content = content.replace(/\.stream\(\)[\s\n]*\.map\(this::mapToResponse\)[\s\n]*\.collect\(Collectors\.toList\(\)\)/g, '');
        content = content.replace(/return stats\.stream\(\)[\s\S]*?toList\(\);/g, 'return stats;');
        
        content = content.replace(/return mapToResponse\(stat\);/g, 'return stat;');
        content = content.replace(/private PlayerStat mapToResponse\(PlayerStat stat\) \{[\s\S]*?\n\}/g, '');
    }

    fs.writeFileSync(filePath, content, 'utf-8');
}

function processDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.java')) {
            processFile(fullPath);
        }
    });
}

processDirectory(controllersDir);
processDirectory(servicesDir);
