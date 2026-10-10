package com.eventsphere.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;

@Document(collection = "events")
public class Event {

    @Id
    private String id;

    private String title;

    @Indexed(unique = true)
    private String slug;

    private String description;

    @Indexed
    private String category;

    private String coverImage;

    private String venue;

    private String address;

    @Indexed
    private String city;

    @Indexed
    private LocalDate eventDate;

    private LocalTime startTime;

    private LocalTime endTime;

    private BigDecimal price;

    private Integer capacity;

    private Integer availableSeats;

    private boolean published = true;

    private Instant bookingDeadline;

    private String organizerName;

    private String organizerContact;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    public Event() {}

    public Event(String id, String title, String slug, String description, String category, String coverImage, String venue, String address, String city, LocalDate eventDate, LocalTime startTime, LocalTime endTime, BigDecimal price, Integer capacity, Integer availableSeats, boolean published, Instant bookingDeadline, String organizerName, String organizerContact, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.category = category;
        this.coverImage = coverImage;
        this.venue = venue;
        this.address = address;
        this.city = city;
        this.eventDate = eventDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
        this.capacity = capacity;
        this.availableSeats = availableSeats;
        this.published = published;
        this.bookingDeadline = bookingDeadline;
        this.organizerName = organizerName;
        this.organizerContact = organizerContact;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static EventBuilder builder() {
        return new EventBuilder();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getCoverImage() { return coverImage; }
    public void setCoverImage(String coverImage) { this.coverImage = coverImage; }

    public String getVenue() { return venue; }
    public void setVenue(String venue) { this.venue = venue; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public LocalDate getEventDate() { return eventDate; }
    public void setEventDate(LocalDate eventDate) { this.eventDate = eventDate; }

    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

    public LocalTime getEndTime() { return endTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }

    public Integer getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(Integer availableSeats) { this.availableSeats = availableSeats; }

    public boolean isPublished() { return published; }
    public void setPublished(boolean published) { this.published = published; }

    public Instant getBookingDeadline() { return bookingDeadline; }
    public void setBookingDeadline(Instant bookingDeadline) { this.bookingDeadline = bookingDeadline; }

    public String getOrganizerName() { return organizerName; }
    public void setOrganizerName(String organizerName) { this.organizerName = organizerName; }

    public String getOrganizerContact() { return organizerContact; }
    public void setOrganizerContact(String organizerContact) { this.organizerContact = organizerContact; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    public static class EventBuilder {
        private String id;
        private String title;
        private String slug;
        private String description;
        private String category;
        private String coverImage;
        private String venue;
        private String address;
        private String city;
        private LocalDate eventDate;
        private LocalTime startTime;
        private LocalTime endTime;
        private BigDecimal price;
        private Integer capacity;
        private Integer availableSeats;
        private boolean published = true;
        private Instant bookingDeadline;
        private String organizerName;
        private String organizerContact;
        private Instant createdAt;
        private Instant updatedAt;

        public EventBuilder id(String id) { this.id = id; return this; }
        public EventBuilder title(String title) { this.title = title; return this; }
        public EventBuilder slug(String slug) { this.slug = slug; return this; }
        public EventBuilder description(String description) { this.description = description; return this; }
        public EventBuilder category(String category) { this.category = category; return this; }
        public EventBuilder coverImage(String coverImage) { this.coverImage = coverImage; return this; }
        public EventBuilder venue(String venue) { this.venue = venue; return this; }
        public EventBuilder address(String address) { this.address = address; return this; }
        public EventBuilder city(String city) { this.city = city; return this; }
        public EventBuilder eventDate(LocalDate eventDate) { this.eventDate = eventDate; return this; }
        public EventBuilder startTime(LocalTime startTime) { this.startTime = startTime; return this; }
        public EventBuilder endTime(LocalTime endTime) { this.endTime = endTime; return this; }
        public EventBuilder price(BigDecimal price) { this.price = price; return this; }
        public EventBuilder capacity(Integer capacity) { this.capacity = capacity; return this; }
        public EventBuilder availableSeats(Integer availableSeats) { this.availableSeats = availableSeats; return this; }
        public EventBuilder published(boolean published) { this.published = published; return this; }
        public EventBuilder bookingDeadline(Instant bookingDeadline) { this.bookingDeadline = bookingDeadline; return this; }
        public EventBuilder organizerName(String organizerName) { this.organizerName = organizerName; return this; }
        public EventBuilder organizerContact(String organizerContact) { this.organizerContact = organizerContact; return this; }
        public EventBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public EventBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public Event build() {
            return new Event(id, title, slug, description, category, coverImage, venue, address, city, eventDate, startTime, endTime, price, capacity, availableSeats, published, bookingDeadline, organizerName, organizerContact, createdAt, updatedAt);
        }
    }
}
