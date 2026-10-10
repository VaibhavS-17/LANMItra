function Add-Import {
    param ($path, $importStr)
    $content = Get-Content -Path $path -Raw
    if ($content -notmatch [regex]::Escape($importStr)) {
        $content = $content -replace 'package ([a-zA-Z0-9\.]+);', "$0
import $importStr;"
        Set-Content -Path $path -Value $content
    }
}

$controllers = Get-ChildItem -Path backend\src\main\java\com\lanmitra\controller -Filter *.java
foreach ($c in $controllers) {
    Add-Import $c.FullName 'com.lanmitra.entity.*'
}

$services = Get-ChildItem -Path backend\src\main\java\com\lanmitra\service -Filter *.java
foreach ($s in $services) {
    Add-Import $s.FullName 'com.lanmitra.entity.*'
    
    # Fix exception imports since we don't have them
    $content = Get-Content -Path $s.FullName -Raw
    $content = $content -replace 'throw new com\.lanmitra\.exception\.[a-zA-Z]+\(', 'throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "'
    $content = $content -replace 'User\.builder\(\)\.id\([a-zA-Z0-9\.]+\)\.name\([a-zA-Z0-9\.]+\)\.email\([a-zA-Z0-9\.]+\)\.role\([a-zA-Z0-9\.]+\)\.phone\([a-zA-Z0-9\.]+\)\.avatarUrl\([a-zA-Z0-9\.]+\)\.build\(\)', 'user'
    
    # Quick fix for return mapToResponse in StationService
    $content = $content -replace 'return mapToResponse\(savedStation\);', 'return savedStation;'
    $content = $content -replace 'return mapToResponse\(station\);', 'return station;'
    Set-Content -Path $s.FullName -Value $content
}
