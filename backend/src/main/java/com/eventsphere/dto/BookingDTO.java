package com.eventsphere.dto;

import com.eventsphere.model.BookingStatus;

import java.math.BigDecimal;
import java.time.Instant;

public class BookingDTO {
    private String id;
    private String bookingReference;
    private String userId;
    private String eventId;
    private String eventTitle;
    private String eventCoverImage;
    private String eventVenue;
    private String eventDate;
    private String eventTime;
    private String attendeeName;
    private String attendeeEmail;
    private String attendeePhone;
    private Integer numberOfTickets;
    private BigDecimal totalAmount;
    private BookingStatus status;
    private String cancellationReason;
    private String whatsappUrl;
    private String whatsappFormattedText;
    private Instant createdAt;
    private Instant updatedAt;

    public BookingDTO() {}

    public BookingDTO(String id, String bookingReference, String userId, String eventId, String eventTitle, String eventCoverImage, String eventVenue, String eventDate, String eventTime, String attendeeName, String attendeeEmail, String attendeePhone, Integer numberOfTickets, BigDecimal totalAmount, BookingStatus status, String cancellationReason, String whatsappUrl, String whatsappFormattedText, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.bookingReference = bookingReference;
        this.userId = userId;
        this.eventId = eventId;
        this.eventTitle = eventTitle;
        this.eventCoverImage = eventCoverImage;
        this.eventVenue = eventVenue;
        this.eventDate = eventDate;
        this.eventTime = eventTime;
        this.attendeeName = attendeeName;
        this.attendeeEmail = attendeeEmail;
        this.attendeePhone = attendeePhone;
        this.numberOfTickets = numberOfTickets;
        this.totalAmount = totalAmount;
        this.status = status;
        this.cancellationReason = cancellationReason;
        this.whatsappUrl = whatsappUrl;
        this.whatsappFormattedText = whatsappFormattedText;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static BookingDTOBuilder builder() {
        return new BookingDTOBuilder();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getBookingReference() { return bookingReference; }
    public void setBookingReference(String bookingReference) { this.bookingReference = bookingReference; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getEventId() { return eventId; }
    public void setEventId(String eventId) { this.eventId = eventId; }

    public String getEventTitle() { return eventTitle; }
    public void setEventTitle(String eventTitle) { this.eventTitle = eventTitle; }

    public String getEventCoverImage() { return eventCoverImage; }
    public void setEventCoverImage(String eventCoverImage) { this.eventCoverImage = eventCoverImage; }

    public String getEventVenue() { return eventVenue; }
    public void setEventVenue(String eventVenue) { this.eventVenue = eventVenue; }

    public String getEventDate() { return eventDate; }
    public void setEventDate(String eventDate) { this.eventDate = eventDate; }

    public String getEventTime() { return eventTime; }
    public void setEventTime(String eventTime) { this.eventTime = eventTime; }

    public String getAttendeeName() { return attendeeName; }
    public void setAttendeeName(String attendeeName) { this.attendeeName = attendeeName; }

    public String getAttendeeEmail() { return attendeeEmail; }
    public void setAttendeeEmail(String attendeeEmail) { this.attendeeEmail = attendeeEmail; }

    public String getAttendeePhone() { return attendeePhone; }
    public void setAttendeePhone(String attendeePhone) { this.attendeePhone = attendeePhone; }

    public Integer getNumberOfTickets() { return numberOfTickets; }
    public void setNumberOfTickets(Integer numberOfTickets) { this.numberOfTickets = numberOfTickets; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public BookingStatus getStatus() { return status; }
    public void setStatus(BookingStatus status) { this.status = status; }

    public String getCancellationReason() { return cancellationReason; }
    public void setCancellationReason(String cancellationReason) { this.cancellationReason = cancellationReason; }

    public String getWhatsappUrl() { return whatsappUrl; }
    public void setWhatsappUrl(String whatsappUrl) { this.whatsappUrl = whatsappUrl; }

    public String getWhatsappFormattedText() { return whatsappFormattedText; }
    public void setWhatsappFormattedText(String whatsappFormattedText) { this.whatsappFormattedText = whatsappFormattedText; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    public static class BookingDTOBuilder {
        private String id;
        private String bookingReference;
        private String userId;
        private String eventId;
        private String eventTitle;
        private String eventCoverImage;
        private String eventVenue;
        private String eventDate;
        private String eventTime;
        private String attendeeName;
        private String attendeeEmail;
        private String attendeePhone;
        private Integer numberOfTickets;
        private BigDecimal totalAmount;
        private BookingStatus status;
        private String cancellationReason;
        private String whatsappUrl;
        private String whatsappFormattedText;
        private Instant createdAt;
        private Instant updatedAt;

        public BookingDTOBuilder id(String id) { this.id = id; return this; }
        public BookingDTOBuilder bookingReference(String bookingReference) { this.bookingReference = bookingReference; return this; }
        public BookingDTOBuilder userId(String userId) { this.userId = userId; return this; }
        public BookingDTOBuilder eventId(String eventId) { this.eventId = eventId; return this; }
        public BookingDTOBuilder eventTitle(String eventTitle) { this.eventTitle = eventTitle; return this; }
        public BookingDTOBuilder eventCoverImage(String eventCoverImage) { this.eventCoverImage = eventCoverImage; return this; }
        public BookingDTOBuilder eventVenue(String eventVenue) { this.eventVenue = eventVenue; return this; }
        public BookingDTOBuilder eventDate(String eventDate) { this.eventDate = eventDate; return this; }
        public BookingDTOBuilder eventTime(String eventTime) { this.eventTime = eventTime; return this; }
        public BookingDTOBuilder attendeeName(String attendeeName) { this.attendeeName = attendeeName; return this; }
        public BookingDTOBuilder attendeeEmail(String attendeeEmail) { this.attendeeEmail = attendeeEmail; return this; }
        public BookingDTOBuilder attendeePhone(String attendeePhone) { this.attendeePhone = attendeePhone; return this; }
        public BookingDTOBuilder numberOfTickets(Integer numberOfTickets) { this.numberOfTickets = numberOfTickets; return this; }
        public BookingDTOBuilder totalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; return this; }
        public BookingDTOBuilder status(BookingStatus status) { this.status = status; return this; }
        public BookingDTOBuilder cancellationReason(String cancellationReason) { this.cancellationReason = cancellationReason; return this; }
        public BookingDTOBuilder whatsappUrl(String whatsappUrl) { this.whatsappUrl = whatsappUrl; return this; }
        public BookingDTOBuilder whatsappFormattedText(String whatsappFormattedText) { this.whatsappFormattedText = whatsappFormattedText; return this; }
        public BookingDTOBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public BookingDTOBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public BookingDTO build() {
            return new BookingDTO(id, bookingReference, userId, eventId, eventTitle, eventCoverImage, eventVenue, eventDate, eventTime, attendeeName, attendeeEmail, attendeePhone, numberOfTickets, totalAmount, status, cancellationReason, whatsappUrl, whatsappFormattedText, createdAt, updatedAt);
        }
    }
}
