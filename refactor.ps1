$files = Get-ChildItem -Path backend\src\main\java\com\lanmitra\controller, backend\src\main\java\com\lanmitra\service -Recurse -File -Filter *.java

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    $content = $content -replace 'import com\.lanmitra\.dto\.[^;]+;\r?\n', ''
    $content = $content -replace 'import java\.util\.stream\.Collectors;\r?\n', ''
    
    $content = $content.Replace('RegisterRequest', 'User')
    $content = $content.Replace('LoginRequest', 'User')
    $content = $content.Replace('AuthResponse', 'java.util.Map<String, Object>')
    $content = $content.Replace('UserResponse', 'User')
    
    $content = $content.Replace('BookingRequest', 'Booking')
    $content = $content.Replace('BookingResponse', 'Booking')
    
    $content = $content.Replace('CafeRequest', 'Cafe')
    $content = $content.Replace('CafeResponse', 'Cafe')
    
    $content = $content.Replace('PlayerStatResponse', 'PlayerStat')
    
    $content = $content.Replace('StationRequest', 'Station')
    $content = $content.Replace('StationResponse', 'Station')
    
    $content = $content.Replace('TournamentRequest', 'Tournament')
    $content = $content.Replace('TournamentRegistrationRequest', 'TournamentRegistration')
    $content = $content.Replace('TournamentResponse', 'Tournament')
    
    $content = $content.Replace('.stream().map(this::mapToResponse).collect(Collectors.toList())', '')
    $content = $content.Replace('.stream().map(this::mapToUserResponse).collect(Collectors.toList())', '')

    Set-Content -Path $file.FullName -Value $content
}
