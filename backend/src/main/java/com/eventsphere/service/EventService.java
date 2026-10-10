package com.eventsphere.service;

import com.eventsphere.dto.EventDTO;
import com.eventsphere.dto.EventRequest;
import com.eventsphere.dto.PagedResponse;
import com.eventsphere.exception.BadRequestException;
import com.eventsphere.exception.ResourceNotFoundException;
import com.eventsphere.model.Event;
import com.eventsphere.repository.EventRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.text.Normalizer;
import java.time.Instant;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public EventDTO createEvent(EventRequest request) {
        String slug = generateSlug(request.getTitle());

        Event event = Event.builder()
                .title(request.getTitle())
                .slug(slug)
                .description(request.getDescription())
                .category(request.getCategory())
                .coverImage(StringUtils.hasText(request.getCoverImage()) ? request.getCoverImage() :
                        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80")
                .venue(request.getVenue())
                .address(request.getAddress())
                .city(request.getCity())
                .eventDate(request.getEventDate())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .price(request.getPrice())
                .capacity(request.getCapacity())
                .availableSeats(request.getCapacity())
                .published(request.isPublished())
                .bookingDeadline(request.getBookingDeadline() != null ? request.getBookingDeadline() :
                        request.getEventDate().atStartOfDay().toInstant(java.time.ZoneOffset.UTC))
                .organizerName(StringUtils.hasText(request.getOrganizerName()) ? request.getOrganizerName() : "EventSphere Team")
                .organizerContact(StringUtils.hasText(request.getOrganizerContact()) ? request.getOrganizerContact() : "+919307189068")
                .build();

        Event savedEvent = eventRepository.save(event);
        return mapToDTO(savedEvent);
    }

    public EventDTO updateEvent(String id, EventRequest request) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        int bookedSeats = event.getCapacity() - event.getAvailableSeats();
        if (request.getCapacity() < bookedSeats) {
            throw new BadRequestException("New capacity cannot be less than already booked seats (" + bookedSeats + ")");
        }

        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setCategory(request.getCategory());
        if (StringUtils.hasText(request.getCoverImage())) {
            event.setCoverImage(request.getCoverImage());
        }
        event.setVenue(request.getVenue());
        event.setAddress(request.getAddress());
        event.setCity(request.getCity());
        event.setEventDate(request.getEventDate());
        event.setStartTime(request.getStartTime());
        event.setEndTime(request.getEndTime());
        event.setPrice(request.getPrice());
        event.setCapacity(request.getCapacity());
        event.setAvailableSeats(request.getCapacity() - bookedSeats);
        event.setPublished(request.isPublished());
        if (request.getBookingDeadline() != null) {
            event.setBookingDeadline(request.getBookingDeadline());
        }
        if (StringUtils.hasText(request.getOrganizerName())) {
            event.setOrganizerName(request.getOrganizerName());
        }
        if (StringUtils.hasText(request.getOrganizerContact())) {
            event.setOrganizerContact(request.getOrganizerContact());
        }

        Event updated = eventRepository.save(event);
        return mapToDTO(updated);
    }

    public EventDTO togglePublish(String id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        event.setPublished(!event.isPublished());
        return mapToDTO(eventRepository.save(event));
    }

    public void deleteEvent(String id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        eventRepository.delete(event);
    }

    public EventDTO getEventById(String id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        return mapToDTO(event);
    }

    public EventDTO getEventBySlug(String slug) {
        Event event = eventRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with slug: " + slug));
        return mapToDTO(event);
    }

    public List<EventDTO> getFeaturedEvents() {
        return eventRepository.findTop6ByPublishedOrderByCreatedAtDesc(true)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public PagedResponse<EventDTO> getPublicEvents(String search, String category, String sortBy, String sortDir, int page, int size) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Event> eventPage;
        if (StringUtils.hasText(search)) {
            eventPage = eventRepository.searchEvents(search, pageable);
        } else {
            eventPage = eventRepository.findByPublished(true, pageable);
        }

        List<EventDTO> content = eventPage.getContent().stream()
                .filter(e -> !StringUtils.hasText(category) || category.equalsIgnoreCase("All") || e.getCategory().equalsIgnoreCase(category))
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        return PagedResponse.<EventDTO>builder()
                .content(content)
                .page(eventPage.getNumber())
                .size(eventPage.getSize())
                .totalElements(eventPage.getTotalElements())
                .totalPages(eventPage.getTotalPages())
                .last(eventPage.isLast())
                .build();
    }

    public PagedResponse<EventDTO> getAllEventsAdmin(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Event> eventPage = eventRepository.findAll(pageable);

        List<EventDTO> content = eventPage.getContent().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        return PagedResponse.<EventDTO>builder()
                .content(content)
                .page(eventPage.getNumber())
                .size(eventPage.getSize())
                .totalElements(eventPage.getTotalElements())
                .totalPages(eventPage.getTotalPages())
                .last(eventPage.isLast())
                .build();
    }

    public EventDTO mapToDTO(Event event) {
        return EventDTO.builder()
                .id(event.getId())
                .title(event.getTitle())
                .slug(event.getSlug())
                .description(event.getDescription())
                .category(event.getCategory())
                .coverImage(event.getCoverImage())
                .venue(event.getVenue())
                .address(event.getAddress())
                .city(event.getCity())
                .eventDate(event.getEventDate())
                .startTime(event.getStartTime())
                .endTime(event.getEndTime())
                .price(event.getPrice())
                .capacity(event.getCapacity())
                .availableSeats(event.getAvailableSeats())
                .published(event.isPublished())
                .bookingDeadline(event.getBookingDeadline())
                .organizerName(event.getOrganizerName())
                .organizerContact(event.getOrganizerContact())
                .createdAt(event.getCreatedAt())
                .updatedAt(event.getUpdatedAt())
                .build();
    }

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    private String generateSlug(String input) {
        String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        String result = slug.toLowerCase(Locale.ENGLISH);

        String baseSlug = result;
        int count = 1;
        while (eventRepository.findBySlug(result).isPresent()) {
            result = baseSlug + "-" + count++;
        }
        return result;
    }
}
