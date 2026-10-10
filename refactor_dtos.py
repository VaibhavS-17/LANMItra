import os
import re

java_dir = 'backend/src/main/java/com/lanmitra'

# We'll do simple string replacements for all files
for root, dirs, files in os.walk(java_dir):
    for file in files:
        if file.endswith('.java'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()

            # Remove DTO imports
            content = re.sub(r'import com\.lanmitra\.dto\.request\.[A-Za-z]+;\n?', '', content)
            content = re.sub(r'import com\.lanmitra\.dto\.response\.[A-Za-z]+;\n?', '', content)
            
            # Replace types
            content = content.replace('CafeRequest', 'Cafe')
            content = content.replace('CafeResponse', 'Cafe')
            content = content.replace('StationRequest', 'Station')
            content = content.replace('StationResponse', 'Station')
            content = content.replace('BookingRequest', 'Booking')
            content = content.replace('BookingResponse', 'Booking')
            content = content.replace('TournamentRequest', 'Tournament')
            content = content.replace('TournamentResponse', 'Tournament')
            content = content.replace('TournamentRegistrationRequest', 'TournamentRegistration')
            content = content.replace('PlayerStatResponse', 'PlayerStat')
            
            # Auth is special, let's just use Map<String, String> for Auth
            content = content.replace('LoginRequest', 'java.util.Map<String, String>')
            content = content.replace('RegisterRequest', 'java.util.Map<String, String>')
            content = content.replace('AuthResponse', 'java.util.Map<String, Object>')
            content = content.replace('UserResponse', 'User')

            # Replace streams
            content = content.replace('.map(this::mapToResponse).toList()', '')
            content = content.replace('.map(this::mapToResponse).orElseThrow()', '.orElseThrow()')
            content = content.replace('return mapToResponse(', 'return ')
            content = content.replace('.stream().toList()', '') # simplify if map was removed
            content = content.replace('return stationRepository.save(station));', 'return stationRepository.save(station);')
            content = content.replace('return cafeRepository.save(cafe));', 'return cafeRepository.save(cafe);')
            content = content.replace('return tournamentRepository.save(t));', 'return tournamentRepository.save(t);')
            
            with open(filepath, 'w') as f:
                f.write(content)

print("Refactor complete")
