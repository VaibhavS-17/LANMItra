const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(/\r\n/g, '\n');

    // 1. Remove all DTO imports
    const lines = content.split('\n');
    let newLines = lines.filter(l => !l.includes('import com.lanmitra.dto'));
    content = newLines.join('\n');

    // 2. Insert entity imports and exceptions just after package
    if (!content.includes('import com.lanmitra.entity.')) {
        content = content.replace(/^package\s+[^;]+;/, match => match + '\nimport com.lanmitra.entity.*;\nimport org.springframework.web.server.ResponseStatusException;\nimport org.springframework.http.HttpStatus;');
    }

    // 3. Rename Request/Response types to Entities
    const typeMap = {
        'RegisterRequest': 'User',
        'LoginRequest': 'User',
        'AuthResponse': 'java.util.Map<String, Object>',
        'UserResponse': 'User',
        'BookingRequest': 'Booking',
        'BookingResponse': 'Booking',
        'CafeRequest': 'Cafe',
        'CafeResponse': 'Cafe',
        'PlayerStatResponse': 'PlayerStat',
        'StationRequest': 'Station',
        'StationResponse': 'Station',
        'TournamentRequest': 'Tournament',
        'TournamentRegistrationRequest': 'TournamentRegistration',
        'TournamentResponse': 'Tournament'
    };
    for (const [k, v] of Object.entries(typeMap)) {
        content = content.replace(new RegExp('\\b' + k + '\\b', 'g'), v);
    }

    // 4. Clean stream mapping lists
    content = content.replace(/\.stream\(\)\s*\.map\(this::mapTo[a-zA-Z0-9]*\)\s*\.collect\(java\.util\.stream\.Collectors\.toList\(\)\)/g, '');
    content = content.replace(/\.stream\(\)\s*\.map\(this::mapTo[a-zA-Z0-9]*\)\s*\.collect\(Collectors\.toList\(\)\)/g, '');
    content = content.replace(/\.stream\(\)\s*\.map\(this::mapTo[a-zA-Z0-9]*\)\s*\.toList\(\)/g, '');
    
    // fix missed list stream returns
    content = content.replace(/return ([a-zA-Z0-9_]+Repository\.[a-zA-Z0-9_]+\([^)]*\))\s*\.stream\(\)[\s\S]*?toList\(\);/g, (m, g1) => 'return ' + g1 + ';');
    content = content.replace(/return ([a-zA-Z0-9_]+)\s*\.stream\(\)[\s\S]*?toList\(\);/g, (m, g1) => 'return ' + g1 + ';');

    // 5. Remove mapTo methods entirely
    content = content.replace(/private [A-Za-z0-9<>,\s]+ mapTo[A-Za-z0-9]*\([A-Za-z0-9\s<>,]+\w+\)\s*\{[\s\S]*?\n    \}\n/g, '');
    
    // Fix mapTo returns
    content = content.replace(/return mapTo[a-zA-Z0-9]*\(([^)]+)\);/g, (m, g1) => 'return ' + g1 + ';');
    
    // Cafe findById mapping
    content = content.replace(/\.map\(this::mapTo[a-zA-Z0-9]*\)/g, '');

    // 6. Fix specific property accessors that only existed on DTOs
    if (filePath.includes('AuthService.java')) {
        content = content.replace(/request\.getPassword\(\)/g, 'request.getPasswordHash()');
        content = content.replace(/new java\.util\.Map<String, Object>\(token, savedUser\)/g, 'java.util.Map.of("token", token, "user", savedUser)');
        content = content.replace(/new java\.util\.Map<String, Object>\(token, user\)/g, 'java.util.Map.of("token", token, "user", user)');
        content = content.replace(/User user = User\.builder\(\)[\s\S]*?\.build\(\);/g, '');
    }
    if (filePath.includes('BookingService.java')) {
        content = content.replace(/request\.getStationId\(\)/g, 'request.getStation().getId()');
        content = content.replace(/request\.getDate\(\)/g, 'request.getBookingDate()');
        content = content.replace(/response\.setStationId\([^)]+\);/g, '');
        content = content.replace(/response\.setStationLabel\([^)]+\);/g, '');
        content = content.replace(/response\.setCafeName\([^)]+\);/g, '');
        content = content.replace(/response\.setPlayerName\([^)]+\);/g, '');
        content = content.replace(/response\.setPlayerEmail\([^)]+\);/g, '');
        content = content.replace(/response\.setDate\([^)]+\);/g, '');
    }
    if (filePath.includes('TournamentService.java')) {
        content = content.replace(/req\.getCafeId\(\)/g, 'req.getCafe().getId()');
        content = content.replace(/res\.setCafeId\([^)]+\);/g, '');
        content = content.replace(/res\.setCafeName\([^)]+\);/g, '');
        content = content.replace(/res\.setRegisteredPlayerCount\([^)]+\);/g, '');
    }
    if (filePath.includes('StationService.java')) {
        content = content.replace(/com\.lanmitra\.exception\.ResourceNotFoundException/g, 'ResponseStatusException');
        content = content.replace(/new ResponseStatusException\("([^"]+)"\)/g, (m, g1) => 'new ResponseStatusException(HttpStatus.NOT_FOUND, "' + g1 + '")');
        content = content.replace(/com\.lanmitra\.exception\.DuplicateResourceException/g, 'ResponseStatusException');
        content = content.replace(/new ResponseStatusException\("([^"]+)"\)/g, (m, g1) => 'new ResponseStatusException(HttpStatus.BAD_REQUEST, "' + g1 + '")');
        content = content.replace(/response\.setCafeId\([^)]+\);/g, '');
        content = content.replace(/response\.setActive\([^)]+\);/g, '');
    }
    if (filePath.includes('PlayerStatService.java')) {
        content = content.replace(/res\.setPlayerName\([^)]+\);/g, '');
        content = content.replace(/res\.setWinRate\([^)]+\);/g, '');
    }
    if (filePath.includes('CafeService.java')) {
        content = content.replace(/response\.setOwnerId\([^)]+\);/g, '');
        content = content.replace(/response\.setActive\([^)]+\);/g, '');
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
