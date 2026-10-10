package com.eventsphere.service;

import com.eventsphere.dto.*;
import com.eventsphere.model.Booking;
import com.eventsphere.model.BookingStatus;
import com.eventsphere.model.Event;
import com.eventsphere.repository.BookingRepository;
import com.eventsphere.repository.EventRepository;
import com.eventsphere.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final EventRepository eventRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    public DashboardService(EventRepository eventRepository, BookingRepository bookingRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
    }

    public DashboardStatsDTO getDashboardStats() {
        long totalEvents = eventRepository.count();
        long publishedEvents = eventRepository.countByPublished(true);

        long totalBookings = bookingRepository.count();
        long confirmedBookings = bookingRepository.countByStatus(BookingStatus.CONFIRMED);
        long pendingBookings = bookingRepository.countByStatus(BookingStatus.PENDING);
        long cancelledBookings = bookingRepository.countByStatus(BookingStatus.CANCELLED);

        long registeredUsers = userRepository.count();

        List<Booking> allBookings = bookingRepository.findAll();

        BigDecimal estimatedRevenue = allBookings.stream()
                .filter(b -> b.getStatus() == BookingStatus.CONFIRMED)
                .map(Booking::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Status distribution chart data
        List<StatusDistributionDTO> statusDistribution = Arrays.asList(
                new StatusDistributionDTO("Confirmed", confirmedBookings),
                new StatusDistributionDTO("Pending", pendingBookings),
                new StatusDistributionDTO("Cancelled", cancelledBookings)
        );

        // Category distribution chart data
        List<Event> allEvents = eventRepository.findAll();
        Map<String, Long> categoryMap = allEvents.stream()
                .collect(Collectors.groupingBy(Event::getCategory, Collectors.counting()));

        List<CategoryDistributionDTO> categoryDistribution = categoryMap.entrySet().stream()
                .map(entry -> new CategoryDistributionDTO(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());

        // Monthly bookings chart data
        DateTimeFormatter monthFormatter = DateTimeFormatter.ofPattern("MMM yyyy").withZone(ZoneId.systemDefault());
        Map<String, Long> monthlyCounts = new LinkedHashMap<>();
        Map<String, Double> monthlyRevenues = new LinkedHashMap<>();

        for (Booking booking : allBookings) {
            if (booking.getCreatedAt() != null) {
                String monthKey = monthFormatter.format(booking.getCreatedAt());
                monthlyCounts.put(monthKey, monthlyCounts.getOrDefault(monthKey, 0L) + 1);
                if (booking.getStatus() == BookingStatus.CONFIRMED) {
                    monthlyRevenues.put(monthKey, monthlyRevenues.getOrDefault(monthKey, 0.0) + booking.getTotalAmount().doubleValue());
                }
            }
        }

        List<MonthlyBookingDTO> monthlyBookings = new ArrayList<>();
        monthlyCounts.forEach((month, count) -> {
            monthlyBookings.add(new MonthlyBookingDTO(month, count, monthlyRevenues.getOrDefault(month, 0.0)));
        });

        return DashboardStatsDTO.builder()
                .totalEvents(totalEvents)
                .publishedEvents(publishedEvents)
                .totalBookings(totalBookings)
                .confirmedBookings(confirmedBookings)
                .pendingBookings(pendingBookings)
                .cancelledBookings(cancelledBookings)
                .registeredUsers(registeredUsers)
                .estimatedRevenue(estimatedRevenue)
                .monthlyBookings(monthlyBookings)
                .statusDistribution(statusDistribution)
                .categoryDistribution(categoryDistribution)
                .build();
    }
}
