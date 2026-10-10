import os
import re

def process_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Imports
    content = re.sub(r'import com\.lanmitra\.dto\.[^;]+;\n', '', content)
    content = re.sub(r'import java\.util\.stream\.Collectors;\n', '', content)
    
    # Auth
    content = content.replace('RegisterRequest', 'User')
    content = content.replace('LoginRequest', 'User')
    content = content.replace('AuthResponse', 'java.util.Map<String, Object>')
    content = content.replace('UserResponse', 'User')
    
    # Booking
    content = content.replace('BookingRequest', 'Booking')
    content = content.replace('BookingResponse', 'Booking')
    
    # Cafe
    content = content.replace('CafeRequest', 'Cafe')
    content = content.replace('CafeResponse', 'Cafe')
    
    # PlayerStat
    content = content.replace('PlayerStatResponse', 'PlayerStat')
    
    # Station
    content = content.replace('StationRequest', 'Station')
    content = content.replace('StationResponse', 'Station')
    
    # Tournament
    content = content.replace('TournamentRequest', 'Tournament')
    content = content.replace('TournamentRegistrationRequest', 'TournamentRegistration')
    content = content.replace('TournamentResponse', 'Tournament')

    # mapToResponse methods removal
    # A simple regex for removing methods with mapToResponse
    # Matches "private X mapToResponse(Y y) { ... }"
    content = re.sub(r'(?m)^\s*private\s+[a-zA-Z0-9<>]+\s+mapTo[A-Za-z0-9]*Response\([^)]*\)\s*\{[^}]*\}', '', content)
    content = re.sub(r'(?m)^\s*private\s+[a-zA-Z0-9<>]+\s+mapTo[A-Za-z0-9]*\([^)]*\)\s*\{[^}]*\}', '', content)
    # Sometimes it spans multiple lines, better to use regex with DOTALL or just write simple replaces.
    
    # Stream mappings
    content = content.replace('.stream().map(this::mapToResponse).collect(Collectors.toList())', '')
    content = content.replace('.stream().map(this::mapToBookingResponse).collect(Collectors.toList())', '')
    content = content.replace('.stream().map(this::mapToUserResponse).collect(Collectors.toList())', '')
    content = content.replace('.stream().map(this::mapToStationResponse).collect(Collectors.toList())', '')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

for root, _, files in os.walk(r'backend\src\main\java\com\lanmitra\controller'):
    for file in files:
        if file.endswith('.java'):
            process_file(os.path.join(root, file))

for root, _, files in os.walk(r'backend\src\main\java\com\lanmitra\service'):
    for file in files:
        if file.endswith('.java'):
            process_file(os.path.join(root, file))
