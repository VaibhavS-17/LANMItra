const fs = require('fs');

function fixAuthService() {
    let lines = fs.readFileSync('backend/src/main/java/com/lanmitra/service/AuthService.java', 'utf-8').split('\n');
    lines = lines.filter(l => !l.includes('User.builder()') && !l.includes('.id(user.getId())') && !l.includes('.name(user.getName())') && !l.includes('.email(user.getEmail())') && !l.includes('.role(user.getRole())') && !l.includes('.phone(user.getPhone())') && !l.includes('.avatarUrl(user.getAvatarUrl())') && !l.includes('.build();'));
    let out = lines.join('\n');
    out = out.replace(/new java\.util\.Map<String, Object>\(token, mapToUser\(savedUser\)\)/g, 'java.util.Map.of("token", token, "user", savedUser)');
    out = out.replace(/new java\.util\.Map<String, Object>\(token, mapToUser\(user\)\)/g, 'java.util.Map.of("token", token, "user", user)');
    
    // In case the map function is mapToUserResponse:
    out = out.replace(/new java\.util\.Map<String, Object>\(token, mapToUserResponse\(savedUser\)\)/g, 'java.util.Map.of("token", token, "user", savedUser)');
    out = out.replace(/new java\.util\.Map<String, Object>\(token, mapToUserResponse\(user\)\)/g, 'java.util.Map.of("token", token, "user", user)');
    
    // Also remove the mapToUser signature
    out = out.replace(/private User mapToUser\(User user\) \{/g, '');
    out = out.replace(/private User mapToUserResponse\(User user\) \{/g, '');
    out = out.replace(/return user;/g, '');
    
    // Add correct return to getProfile
    out = out.replace(/return 1;/g, 'return user;');

    fs.writeFileSync('backend/src/main/java/com/lanmitra/service/AuthService.java', out, 'utf-8');
}

function fixBookingService() {
    let lines = fs.readFileSync('backend/src/main/java/com/lanmitra/service/BookingService.java', 'utf-8').split('\n');
    lines = lines.filter(l => !l.includes('.setCafeName(') && !l.includes('.setPlayerName(') && !l.includes('.setPlayerEmail(') && !l.includes('.setDate(') && !l.includes('.setStationLabel(') && !l.includes('.setStationId('));
    fs.writeFileSync('backend/src/main/java/com/lanmitra/service/BookingService.java', lines.join('\n'), 'utf-8');
}

function fixPlayerStatService() {
    let lines = fs.readFileSync('backend/src/main/java/com/lanmitra/service/PlayerStatService.java', 'utf-8').split('\n');
    lines = lines.filter(l => !l.includes('.setPlayerName(') && !l.includes('.setWinRate('));
    fs.writeFileSync('backend/src/main/java/com/lanmitra/service/PlayerStatService.java', lines.join('\n'), 'utf-8');
}

function fixStationService() {
    let content = fs.readFileSync('backend/src/main/java/com/lanmitra/service/StationService.java', 'utf-8');
    if (!content.includes('import org.springframework.web.server.ResponseStatusException;')) {
        content = 'import org.springframework.web.server.ResponseStatusException;\nimport org.springframework.http.HttpStatus;\n' + content;
    }
    let lines = content.split('\n');
    lines = lines.filter(l => !l.includes('.setCafeId(') && !l.includes('.setActive('));
    fs.writeFileSync('backend/src/main/java/com/lanmitra/service/StationService.java', lines.join('\n'), 'utf-8');
}

function fixCafeService() {
    let lines = fs.readFileSync('backend/src/main/java/com/lanmitra/service/CafeService.java', 'utf-8').split('\n');
    lines = lines.filter(l => !l.includes('.setOwnerId(') && !l.includes('.setActive('));
    fs.writeFileSync('backend/src/main/java/com/lanmitra/service/CafeService.java', lines.join('\n'), 'utf-8');
}

function fixTournamentService() {
    let lines = fs.readFileSync('backend/src/main/java/com/lanmitra/service/TournamentService.java', 'utf-8').split('\n');
    lines = lines.filter(l => !l.includes('.setCafeId(') && !l.includes('.setCafeName(') && !l.includes('.setRegisteredPlayerCount('));
    fs.writeFileSync('backend/src/main/java/com/lanmitra/service/TournamentService.java', lines.join('\n'), 'utf-8');
}

function fixControllerImports() {
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
                content = content.replace(/package [^;]+;/, '&\nimport com.lanmitra.entity.*;\n');
                fs.writeFileSync(c, content, 'utf-8');
            }
        }
    }
}

fixAuthService();
fixBookingService();
fixPlayerStatService();
fixStationService();
fixCafeService();
fixTournamentService();
fixControllerImports();
