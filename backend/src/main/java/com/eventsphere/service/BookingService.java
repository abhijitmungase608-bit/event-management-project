package com.eventsphere.service;

import com.eventsphere.dto.BookingDTO;
import com.eventsphere.dto.BookingRequest;
import com.eventsphere.dto.BookingStatusUpdateRequest;
import com.eventsphere.dto.PagedResponse;
import com.eventsphere.dto.WhatsAppMessageDTO;
import com.eventsphere.exception.BadRequestException;
import com.eventsphere.exception.ResourceNotFoundException;
import com.eventsphere.model.Booking;
import com.eventsphere.model.BookingStatus;
import com.eventsphere.model.Event;
import com.eventsphere.model.User;
import com.eventsphere.repository.BookingRepository;
import com.eventsphere.repository.EventRepository;
import com.eventsphere.repository.UserRepository;
import com.eventsphere.util.WhatsAppUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    @Value("${app.whatsapp.business-number:919307189068}")
    private String defaultBusinessNumber;

    public BookingService(BookingRepository bookingRepository, EventRepository eventRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    public synchronized BookingDTO createBooking(String userEmail, BookingRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + request.getEventId()));

        if (!event.isPublished()) {
            throw new BadRequestException("This event is not published and cannot be booked.");
        }

        if (event.getBookingDeadline() != null && Instant.now().isAfter(event.getBookingDeadline())) {
            throw new BadRequestException("Booking deadline for this event has passed.");
        }

        if (request.getNumberOfTickets() <= 0) {
            throw new BadRequestException("Ticket quantity must be at least 1.");
        }

        if (event.getAvailableSeats() < request.getNumberOfTickets()) {
            throw new BadRequestException("Only " + event.getAvailableSeats() + " seats are available for this event.");
        }

        // Server-side price calculation
        BigDecimal totalAmount = event.getPrice().multiply(BigDecimal.valueOf(request.getNumberOfTickets()));

        // Reserve seats
        event.setAvailableSeats(event.getAvailableSeats() - request.getNumberOfTickets());
        eventRepository.save(event);

        String reference = generateBookingReference();

        Booking booking = Booking.builder()
                .bookingReference(reference)
                .userId(user.getId())
                .eventId(event.getId())
                .attendeeName(request.getAttendeeName())
                .attendeeEmail(request.getAttendeeEmail())
                .attendeePhone(request.getAttendeePhone())
                .numberOfTickets(request.getNumberOfTickets())
                .totalAmount(totalAmount)
                .status(BookingStatus.CONFIRMED)
                .build();

        Booking savedBooking = bookingRepository.save(booking);

        return mapToDTO(savedBooking, event);
    }

    public PagedResponse<BookingDTO> getUserBookings(String userEmail, int page, int size) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Booking> bookingPage = bookingRepository.findByUserIdOrderByCreatedAtDesc(user.getId(), pageable);

        List<BookingDTO> content = bookingPage.getContent().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        return PagedResponse.<BookingDTO>builder()
                .content(content)
                .page(bookingPage.getNumber())
                .size(bookingPage.getSize())
                .totalElements(bookingPage.getTotalElements())
                .totalPages(bookingPage.getTotalPages())
                .last(bookingPage.isLast())
                .build();
    }

    public BookingDTO getBookingByReference(String reference, String userEmail, boolean isAdmin) {
        Booking booking = bookingRepository.findByBookingReference(reference)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with reference: " + reference));

        if (!isAdmin) {
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            if (!booking.getUserId().equals(user.getId())) {
                throw new BadRequestException("You are not authorized to view this booking");
            }
        }

        return mapToDTO(booking);
    }

    public synchronized BookingDTO cancelBooking(String id, String userEmail, String reason, boolean isAdmin) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));

        if (!isAdmin) {
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            if (!booking.getUserId().equals(user.getId())) {
                throw new BadRequestException("You are not authorized to cancel this booking");
            }
        }

        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new BadRequestException("Booking is already cancelled.");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        booking.setCancellationReason(reason != null ? reason : "Cancelled by user");

        // Restore event capacity
        eventRepository.findById(booking.getEventId()).ifPresent(event -> {
            event.setAvailableSeats(event.getAvailableSeats() + booking.getNumberOfTickets());
            eventRepository.save(event);
        });

        Booking updated = bookingRepository.save(booking);
        return mapToDTO(updated);
    }

    public PagedResponse<BookingDTO> getAllBookingsAdmin(String status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Booking> bookingPage;

        if (status != null && !status.equalsIgnoreCase("ALL")) {
            BookingStatus bookingStatus = BookingStatus.valueOf(status.toUpperCase());
            bookingPage = bookingRepository.findByStatus(bookingStatus, pageable);
        } else {
            bookingPage = bookingRepository.findAll(pageable);
        }

        List<BookingDTO> content = bookingPage.getContent().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        return PagedResponse.<BookingDTO>builder()
                .content(content)
                .page(bookingPage.getNumber())
                .size(bookingPage.getSize())
                .totalElements(bookingPage.getTotalElements())
                .totalPages(bookingPage.getTotalPages())
                .last(bookingPage.isLast())
                .build();
    }

    public synchronized BookingDTO updateBookingStatusAdmin(String id, BookingStatusUpdateRequest request) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));

        BookingStatus oldStatus = booking.getStatus();
        BookingStatus newStatus = request.getStatus();

        if (oldStatus == newStatus) {
            return mapToDTO(booking);
        }

        if (newStatus == BookingStatus.CANCELLED && oldStatus != BookingStatus.CANCELLED) {
            // Restore seats
            eventRepository.findById(booking.getEventId()).ifPresent(event -> {
                event.setAvailableSeats(event.getAvailableSeats() + booking.getNumberOfTickets());
                eventRepository.save(event);
            });
            booking.setCancellationReason(request.getCancellationReason() != null ? request.getCancellationReason() : "Cancelled by Admin");
        } else if (oldStatus == BookingStatus.CANCELLED && newStatus != BookingStatus.CANCELLED) {
            // Deduct seats
            Event event = eventRepository.findById(booking.getEventId())
                    .orElseThrow(() -> new ResourceNotFoundException("Event not found"));
            if (event.getAvailableSeats() < booking.getNumberOfTickets()) {
                throw new BadRequestException("Cannot reactivate booking. Not enough available seats.");
            }
            event.setAvailableSeats(event.getAvailableSeats() - booking.getNumberOfTickets());
            eventRepository.save(event);
        }

        booking.setStatus(newStatus);
        Booking saved = bookingRepository.save(booking);
        return mapToDTO(saved);
    }

    public WhatsAppMessageDTO generateWhatsAppDraftForBooking(String bookingId, String destinationType) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        Event event = eventRepository.findById(booking.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        return WhatsAppUtil.generateBookingDraft(booking, event, defaultBusinessNumber, destinationType);
    }

    public BookingDTO mapToDTO(Booking booking) {
        Event event = eventRepository.findById(booking.getEventId()).orElse(null);
        return mapToDTO(booking, event);
    }

    public BookingDTO mapToDTO(Booking booking, Event event) {
        String eventTitle = event != null ? event.getTitle() : "Event Details Unavailable";
        String eventCoverImage = event != null ? event.getCoverImage() : "";
        String eventVenue = event != null ? (event.getVenue() + ", " + event.getCity()) : "N/A";
        String eventDate = event != null ? event.getEventDate().toString() : "N/A";
        String eventTime = event != null ? event.getStartTime().toString() : "N/A";

        WhatsAppMessageDTO waDraft = event != null ?
                WhatsAppUtil.generateBookingDraft(booking, event, defaultBusinessNumber, "ORGANIZER") : null;

        return BookingDTO.builder()
                .id(booking.getId())
                .bookingReference(booking.getBookingReference())
                .userId(booking.getUserId())
                .eventId(booking.getEventId())
                .eventTitle(eventTitle)
                .eventCoverImage(eventCoverImage)
                .eventVenue(eventVenue)
                .eventDate(eventDate)
                .eventTime(eventTime)
                .attendeeName(booking.getAttendeeName())
                .attendeeEmail(booking.getAttendeeEmail())
                .attendeePhone(booking.getAttendeePhone())
                .numberOfTickets(booking.getNumberOfTickets())
                .totalAmount(booking.getTotalAmount())
                .status(booking.getStatus())
                .cancellationReason(booking.getCancellationReason())
                .whatsappUrl(waDraft != null ? waDraft.getClickToChatUrl() : "")
                .whatsappFormattedText(waDraft != null ? waDraft.getRawText() : "")
                .createdAt(booking.getCreatedAt())
                .updatedAt(booking.getUpdatedAt())
                .build();
    }

    private String generateBookingReference() {
        Random random = new Random();
        int number = 100000 + random.nextInt(900000);
        return "ES-" + DateTimeFormatter.ofPattern("yyyyMM").format(java.time.LocalDate.now()) + "-" + number;
    }
}
