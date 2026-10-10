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

    @Value("${app.admin.bootstrap-email:agaleashwini24@gmail.com}")
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
                    .phone("+919307189068")
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
                    .title("Royal Destination Wedding & Sangeet Gala")
                    .slug("royal-destination-wedding-sangeet-gala")
                    .description("Grand luxury destination wedding ceremony with floral mandap decor, acoustic orchestra, sangeet stage, and gourmet banquet dining in Ahilyanagar.")
                    .category("Wedding")
                    .coverImage("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80")
                    .venue("Grand Palace Lawns & Convention Center")
                    .address("Ring Road, Near City Center")
                    .city("Ahilyanagar")
                    .eventDate(LocalDate.now().plusDays(15))
                    .startTime(LocalTime.of(17, 0))
                    .endTime(LocalTime.of(23, 30))
                    .price(new BigDecimal("1999.00"))
                    .capacity(500)
                    .availableSeats(412)
                    .published(true)
                    .bookingDeadline(Instant.now().plus(14, ChronoUnit.DAYS))
                    .organizerName("Royal Events")
                    .organizerContact("+919307189068")
                    .build(),

                Event.builder()
                    .title("Milestone 25th Silver Birthday Gala Party")
                    .slug("milestone-25th-silver-birthday-gala-party")
                    .description("Exclusive theme birthday party with DJ console, neon balloon arch setups, custom photobooths, and mocktail lounge bar.")
                    .category("Birthday")
                    .coverImage("https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80")
                    .venue("Skyline Rooftop Lounge")
                    .address("Station Road, Commercial Hub")
                    .city("Ahilyanagar")
                    .eventDate(LocalDate.now().plusDays(20))
                    .startTime(LocalTime.of(18, 30))
                    .endTime(LocalTime.of(23, 59))
                    .price(new BigDecimal("999.00"))
                    .capacity(200)
                    .availableSeats(160)
                    .published(true)
                    .bookingDeadline(Instant.now().plus(19, ChronoUnit.DAYS))
                    .organizerName("Royal Events")
                    .organizerContact("+919307189068")
                    .build(),

                Event.builder()
                    .title("Global Tech & Business Leadership Summit 2026")
                    .slug("global-tech-business-leadership-summit-2026")
                    .description("Corporate annual convention featuring keynote stages, LED video walls, AI tech workshops, product launch booths, and VIP delegate dinner.")
                    .category("Corporate")
                    .coverImage("https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80")
                    .venue("Ahilyanagar Tech & Trade Expo Center")
                    .address("MIDC Industrial Area, Phase 2")
                    .city("Ahilyanagar")
                    .eventDate(LocalDate.now().plusDays(28))
                    .startTime(LocalTime.of(9, 30))
                    .endTime(LocalTime.of(18, 0))
                    .price(new BigDecimal("2499.00"))
                    .capacity(800)
                    .availableSeats(650)
                    .published(true)
                    .bookingDeadline(Instant.now().plus(27, ChronoUnit.DAYS))
                    .organizerName("Royal Events")
                    .organizerContact("+919307189068")
                    .build(),

                Event.builder()
                    .title("Fairytale Ring Ceremony & Engagement Gala")
                    .slug("fairytale-ring-ceremony-engagement-gala")
                    .description("Romantic engagement ring exchange ceremony with rose floral arches, violin instrumentals, champagne toast, and couple photography.")
                    .category("Engagement")
                    .coverImage("https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80")
                    .venue("The Heritage Resort Garden")
                    .address("Gulmohar Road, Cantonment Area")
                    .city("Ahilyanagar")
                    .eventDate(LocalDate.now().plusDays(10))
                    .startTime(LocalTime.of(16, 0))
                    .endTime(LocalTime.of(21, 30))
                    .price(new BigDecimal("1499.00"))
                    .capacity(250)
                    .availableSeats(190)
                    .published(true)
                    .bookingDeadline(Instant.now().plus(9, ChronoUnit.DAYS))
                    .organizerName("Royal Events")
                    .organizerContact("+919307189068")
                    .build(),

                Event.builder()
                    .title("Annual Inter-College Cultural Youth Fest 2026")
                    .slug("annual-inter-college-cultural-youth-fest-2026")
                    .description("Grand inter-college youth festival featuring rock band battles, fashion walk, street dance competitions, food bazaars, and celebrity night.")
                    .category("College Events")
                    .coverImage("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80")
                    .venue("University Campus Open Air Stadium")
                    .address("University Road")
                    .city("Ahilyanagar")
                    .eventDate(LocalDate.now().plusDays(35))
                    .startTime(LocalTime.of(10, 0))
                    .endTime(LocalTime.of(22, 0))
                    .price(new BigDecimal("499.00"))
                    .capacity(1500)
                    .availableSeats(1200)
                    .published(true)
                    .bookingDeadline(Instant.now().plus(34, ChronoUnit.DAYS))
                    .organizerName("Royal Events")
                    .organizerContact("+919307189068")
                    .build(),

                Event.builder()
                    .title("Golden Jubilee 50th Anniversary Family Function")
                    .slug("golden-jubilee-50th-anniversary-family-function")
                    .description("Traditional family gathering celebrating 50 years of togetherness with marigold decor, family slideshows, live classical music, and traditional feast.")
                    .category("Family Functions")
                    .coverImage("https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80")
                    .venue("Shree Krishna Cultural Hall")
                    .address("Savedi Road")
                    .city("Ahilyanagar")
                    .eventDate(LocalDate.now().plusDays(40))
                    .startTime(LocalTime.of(11, 0))
                    .endTime(LocalTime.of(16, 0))
                    .price(new BigDecimal("799.00"))
                    .capacity(300)
                    .availableSeats(240)
                    .published(true)
                    .bookingDeadline(Instant.now().plus(39, ChronoUnit.DAYS))
                    .organizerName("Royal Events")
                    .organizerContact("+919307189068")
                    .build()
            );

            eventRepository.saveAll(sampleEvents);
            log.info("Successfully seeded {} sample events into MongoDB", sampleEvents.size());
        }
    }
}
