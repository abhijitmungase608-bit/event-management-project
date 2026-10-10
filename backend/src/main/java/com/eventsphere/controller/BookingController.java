package com.eventsphere.controller;

import com.eventsphere.dto.*;
import com.eventsphere.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@Tag(name = "Bookings", description = "User Booking Creation and Management Endpoints")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    @Operation(summary = "Create a new event booking")
    public ResponseEntity<ApiResponse<BookingDTO>> createBooking(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody BookingRequest request) {

        BookingDTO booking = bookingService.createBooking(userDetails.getUsername(), request);
        return ResponseEntity.ok(ApiResponse.success("Booking created successfully!", booking));
    }

    @GetMapping("/my")
    @Operation(summary = "Get user's personal booking history with pagination")
    public ResponseEntity<ApiResponse<PagedResponse<BookingDTO>>> getMyBookings(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        PagedResponse<BookingDTO> bookings = bookingService.getUserBookings(userDetails.getUsername(), page, size);
        return ResponseEntity.ok(ApiResponse.success(bookings));
    }

    @GetMapping("/ref/{ref}")
    @Operation(summary = "Get booking details by reference code")
    public ResponseEntity<ApiResponse<BookingDTO>> getBookingByReference(
            @PathVariable String ref,
            @AuthenticationPrincipal UserDetails userDetails) {

        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        BookingDTO booking = bookingService.getBookingByReference(ref, userDetails.getUsername(), isAdmin);
        return ResponseEntity.ok(ApiResponse.success(booking));
    }

    @PostMapping("/{id}/cancel")
    @Operation(summary = "Cancel an existing booking")
    public ResponseEntity<ApiResponse<BookingDTO>> cancelBooking(
            @PathVariable String id,
            @RequestParam(required = false) String reason,
            @AuthenticationPrincipal UserDetails userDetails) {

        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        BookingDTO booking = bookingService.cancelBooking(id, userDetails.getUsername(), reason, isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Booking cancelled successfully", booking));
    }

    @GetMapping("/{id}/whatsapp-draft")
    @Operation(summary = "Generate prefilled WhatsApp message draft for booking")
    public ResponseEntity<ApiResponse<WhatsAppMessageDTO>> getWhatsAppDraft(
            @PathVariable String id,
            @RequestParam(defaultValue = "ORGANIZER") String destination) {

        WhatsAppMessageDTO draft = bookingService.generateWhatsAppDraftForBooking(id, destination);
        return ResponseEntity.ok(ApiResponse.success(draft));
    }
}
