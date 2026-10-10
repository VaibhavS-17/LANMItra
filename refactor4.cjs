const fs = require('fs');

function fixBooking() {
    let content = fs.readFileSync('backend/src/main/java/com/lanmitra/service/BookingService.java', 'utf-8');
    content = content.replace(/import com\.lanmitra\.dto\.[a-zA-Z0-9.\*]+;/g, '');
    content = content.replace(/BookingRequest/g, 'Booking');
    content = content.replace(/BookingResponse/g, 'Booking');
    content = content.replace(/request\.getStationId\(\)/g, 'request.getStation().getId()');
    content = content.replace(/request\.getDate\(\)/g, 'request.getBookingDate()');
    
    // .stream().map(this::mapToResponse).collect(Collectors.toList())
    content = content.replace(/\.stream\(\)\s*\.map\(this::mapToResponse\)\s*\.collect\(Collectors\.toList\(\)\)/g, '');
    
    content = content.replace(/return mapToResponse\(savedBooking\);/, 'return savedBooking;');
    
    content = content.replace(/private Booking mapToResponse\(Booking booking\) \{[\s\S]*?\n    \}\n/, '');

    fs.writeFileSync('backend/src/main/java/com/lanmitra/service/BookingService.java', content, 'utf-8');
}

function fixCafe() {
    let content = fs.readFileSync('backend/src/main/java/com/lanmitra/service/CafeService.java', 'utf-8');
    content = content.replace(/import com\.lanmitra\.dto\.[a-zA-Z0-9.\*]+;/g, '');
    content = content.replace(/CafeRequest/g, 'Cafe');
    content = content.replace(/CafeResponse/g, 'Cafe');
    
    // .stream().map(this::mapToResponse).collect(Collectors.toList())
    content = content.replace(/\.stream\(\)\s*\.map\(this::mapToResponse\)\s*\.collect\(Collectors\.toList\(\)\)/g, '');
    content = content.replace(/\.stream\(\)\.map\(this::mapToResponse\)\.toList\(\)/g, '');
    
    content = content.replace(/return mapToResponse\(saved\);/, 'return saved;');
    content = content.replace(/return mapToResponse\(cafeRepository\.save\(cafe\)\);/, 'return cafeRepository.save(cafe);');
    content = content.replace(/return cafeRepository\.findAll\(\)\.stream\(\)\.map\(this::mapToResponse\)\.toList\(\);/, 'return cafeRepository.findAll();');
    content = content.replace(/return cafeRepository\.findByCityContainingIgnoreCaseOrNameContainingIgnoreCase\(query, query\)\s*\.stream\(\)\.map\(this::mapToResponse\)\.toList\(\);/, 'return cafeRepository.findByCityContainingIgnoreCaseOrNameContainingIgnoreCase(query, query);');
    content = content.replace(/return cafeRepository\.findByOwnerId\(ownerId\)\.stream\(\)\.map\(this::mapToResponse\)\.toList\(\);/, 'return cafeRepository.findByOwnerId(ownerId);');
    content = content.replace(/return cafeRepository\.findById\(id\)\.map\(this::mapToResponse\)\.orElseThrow\(\);/, 'return cafeRepository.findById(id).orElseThrow();');
    
    content = content.replace(/private Cafe mapToResponse\(Cafe saved\) \{[\s\S]*?\n    \}\n/, '');

    fs.writeFileSync('backend/src/main/java/com/lanmitra/service/CafeService.java', content, 'utf-8');
}

fixBooking();
fixCafe();
