import os
import re

base_dir = r'backend\src\main\java\com\lanmitra'

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Generic replaces
    content = re.sub(r'import com\.lanmitra\.dto\.[a-zA-Z0-9.]+;', '', content)
    
    # Replace DTO names with Entity names (or User if Request)
    # AuthController / AuthService
    content = re.sub(r'RegisterRequest', 'User', content)
    content = re.sub(r'LoginRequest', 'User', content)
    content = re.sub(r'AuthResponse', 'java.util.Map<String, Object>', content)
    content = re.sub(r'UserResponse', 'User', content)
    content = re.sub(r'mapToUserResponse\((\w+)\)', r'\1', content)
    
    # Booking
    content = re.sub(r'BookingRequest', 'Booking', content)
    content = re.sub(r'BookingResponse', 'Booking', content)
    content = re.sub(r'mapToResponse', 'mapToBookingResponse', content) # temporary, will be removed
    
    # Cafe
    content = re.sub(r'CafeRequest', 'Cafe', content)
    content = re.sub(r'CafeResponse', 'Cafe', content)
    
    # PlayerStat
    content = re.sub(r'PlayerStatResponse', 'PlayerStat', content)
    
    # Station
    content = re.sub(r'StationRequest', 'Station', content)
    content = re.sub(r'StationResponse', 'Station', content)
    
    # Tournament
    content = re.sub(r'TournamentRequest', 'Tournament', content)
    content = re.sub(r'TournamentRegistrationRequest', 'TournamentRegistration', content)
    content = re.sub(r'TournamentResponse', 'Tournament', content)
    
    # mapToResponse methods
    content = re.sub(r'private [a-zA-Z0-9<>]+ mapTo[a-zA-Z0-9]+\([^)]+\)\s*\{[^}]+(\}[^{}]+)*\}', '', content)
    content = re.sub(r'private [a-zA-Z0-9<>]+ mapToResponse\([^)]+\)\s*\{[^}]+(\}[^{}]+)*\}', '', content)

    # .stream().map(this::mapToResponse).collect(Collectors.toList())
    content = re.sub(r'\.stream\(\)\.map\(this::[a-zA-Z0-9]+\)\.collect\(Collectors\.toList\(\)\)', '', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for root, _, files in os.walk(base_dir):
    for f in files:
        if f.endswith('.java'):
            process_file(os.path.join(root, f))
