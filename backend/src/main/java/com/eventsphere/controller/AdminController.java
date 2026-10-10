package com.eventsphere.controller;

import com.eventsphere.dto.*;
import com.eventsphere.model.User;
import com.eventsphere.repository.UserRepository;
import com.eventsphere.service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
@Tag(name = "Admin Management", description = "Administrative Dashboard, Events, Bookings, Users, and Reports Management")
public class AdminController {

    private final DashboardService dashboardService;
    private final EventService eventService;
    private final BookingService bookingService;
    private final ReportService reportService;
    private final UserRepository userRepository;
    private final AuthService authService;

    public AdminController(DashboardService dashboardService, EventService eventService, BookingService bookingService, ReportService reportService, UserRepository userRepository, AuthService authService) {
        this.dashboardService = dashboardService;
        this.eventService = eventService;
        this.bookingService = bookingService;
        this.reportService = reportService;
        this.userRepository = userRepository;
        this.authService = authService;
    }

    @GetMapping("/dashboard")
    @Operation(summary = "Get overall admin dashboard statistics and charts data")
    public ResponseEntity<ApiResponse<DashboardStatsDTO>> getDashboardStats() {
        DashboardStatsDTO stats = dashboardService.getDashboardStats();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @GetMapping("/events")
    @Operation(summary = "Get all events for admin management")
    public ResponseEntity<ApiResponse<PagedResponse<EventDTO>>> getAllEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        PagedResponse<EventDTO> events = eventService.getAllEventsAdmin(page, size);
        return ResponseEntity.ok(ApiResponse.success(events));
    }

    @PostMapping("/events")
    @Operation(summary = "Create a new event")
    public ResponseEntity<ApiResponse<EventDTO>> createEvent(@Valid @RequestBody EventRequest request) {
        EventDTO event = eventService.createEvent(request);
        return ResponseEntity.ok(ApiResponse.success("Event created successfully", event));
    }

    @PutMapping("/events/{id}")
    @Operation(summary = "Update an existing event")
    public ResponseEntity<ApiResponse<EventDTO>> updateEvent(
            @PathVariable String id,
            @Valid @RequestBody EventRequest request) {
        EventDTO event = eventService.updateEvent(id, request);
        return ResponseEntity.ok(ApiResponse.success("Event updated successfully", event));
    }

    @PatchMapping("/events/{id}/publish")
    @Operation(summary = "Toggle event publish status")
    public ResponseEntity<ApiResponse<EventDTO>> togglePublish(@PathVariable String id) {
        EventDTO event = eventService.togglePublish(id);
        return ResponseEntity.ok(ApiResponse.success("Event status updated successfully", event));
    }

    @DeleteMapping("/events/{id}")
    @Operation(summary = "Delete an event")
    public ResponseEntity<ApiResponse<Void>> deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok(ApiResponse.success("Event deleted successfully", null));
    }

    @GetMapping("/bookings")
    @Operation(summary = "Get all system bookings with optional status filter")
    public ResponseEntity<ApiResponse<PagedResponse<BookingDTO>>> getAllBookings(
            @RequestParam(required = false, defaultValue = "ALL") String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        PagedResponse<BookingDTO> bookings = bookingService.getAllBookingsAdmin(status, page, size);
        return ResponseEntity.ok(ApiResponse.success(bookings));
    }

    @PatchMapping("/bookings/{id}/status")
    @Operation(summary = "Update booking status (Confirm, Cancel, etc.)")
    public ResponseEntity<ApiResponse<BookingDTO>> updateBookingStatus(
            @PathVariable String id,
            @Valid @RequestBody BookingStatusUpdateRequest request) {
        BookingDTO booking = bookingService.updateBookingStatusAdmin(id, request);
        return ResponseEntity.ok(ApiResponse.success("Booking status updated", booking));
    }

    @GetMapping("/reports/bookings.csv")
    @Operation(summary = "Export all system bookings to CSV format")
    public ResponseEntity<InputStreamResource> exportBookingsCsv() {
        ByteArrayInputStream csvStream = reportService.generateBookingsCsv();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=eventsphere_bookings_report.csv");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(new InputStreamResource(csvStream));
    }

    @GetMapping("/users")
    @Operation(summary = "Get all registered users")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDTO> dtos = users.stream()
                .map(authService::mapToUserDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }
}
