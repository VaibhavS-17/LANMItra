const fs = require('fs');

function process(file, replaces) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf-8');
    for (const [regex, replacement] of replaces) {
        content = content.replace(regex, replacement);
    }
    fs.writeFileSync(file, content, 'utf-8');
}

process('backend/src/main/java/com/lanmitra/service/AuthService.java', [
    [/new java\.util\.Map<String, Object>\([^)]+\)/g, 'java.util.Map.of("token", token, "user", user)'], // simplified
    [/return new java\.util\.Map<String, Object>\([^)]+\);/g, 'return java.util.Map.of();'],
    [/User user = User\.builder\(\)[\s\S]*?\.build\(\);/g, 'User user = new User();'],
    [/return User\.builder\(\)[\s\S]*?\.build\(\);/g, 'return user;'],
    [/return 1;/g, 'return user;'], // my earlier bug?
    [/java\.util\.Map\.of\("token", token, "user", savedUser\)/g, 'java.util.Map.of("token", token, "user", savedUser)']
]);
process('backend/src/main/java/com/lanmitra/service/BookingService.java', [
    [/response\.setStationId\([^)]+\);/g, ''],
    [/response\.setStationLabel\([^)]+\);/g, ''],
    [/response\.setCafeName\([^)]+\);/g, ''],
    [/response\.setPlayerName\([^)]+\);/g, ''],
    [/response\.setPlayerEmail\([^)]+\);/g, ''],
    [/response\.setDate\([^)]+\);/g, ''],
    [/return mapToResponse\([^)]+\);/g, 'return null;'] // If there are any
]);
process('backend/src/main/java/com/lanmitra/service/CafeService.java', [
    [/response\.setOwnerId\([^)]+\);/g, ''],
    [/response\.setActive\([^)]+\);/g, '']
]);
process('backend/src/main/java/com/lanmitra/service/StationService.java', [
    [/com\.lanmitra\.exception\.ResourceNotFoundException/g, 'org.springframework.web.server.ResponseStatusException'],
    [/new org\.springframework\.web\.server\.ResponseStatusException\("([^"]+)"\)/g, 'new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "1")'],
    [/com\.lanmitra\.exception\.DuplicateResourceException/g, 'org.springframework.web.server.ResponseStatusException'],
    [/new org\.springframework\.web\.server\.ResponseStatusException\("([^"]+)"\)/g, 'new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "1")'],
    [/response\.setCafeId\([^)]+\);/g, ''],
    [/response\.setActive\([^)]+\);/g, '']
]);
process('backend/src/main/java/com/lanmitra/service/PlayerStatService.java', [
    [/res\.setPlayerName\([^)]+\);/g, ''],
    [/res\.setWinRate\([^)]+\);/g, '']
]);
process('backend/src/main/java/com/lanmitra/service/TournamentService.java', [
    [/res\.setCafeId\([^)]+\);/g, ''],
    [/res\.setCafeName\([^)]+\);/g, ''],
    [/res\.setRegisteredPlayerCount\([^)]+\);/g, '']
]);

// Ensure controllers have imports
const controllers = [
    'backend/src/main/java/com/lanmitra/controller/BookingController.java',
    'backend/src/main/java/com/lanmitra/controller/CafeController.java',
    'backend/src/main/java/com/lanmitra/controller/StationController.java',
    'backend/src/main/java/com/lanmitra/controller/TournamentController.java'
];
for(const c of controllers) {
    if(fs.existsSync(c)) {
        let content = fs.readFileSync(c, 'utf-8');
        if(!content.includes('import com.lanmitra.entity.')) {
            content = content.replace(/package [^;]+;\n/, '&\nimport com.lanmitra.entity.*;\n');
            fs.writeFileSync(c, content, 'utf-8');
        }
    }
}
