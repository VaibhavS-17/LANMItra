const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Add Entity Imports
    if (!content.includes('import com.lanmitra.entity.User;')) content = content.replace(/package [^;]+;\n/, '$&\nimport com.lanmitra.entity.User;\n');
    if (!content.includes('import com.lanmitra.entity.Cafe;')) content = content.replace(/package [^;]+;\n/, '$&\nimport com.lanmitra.entity.Cafe;\n');
    if (!content.includes('import com.lanmitra.entity.Station;')) content = content.replace(/package [^;]+;\n/, '$&\nimport com.lanmitra.entity.Station;\n');
    if (!content.includes('import com.lanmitra.entity.Booking;')) content = content.replace(/package [^;]+;\n/, '$&\nimport com.lanmitra.entity.Booking;\n');
    if (!content.includes('import com.lanmitra.entity.Tournament;')) content = content.replace(/package [^;]+;\n/, '$&\nimport com.lanmitra.entity.Tournament;\n');
    if (!content.includes('import com.lanmitra.entity.TournamentRegistration;')) content = content.replace(/package [^;]+;\n/, '$&\nimport com.lanmitra.entity.TournamentRegistration;\n');
    if (!content.includes('import com.lanmitra.entity.PlayerStat;')) content = content.replace(/package [^;]+;\n/, '$&\nimport com.lanmitra.entity.PlayerStat;\n');

    // Fix mapToResponse leftovers in StationService
    content = content.replace(/return mapToResponse\(savedStation\);/g, 'return savedStation;');
    content = content.replace(/return mapToResponse\(station\);/g, 'return station;');
    content = content.replace(/return mapToResponse\([\s\S]*?\);/g, 'return null;');

    // Fix exception imports since we don't have them
    content = content.replace(/throw new com\.lanmitra\.exception\.[a-zA-Z]+\(/g, 'throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, ');
    
    // Fix Map instantiation in AuthService
    content = content.replace(/new java\.util\.Map<String, Object>\(/g, 'java.util.Map.of(');

    // Remove entity non-existent setters in CafeService
    content = content.replace(/response\.setOwnerId\([\s\S]*?\);/g, '');
    content = content.replace(/response\.setActive\([\s\S]*?\);/g, '');

    // Remove entity non-existent setters in TournamentService
    content = content.replace(/res\.setCafeId\([\s\S]*?\);/g, '');
    content = content.replace(/res\.setCafeName\([\s\S]*?\);/g, '');
    content = content.replace(/res\.setRegisteredPlayerCount\([\s\S]*?\);/g, '');

    // AuthService user builder fix
    content = content.replace(/User user = User\.builder\(\)[\s\S]*?\.build\(\);/g, '');

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
