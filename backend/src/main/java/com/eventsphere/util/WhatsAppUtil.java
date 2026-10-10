package com.eventsphere.util;

import com.eventsphere.dto.BookingDTO;
import com.eventsphere.dto.WhatsAppMessageDTO;
import com.eventsphere.model.Booking;
import com.eventsphere.model.Event;
import org.springframework.stereotype.Component;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class WhatsAppUtil {

    public static String cleanPhoneNumber(String phone) {
        if (phone == null) return "";
        return phone.replaceAll("[^0-9]", "");
    }

    public static WhatsAppMessageDTO generateBookingDraft(Booking booking, Event event, String defaultBusinessNumber, String destinationType) {
        String recipientPhone = "ORGANIZER".equalsIgnoreCase(destinationType) ?
                cleanPhoneNumber(defaultBusinessNumber) : cleanPhoneNumber(booking.getAttendeePhone());

        StringBuilder sb = new StringBuilder();
        sb.append("🎉 *EventSphere Booking Confirmation*\n\n");
        sb.append("Hello ").append(booking.getAttendeeName()).append(",\n\n");
        sb.append("Your event booking has been successfully created!\n\n");
        sb.append("📋 *Booking Reference:* ").append(booking.getBookingReference()).append("\n");
        sb.append("📅 *Event:* ").append(event.getTitle()).append("\n");
        sb.append("🗓️ *Date:* ").append(event.getEventDate()).append("\n");
        sb.append("⏰ *Time:* ").append(event.getStartTime()).append("\n");
        sb.append("📍 *Venue:* ").append(event.getVenue()).append(", ").append(event.getCity()).append("\n");
        sb.append("🎟️ *Tickets:* ").append(booking.getNumberOfTickets()).append("\n");
        sb.append("💰 *Total Amount:* ₹").append(booking.getTotalAmount()).append("\n");
        sb.append("📌 *Status:* ").append(booking.getStatus()).append("\n\n");
        sb.append("Please keep your booking reference for future communication.\n");
        sb.append("Thank you for choosing EventSphere!");

        String rawText = sb.toString();
        String encodedText = URLEncoder.encode(rawText, StandardCharsets.UTF_8);

        String clickToChatUrl = "https://wa.me/" + recipientPhone + "?text=" + encodedText;

        String disclaimer = "Note: Clicking this link opens a prefilled message in WhatsApp. The message must be manually sent by clicking Send in WhatsApp.";

        return WhatsAppMessageDTO.builder()
                .recipientPhone(recipientPhone)
                .rawText(rawText)
                .encodedText(encodedText)
                .clickToChatUrl(clickToChatUrl)
                .destinationType(destinationType)
                .disclaimer(disclaimer)
                .build();
    }

    public static WhatsAppMessageDTO generateEventInquiryDraft(Event event, String businessNumber) {
        String recipientPhone = cleanPhoneNumber(businessNumber);

        StringBuilder sb = new StringBuilder();
        sb.append("👋 Hi! I have an inquiry about the event: *").append(event.getTitle()).append("*\n");
        sb.append("📅 Date: ").append(event.getEventDate()).append("\n");
        sb.append("📍 Venue: ").append(event.getVenue()).append(", ").append(event.getCity()).append("\n");
        sb.append("Could you please provide more details about ticket availability and schedule?");

        String rawText = sb.toString();
        String encodedText = URLEncoder.encode(rawText, StandardCharsets.UTF_8);
        String clickToChatUrl = "https://wa.me/" + recipientPhone + "?text=" + encodedText;

        return WhatsAppMessageDTO.builder()
                .recipientPhone(recipientPhone)
                .rawText(rawText)
                .encodedText(encodedText)
                .clickToChatUrl(clickToChatUrl)
                .destinationType("ORGANIZER")
                .disclaimer("Note: Clicking this link opens a prefilled inquiry in WhatsApp.")
                .build();
    }
}
