package com.eventsphere.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.Instant;

@Document(collection = "bookings")
public class Booking {

    @Id
    private String id;

    @Indexed(unique = true)
    private String bookingReference;

    @Indexed
    private String userId;

    @Indexed
    private String eventId;

    private String attendeeName;

    private String attendeeEmail;

    private String attendeePhone;

    private Integer numberOfTickets;

    private BigDecimal totalAmount;

    @Indexed
    private BookingStatus status = BookingStatus.CONFIRMED;

    private String cancellationReason;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    public Booking() {}

    public Booking(String id, String bookingReference, String userId, String eventId, String attendeeName, String attendeeEmail, String attendeePhone, Integer numberOfTickets, BigDecimal totalAmount, BookingStatus status, String cancellationReason, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.bookingReference = bookingReference;
        this.userId = userId;
        this.eventId = eventId;
        this.attendeeName = attendeeName;
        this.attendeeEmail = attendeeEmail;
        this.attendeePhone = attendeePhone;
        this.numberOfTickets = numberOfTickets;
        this.totalAmount = totalAmount;
        this.status = status != null ? status : BookingStatus.CONFIRMED;
        this.cancellationReason = cancellationReason;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static BookingBuilder builder() {
        return new BookingBuilder();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getBookingReference() { return bookingReference; }
    public void setBookingReference(String bookingReference) { this.bookingReference = bookingReference; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getEventId() { return eventId; }
    public void setEventId(String eventId) { this.eventId = eventId; }

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

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    public static class BookingBuilder {
        private String id;
        private String bookingReference;
        private String userId;
        private String eventId;
        private String attendeeName;
        private String attendeeEmail;
        private String attendeePhone;
        private Integer numberOfTickets;
        private BigDecimal totalAmount;
        private BookingStatus status = BookingStatus.CONFIRMED;
        private String cancellationReason;
        private Instant createdAt;
        private Instant updatedAt;

        public BookingBuilder id(String id) { this.id = id; return this; }
        public BookingBuilder bookingReference(String bookingReference) { this.bookingReference = bookingReference; return this; }
        public BookingBuilder userId(String userId) { this.userId = userId; return this; }
        public BookingBuilder eventId(String eventId) { this.eventId = eventId; return this; }
        public BookingBuilder attendeeName(String attendeeName) { this.attendeeName = attendeeName; return this; }
        public BookingBuilder attendeeEmail(String attendeeEmail) { this.attendeeEmail = attendeeEmail; return this; }
        public BookingBuilder attendeePhone(String attendeePhone) { this.attendeePhone = attendeePhone; return this; }
        public BookingBuilder numberOfTickets(Integer numberOfTickets) { this.numberOfTickets = numberOfTickets; return this; }
        public BookingBuilder totalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; return this; }
        public BookingBuilder status(BookingStatus status) { this.status = status; return this; }
        public BookingBuilder cancellationReason(String cancellationReason) { this.cancellationReason = cancellationReason; return this; }
        public BookingBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public BookingBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public Booking build() {
            return new Booking(id, bookingReference, userId, eventId, attendeeName, attendeeEmail, attendeePhone, numberOfTickets, totalAmount, status, cancellationReason, createdAt, updatedAt);
        }
    }
}
