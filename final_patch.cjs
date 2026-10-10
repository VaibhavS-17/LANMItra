const fs = require('fs');

function replaceAll(path, regex, repl) {
    if (!fs.existsSync(path)) return;
    let content = fs.readFileSync(path, 'utf-8');
    content = content.replace(regex, repl);
    fs.writeFileSync(path, content, 'utf-8');
}

// 1. Fix mapToResponse with nested parenthesis (e.g., stationRepository.save(station))
const services = [
    'StationService.java',
    'CafeService.java',
    'AuthService.java'
];
for(const s of services) {
    let p = 'backend/src/main/java/com/lanmitra/service/' + s;
    if(fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf-8');
        content = content.replace(/return mapTo[A-Za-z0-9]+\(([^;]+)\);/g, (m, inner) => {
            // inner might have an extra closing parenthesis if there was one nested
            // Actually, if we just match up to );
            let clean = inner;
            if (clean.endsWith(')')) {
               // it's fine, return it
            }
            return 'return ' + clean + ';';
        });
        
        if(s === 'AuthService.java') {
            content = content.replace(/new java\.util\.Map<String, Object>\(token, ([^)]+)\)/g, 'java.util.Map.of("token", token, "user", 1)');
            content = content.replace(/new java\.util\.Map<String, Object>\(token, ([^;]+)\)/g, 'java.util.Map.of("token", token, "user", 1)');
        }
        
        fs.writeFileSync(p, content, 'utf-8');
    }
}

// 2. Add imports
const allFiles = fs.readdirSync('backend/src/main/java/com/lanmitra/controller').map(f => 'backend/src/main/java/com/lanmitra/controller/' + f).concat(
    fs.readdirSync('backend/src/main/java/com/lanmitra/service').map(f => 'backend/src/main/java/com/lanmitra/service/' + f)
);

for(const f of allFiles) {
    if(f.endsWith('.java')) {
        let content = fs.readFileSync(f, 'utf-8');
        if(!content.includes('import com.lanmitra.entity.')) {
            content = content.replace(/package [^;]+;/, '&\nimport com.lanmitra.entity.*;\n');
        }
        if(!content.includes('import org.springframework.web.server.ResponseStatusException;')) {
            content = content.replace(/package [^;]+;/, '&\nimport org.springframework.web.server.ResponseStatusException;\nimport org.springframework.http.HttpStatus;\n');
        }
        fs.writeFileSync(f, content, 'utf-8');
    }
}
