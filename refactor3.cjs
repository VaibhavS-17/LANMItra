const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // 1. DTO imports removal
    content = content.replace(/import com\.lanmitra\.dto\.[a-zA-Z0-9.\*]+;/g, '');
    
    // Add essential imports if not present
    if (!content.includes('import com.lanmitra.entity.*')) {
        content = content.replace(/package [^;]+;\n/, '$&\nimport com.lanmitra.entity.*;\nimport org.springframework.web.server.ResponseStatusException;\nimport org.springframework.http.HttpStatus;\n');
    }

    // 2. Type replacements
    content = content.replace(/RegisterRequest/g, 'User');
    content = content.replace(/LoginRequest/g, 'User');
    content = content.replace(/AuthResponse/g, 'java.util.Map<String, Object>');
    content = content.replace(/UserResponse/g, 'User');
    
    content = content.replace(/BookingRequest/g, 'Booking');
    content = content.replace(/BookingResponse/g, 'Booking');
    
    content = content.replace(/CafeRequest/g, 'Cafe');
    content = content.replace(/CafeResponse/g, 'Cafe');
    
    content = content.replace(/PlayerStatResponse/g, 'PlayerStat');
    
    content = content.replace(/StationRequest/g, 'Station');
    content = content.replace(/StationResponse/g, 'Station');
    
    content = content.replace(/TournamentRequest/g, 'Tournament');
    content = content.replace(/TournamentRegistrationRequest/g, 'TournamentRegistration');
    content = content.replace(/TournamentResponse/g, 'Tournament');

    // 3. Remove .stream().map(...).collect(...)
    content = content.replace(/\.stream\(\)[\s\S]*?\.map\(this::mapTo[a-zA-Z0-9]*\)[\s\S]*?\.collect\(Collectors\.toList\(\)\)/g, '');
    content = content.replace(/\.stream\(\)[\s\S]*?\.map\(this::mapTo[a-zA-Z0-9]*\)[\s\S]*?\.collect\(java\.util\.stream\.Collectors\.toList\(\)\)/g, '');
    content = content.replace(/return [\w]+\.findAll\(\)\.stream\(\)[\s\S]*?toList\(\);/g, 'return &'.replace(/\.stream.*/, ';'));
    
    // Quick specific fixes for lists:
    content = content.replace(/return bookingRepository\.findByPlayerId\(playerId\)\.stream\(\)[\s\S]*?toList\(\);/g, 'return bookingRepository.findByPlayerId(playerId);');
    content = content.replace(/return bookings\.stream\(\)[\s\S]*?toList\(\);/g, 'return bookings;');
    content = content.replace(/return cafeRepository\.findAll\(\)\.stream\(\)[\s\S]*?toList\(\);/g, 'return cafeRepository.findAll();');
    content = content.replace(/return cafeRepository\.findByOwnerId\(ownerId\)\.stream\(\)[\s\S]*?toList\(\);/g, 'return cafeRepository.findByOwnerId(ownerId);');
    content = content.replace(/return stationRepository\.findAll\(\)\.stream\(\)[\s\S]*?toList\(\);/g, 'return stationRepository.findAll();');
    content = content.replace(/return stationRepository\.findByCafeId\(cafeId\)\.stream\(\)[\s\S]*?toList\(\);/g, 'return stationRepository.findByCafeId(cafeId);');
    content = content.replace(/return stats\.stream\(\)[\s\S]*?toList\(\);/g, 'return stats;');
    content = content.replace(/return tournamentRepository\.findAll\(\)\.stream\(\)[\s\S]*?toList\(\);/g, 'return tournamentRepository.findAll();');
    content = content.replace(/return tournamentRepository\.findByCafeId\(cafeId\)\.stream\(\)[\s\S]*?toList\(\);/g, 'return tournamentRepository.findByCafeId(cafeId);');

    // 4. Remove all mapTo... methods
    content = content.replace(/private [A-Za-z0-9<>]+ mapTo[A-Za-z0-9]+\([A-Za-z0-9\s]+\w+\)\s*\{[\s\S]*?\n    \}\n/g, '');
    
    // Fix map returns
    content = content.replace(/return mapTo[a-zA-Z0-9]*\(([^)]+)\);/g, 'return 1;');

    // 5. Compile specific fixes
    if (filePath.includes('AuthService.java')) {
        content = content.replace(/request\.getPassword\(\)/g, 'request.getPasswordHash()');
        content = content.replace(/new java\.util\.Map<String, Object>\(token, mapToUserResponse\(savedUser\)\)/g, 'java.util.Map.of("token", token, "user", savedUser)');
        content = content.replace(/new java\.util\.Map<String, Object>\(token, mapToUserResponse\(user\)\)/g, 'java.util.Map.of("token", token, "user", user)');
        content = content.replace(/new java\.util\.Map<String, Object>\(token, savedUser\)/g, 'java.util.Map.of("token", token, "user", savedUser)');
        content = content.replace(/new java\.util\.Map<String, Object>\(token, user\)/g, 'java.util.Map.of("token", token, "user", user)');
        content = content.replace(/User user = User\.builder\(\)[\s\S]*?\.build\(\);/g, '');
    }
    if (filePath.includes('BookingService.java')) {
        content = content.replace(/request\.getStationId\(\)/g, 'request.getStation().getId()');
        content = content.replace(/request\.getDate\(\)/g, 'request.getBookingDate()');
    }
    if (filePath.includes('TournamentService.java')) {
        content = content.replace(/req\.getCafeId\(\)/g, 'req.getCafe().getId()');
        content = content.replace(/res\.setCafeId\([^\)]+\);/g, '');
        content = content.replace(/res\.setCafeName\([^\)]+\);/g, '');
        content = content.replace(/res\.setRegisteredPlayerCount\([^\)]+\);/g, '');
    }
    if (filePath.includes('CafeService.java')) {
        content = content.replace(/response\.setOwnerId\([^\)]+\);/g, '');
        content = content.replace(/response\.setActive\([^\)]+\);/g, '');
    }
    if (filePath.includes('StationService.java')) {
        content = content.replace(/com\.lanmitra\.exception\.ResourceNotFoundException/g, 'ResponseStatusException');
        content = content.replace(/new ResponseStatusException\("([^"]+)"\)/g, 'new ResponseStatusException(HttpStatus.NOT_FOUND, "1")');
        content = content.replace(/com\.lanmitra\.exception\.DuplicateResourceException/g, 'ResponseStatusException');
        content = content.replace(/new ResponseStatusException\("([^"]+)"\)/g, 'new ResponseStatusException(HttpStatus.BAD_REQUEST, "1")');
    }
    if (filePath.includes('PlayerStatService.java')) {
        content = content.replace(/res\.setPlayerName\([^\)]+\);/g, '');
        content = content.replace(/res\.setWinRate\([^\)]+\);/g, '');
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

processDirectory('backend/src/main/java/com/lanmitra/controller');
processDirectory('backend/src/main/java/com/lanmitra/service');
