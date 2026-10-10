package com.eventsphere.dto;

import com.eventsphere.model.BookingStatus;
import jakarta.validation.constraints.NotNull;

public class BookingStatusUpdateRequest {

    @NotNull(message = "Status is required")
    private BookingStatus status;

    private String cancellationReason;

    public BookingStatusUpdateRequest() {}

    public BookingStatusUpdateRequest(BookingStatus status, String cancellationReason) {
        this.status = status;
        this.cancellationReason = cancellationReason;
    }

    public BookingStatus getStatus() { return status; }
    public void setStatus(BookingStatus status) { this.status = status; }

    public String getCancellationReason() { return cancellationReason; }
    public void setCancellationReason(String cancellationReason) { this.cancellationReason = cancellationReason; }
}
