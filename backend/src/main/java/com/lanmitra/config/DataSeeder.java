package com.lanmitra.config;

import com.lanmitra.entity.Cafe;
import com.lanmitra.entity.Station;
import com.lanmitra.entity.User;
import com.lanmitra.enums.StationType;
import com.lanmitra.enums.UserRole;
import com.lanmitra.repository.CafeRepository;
import com.lanmitra.repository.StationRepository;
import com.lanmitra.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CafeRepository cafeRepository;
    private final StationRepository stationRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository,
                      CafeRepository cafeRepository,
                      StationRepository stationRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.cafeRepository = cafeRepository;
        this.stationRepository = stationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (cafeRepository.count() > 0) {
            return;
        }

        // 1. Create Default Cafe Owner
        User owner = userRepository.findByEmail("owner.andheri@lanmitra.com")
                .orElseGet(() -> {
                    User u = new User();
                    u.setName("Sameer Kulkarni (Andheri Lounge Ops)");
                    u.setEmail("owner.andheri@lanmitra.com");
                    u.setPasswordHash(passwordEncoder.encode("Password@123"));
                    u.setRole(UserRole.CAFE_OWNER);
                    u.setPhone("+91 98201 12345");
                    u.setAvatarUrl("https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150");
                    return userRepository.save(u);
                });

        // 2. Create Default Student Player
        userRepository.findByEmail("player.mumbai@lanmitra.com")
                .orElseGet(() -> {
                    User u = new User();
                    u.setName("Aman Sharma");
                    u.setEmail("player.mumbai@lanmitra.com");
                    u.setPasswordHash(passwordEncoder.encode("Password@123"));
                    u.setRole(UserRole.PLAYER);
                    u.setPhone("+91 98920 67890");
                    u.setAvatarUrl("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150");
                    return userRepository.save(u);
                });

        // 3. Cafe 1: Respawn Gaming Lounge - Versova
        Cafe respawn = new Cafe();
        respawn.setOwner(owner);
        respawn.setName("Respawn Gaming Lounge - Versova");
        respawn.setAddress("Shop 4 & 5, Near Versova Beach Road, Juhu Versova Link Road, Andheri West, Mumbai 400053");
        respawn.setCity("Andheri West, Mumbai");
        respawn.setDescription("The premier collegiate esports hotspot in Versova! Featuring 240Hz tournament stage PCs, low-ping fiber lines, energy drink bar, and regular community scrim tournaments.");
        respawn.setImageUrl("https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80");
        respawn.setPhone("+91 98201 12345");
        respawn.setOpeningTime(LocalTime.of(9, 0));
        respawn.setClosingTime(LocalTime.of(23, 59));
        respawn.setIsActive(true);
        respawn = cafeRepository.save(respawn);

        createStations(respawn, Arrays.asList(
                createStation(respawn, "PC-01", StationType.PC, "RTX 4080 16GB, Core i7-14700K, 32GB RAM, 240Hz BenQ Zowie, HyperX Cloud II", new BigDecimal("120.00")),
                createStation(respawn, "PC-02", StationType.PC, "RTX 4080 16GB, Core i7-14700K, 32GB RAM, 240Hz BenQ Zowie, HyperX Cloud II", new BigDecimal("120.00")),
                createStation(respawn, "PC-03", StationType.PC, "RTX 4070 Super, Ryzen 7 7800X3D, 32GB RAM, 180Hz IPS, Razer BlackWidow", new BigDecimal("90.00")),
                createStation(respawn, "PC-04", StationType.PC, "RTX 4070 Super, Ryzen 7 7800X3D, 32GB RAM, 180Hz IPS, Razer BlackWidow", new BigDecimal("90.00")),
                createStation(respawn, "PS5-01", StationType.CONSOLE, "PlayStation 5 Disc Edition, DualSense Edge, 65\" Sony Bravia 4K 120Hz OLED, FC 25 / MK1", new BigDecimal("180.00"))
        ));

        // 4. Cafe 2: Matrix Esports Arena - Lokhandwala
        Cafe matrix = new Cafe();
        matrix.setOwner(owner);
        matrix.setName("Matrix Esports Arena - Lokhandwala");
        matrix.setAddress("2nd Floor, Crystal Point Mall, New Link Road, Lokhandwala, Andheri West, Mumbai 400053");
        matrix.setCity("Andheri West, Mumbai");
        matrix.setDescription("State-of-the-art gaming arena in Lokhandwala. Custom liquid-cooled battlestations, ambient cyberpunk lighting, and dedicated 5v5 team booths for competitive Valorant and CS2.");
        matrix.setImageUrl("https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80");
        matrix.setPhone("+91 98334 54321");
        matrix.setOpeningTime(LocalTime.of(10, 0));
        matrix.setClosingTime(LocalTime.of(23, 0));
        matrix.setIsActive(true);
        matrix = cafeRepository.save(matrix);

        createStations(matrix, Arrays.asList(
                createStation(matrix, "BOOTCAMP-1", StationType.PC, "RTX 4090 24GB, Core i9-14900K, 64GB DDR5, 360Hz ASUS ROG Swift, SteelSeries Apex Pro", new BigDecimal("160.00")),
                createStation(matrix, "BOOTCAMP-2", StationType.PC, "RTX 4090 24GB, Core i9-14900K, 64GB DDR5, 360Hz ASUS ROG Swift, SteelSeries Apex Pro", new BigDecimal("160.00")),
                createStation(matrix, "RIG-01", StationType.PC, "RTX 4060 Ti, Ryzen 5 7600X, 16GB RAM, 165Hz LG UltraGear, Logitech G502", new BigDecimal("80.00")),
                createStation(matrix, "RIG-02", StationType.PC, "RTX 4060 Ti, Ryzen 5 7600X, 16GB RAM, 165Hz LG UltraGear, Logitech G502", new BigDecimal("80.00")),
                createStation(matrix, "PS5-LOUNGE", StationType.CONSOLE, "PlayStation 5, 75\" Samsung Neo QLED, Recliner Sofas, GTA V / God of War Ragnarok", new BigDecimal("220.00"))
        ));

        // 5. Cafe 3: Glitch Gaming Haven - 4 Bungalows
        Cafe glitch = new Cafe();
        glitch.setOwner(owner);
        glitch.setName("Glitch Gaming Haven - 4 Bungalows");
        glitch.setAddress("Ground Floor, JP Road, Opposite Metro Pillar 114, 4 Bungalows, Andheri West, Mumbai 400053");
        glitch.setCity("Andheri West, Mumbai");
        glitch.setDescription("Cozy neighborhood gaming haven 2 minutes from Versova Metro Station. Ergonomic Secretlab chairs, curated snack menu, and private discord audio rooms.");
        glitch.setImageUrl("https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80");
        glitch.setPhone("+91 97690 98765");
        glitch.setOpeningTime(LocalTime.of(11, 0));
        glitch.setClosingTime(LocalTime.of(23, 0));
        glitch.setIsActive(true);
        glitch = cafeRepository.save(glitch);

        createStations(glitch, Arrays.asList(
                createStation(glitch, "BATTLE-01", StationType.PC, "RTX 4070 Super, Core i5-14600K, 32GB RAM, 240Hz Acer Predator, Logitech Pro Wireless", new BigDecimal("100.00")),
                createStation(glitch, "BATTLE-02", StationType.PC, "RTX 4070 Super, Core i5-14600K, 32GB RAM, 240Hz Acer Predator, Logitech Pro Wireless", new BigDecimal("100.00")),
                createStation(glitch, "PS5-DUO", StationType.CONSOLE, "PlayStation 5, 55\" LG OLED C3, Dual Controllers, Tekken 8 / Marvel's Spider-Man 2", new BigDecimal("150.00"))
        ));

        // 6. Cafe 4: Velocity Esports Hub - Andheri East
        Cafe velocity = new Cafe();
        velocity.setOwner(owner);
        velocity.setName("Velocity Esports Hub - Andheri East");
        velocity.setAddress("Unit 12, Solitaire Corporate Park, Andheri-Kurla Road, Chakala, Andheri East, Mumbai 400093");
        velocity.setCity("Andheri East, Mumbai");
        velocity.setDescription("Massive corporate and collegiate esports lounge near Chakala Metro. High-bandwidth dedicated leased lines, streaming pods, and competitive weekend brackets.");
        velocity.setImageUrl("https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80");
        velocity.setPhone("+91 98199 44321");
        velocity.setOpeningTime(LocalTime.of(10, 0));
        velocity.setClosingTime(LocalTime.of(23, 0));
        velocity.setIsActive(true);
        velocity = cafeRepository.save(velocity);

        createStations(velocity, Arrays.asList(
                createStation(velocity, "TITAN-01", StationType.PC, "RTX 4080 Super, Ryzen 7 7800X3D, 32GB RAM, 280Hz ASUS TUF, Corsair K70", new BigDecimal("130.00")),
                createStation(velocity, "TITAN-02", StationType.PC, "RTX 4080 Super, Ryzen 7 7800X3D, 32GB RAM, 280Hz ASUS TUF, Corsair K70", new BigDecimal("130.00")),
                createStation(velocity, "PS5-EXP", StationType.CONSOLE, "PlayStation 5, 65\" Sony OLED, EA FC 25 & Gran Turismo 7", new BigDecimal("170.00"))
        ));
    }

    private Station createStation(Cafe cafe, String label, StationType type, String specs, BigDecimal hourlyRate) {
        Station s = new Station();
        s.setCafe(cafe);
        s.setLabel(label);
        s.setType(type);
        s.setSpecs(specs);
        s.setHourlyRate(hourlyRate);
        s.setIsActive(true);
        return s;
    }

    private void createStations(Cafe cafe, List<Station> stations) {
        stationRepository.saveAll(stations);
    }
}
