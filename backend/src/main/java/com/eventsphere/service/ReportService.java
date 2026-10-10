package com.eventsphere.service;

import com.eventsphere.model.Booking;
import com.eventsphere.model.Event;
import com.eventsphere.repository.BookingRepository;
import com.eventsphere.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.util.List;

@Service
public class ReportService {

    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;

    public ReportService(BookingRepository bookingRepository, EventRepository eventRepository) {
        this.bookingRepository = bookingRepository;
        this.eventRepository = eventRepository;
    }

    public ByteArrayInputStream generateBookingsCsv() {
        List<Booking> bookings = bookingRepository.findAll();

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try (PrintWriter writer = new PrintWriter(out)) {
            // Header
            writer.println("Booking Reference,Event Title,Attendee Name,Attendee Email,Attendee Phone,Tickets,Total Amount (INR),Status,Created At");

            for (Booking booking : bookings) {
                Event event = eventRepository.findById(booking.getEventId()).orElse(null);
                String eventTitle = event != null ? escapeCsv(event.getTitle()) : "N/A";

                writer.println(String.format("%s,%s,%s,%s,%s,%d,%.2f,%s,%s",
                        escapeCsv(booking.getBookingReference()),
                        eventTitle,
                        escapeCsv(booking.getAttendeeName()),
                        escapeCsv(booking.getAttendeeEmail()),
                        escapeCsv(booking.getAttendeePhone()),
                        booking.getNumberOfTickets(),
                        booking.getTotalAmount() != null ? booking.getTotalAmount().doubleValue() : 0.0,
                        booking.getStatus(),
                        booking.getCreatedAt() != null ? booking.getCreatedAt().toString() : "N/A"
                ));
            }
            writer.flush();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }

    private String escapeCsv(String data) {
        if (data == null) return "\"\"";
        String escaped = data.replaceAll("\"", "\"\"");
        return "\"" + escaped + "\"";
    }
}
