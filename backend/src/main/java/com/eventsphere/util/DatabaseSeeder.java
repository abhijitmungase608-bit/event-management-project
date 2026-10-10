package com.eventsphere.util;

import com.eventsphere.model.Event;
import com.eventsphere.model.Role;
import com.eventsphere.model.User;
import com.eventsphere.repository.EventRepository;
import com.eventsphere.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DatabaseSeeder.class);

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.bootstrap-email:admin@eventsphere.com}")
    private String adminEmail;

    @Value("${app.admin.bootstrap-password:Admin@123456}")
    private String adminPassword;

    public DatabaseSeeder(UserRepository userRepository, EventRepository eventRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        seedAdminUser();
        seedEvents();
    }

    private void seedAdminUser() {
        if (!userRepository.existsByEmail(adminEmail.toLowerCase())) {
            User admin = User.builder()
                    .fullName("EventSphere System Admin")
                    .email(adminEmail.toLowerCase())
                    .phone("+919876543210")
                    .passwordHash(passwordEncoder.encode(adminPassword))
                    .role(Role.ROLE_ADMIN)
                    .enabled(true)
                    .build();

            userRepository.save(admin);
            log.info("Default Admin User created successfully with email: {}", adminEmail);
        }
    }

    private void seedEvents() {
        if (eventRepository.count() == 0) {
            log.info("Seeding initial professional sample events...");

            List<Event> sampleEvents = Arrays.asList(
                Event.builder()
                    .title("TechX Global Summit 2026")
                    .slug("techx-global-summit-2026")
                    .description("Join over 2,000 tech leaders, developers, and innovators for keynotes on AI, Cloud Native, DevOps, and Cybersecurity. Networking sessions, tech expo, and hands-on workshops included.")
                    .category("Technology")
                    .coverImage("https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80")
                    .venue("International Convention Center")
                    .address("Plot 12, Tech Park Avenue, Electronic City")
                    .city("Bengaluru")
                    .eventDate(LocalDate.now().plusDays(15))
                    .startTime(LocalTime.of(9, 30))
                    .endTime(LocalTime.of(18, 0))
                    .price(new BigDecimal("2999.00"))
                    .capacity(500)
                    .availableSeats(412)
                    .published(true)
                    .bookingDeadline(Instant.now().plus(14, ChronoUnit.DAYS))
                    .organizerName("TechX Innovations")
                    .organizerContact("+919876543210")
                    .build(),

                Event.builder()
                    .title("Sunwave EDM & Indie Music Festival")
                    .slug("sunwave-edm-indie-music-festival")
                    .description("Experience 12 hours of non-stop live music featuring international DJs, indie bands, food trucks, and light shows under the stars.")
                    .category("Music")
                    .coverImage("https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80")
                    .venue("Bayview Beach Resort Grounds")
                    .address("East Coast Road, Miramar Beach")
                    .city("Goa")
                    .eventDate(LocalDate.now().plusDays(25))
                    .startTime(LocalTime.of(16, 0))
                    .endTime(LocalTime.of(23, 59))
                    .price(new BigDecimal("1499.00"))
                    .capacity(1000)
                    .availableSeats(850)
                    .published(true)
                    .bookingDeadline(Instant.now().plus(24, ChronoUnit.DAYS))
                    .organizerName("Sunwave Entertainment")
                    .organizerContact("+919876543210")
                    .build(),

                Event.builder()
                    .title("Royal Heritage Wedding & Luxury Lifestyle Expo")
                    .slug("royal-heritage-wedding-lifestyle-expo")
                    .description("The premier bridal and luxury lifestyle exhibition. Explore top fashion designers, jewelry brands, wedding planners, and gourmet caterers.")
                    .category("Exhibition")
                    .coverImage("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80")
                    .venue("Taj Palace Exhibition Hall")
                    .address("Sardar Patel Marg, Diplomatic Enclave")
                    .city("New Delhi")
                    .eventDate(LocalDate.now().plusDays(30))
                    .startTime(LocalTime.of(10, 0))
                    .endTime(LocalTime.of(20, 0))
                    .price(new BigDecimal("499.00"))
                    .capacity(800)
                    .availableSeats(720)
                    .published(true)
                    .bookingDeadline(Instant.now().plus(29, ChronoUnit.DAYS))
                    .organizerName("Royal Events India")
                    .organizerContact("+919876543210")
                    .build(),

                Event.builder()
                    .title("Mastering Portrait & Street Photography Workshop")
                    .slug("mastering-portrait-street-photography-workshop")
                    .description("A hands-on masterclass led by award-winning photographer Rajiv Mehta. Learn outdoor lighting, camera settings, composition, and Lightroom editing.")
                    .category("Workshop")
                    .coverImage("https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&w=1200&q=80")
                    .venue("Creative Arts Center")
                    .address("45 Art Guild Road, Fort")
                    .city("Mumbai")
                    .eventDate(LocalDate.now().plusDays(10))
                    .startTime(LocalTime.of(8, 0))
                    .endTime(LocalTime.of(14, 0))
                    .price(new BigDecimal("1999.00"))
                    .capacity(30)
                    .availableSeats(18)
                    .published(true)
                    .bookingDeadline(Instant.now().plus(9, ChronoUnit.DAYS))
                    .organizerName("Visionary Lens Studio")
                    .organizerContact("+919876543210")
                    .build(),

                Event.builder()
                    .title("Global Founders & Investors Networking Dinner")
                    .slug("global-founders-investors-networking-dinner")
                    .description("An exclusive high-level networking event connecting startup founders, angel investors, and venture capitalists over a 5-course gourmet dinner.")
                    .category("Business")
                    .coverImage("https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80")
                    .venue("The Westin Grand Ballroom")
                    .address("Raheja Mindspace, Hitec City")
                    .city("Hyderabad")
                    .eventDate(LocalDate.now().plusDays(18))
                    .startTime(LocalTime.of(19, 0))
                    .endTime(LocalTime.of(22, 30))
                    .price(new BigDecimal("4999.00"))
                    .capacity(100)
                    .availableSeats(65)
                    .published(true)
                    .bookingDeadline(Instant.now().plus(17, ChronoUnit.DAYS))
                    .organizerName("Capital Connect Network")
                    .organizerContact("+919876543210")
                    .build(),

                Event.builder()
                    .title("Vibrant India Cultural & Performing Arts Festival")
                    .slug("vibrant-india-cultural-performing-arts-festival")
                    .description("A grand celebration of classical Indian dances, folk music performances, puppet shows, craft bazaars, and traditional culinary stalls.")
                    .category("Culture")
                    .coverImage("https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80")
                    .venue("Open Air Amphitheatre")
                    .address("Cultural Academy Complex, Civil Lines")
                    .city("Jaipur")
                    .eventDate(LocalDate.now().plusDays(40))
                    .startTime(LocalTime.of(17, 30))
                    .endTime(LocalTime.of(22, 0))
                    .price(new BigDecimal("250.00"))
                    .capacity(1500)
                    .availableSeats(1340)
                    .published(true)
                    .bookingDeadline(Instant.now().plus(39, ChronoUnit.DAYS))
                    .organizerName("Heritage Art Foundation")
                    .organizerContact("+919876543210")
                    .build()
            );

            eventRepository.saveAll(sampleEvents);
            log.info("Successfully seeded {} sample events into MongoDB", sampleEvents.size());
        }
    }
}
