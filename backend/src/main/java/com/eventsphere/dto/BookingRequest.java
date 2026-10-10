package com.eventsphere.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class BookingRequest {

    @NotBlank(message = "Event ID is required")
    private String eventId;

    @NotBlank(message = "Attendee name is required")
    private String attendeeName;

    @NotBlank(message = "Attendee email is required")
    @Email(message = "Invalid email format")
    private String attendeeEmail;

    @NotBlank(message = "Attendee phone is required")
    private String attendeePhone;

    @NotNull(message = "Number of tickets is required")
    @Min(value = 1, message = "At least 1 ticket must be requested")
    private Integer numberOfTickets;

    public BookingRequest() {}

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
}
