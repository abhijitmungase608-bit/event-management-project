package com.eventsphere.controller;

import com.eventsphere.dto.ApiResponse;
import com.eventsphere.dto.EventDTO;
import com.eventsphere.dto.PagedResponse;
import com.eventsphere.dto.WhatsAppMessageDTO;
import com.eventsphere.service.EventService;
import com.eventsphere.util.WhatsAppUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@Tag(name = "Events", description = "Public Event Browsing and Searching Endpoints")
public class EventController {

    private final EventService eventService;

    @Value("${app.whatsapp.business-number:919307189068}")
    private String defaultBusinessNumber;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    @Operation(summary = "Get published events with search, category filtering, and pagination")
    public ResponseEntity<ApiResponse<PagedResponse<EventDTO>>> getEvents(
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "All") String category,
            @RequestParam(required = false, defaultValue = "eventDate") String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String sortDir,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {

        PagedResponse<EventDTO> events = eventService.getPublicEvents(search, category, sortBy, sortDir, page, size);
        return ResponseEntity.ok(ApiResponse.success(events));
    }

    @GetMapping("/featured")
    @Operation(summary = "Get top 6 featured events for homepage")
    public ResponseEntity<ApiResponse<List<EventDTO>>> getFeaturedEvents() {
        List<EventDTO> featured = eventService.getFeaturedEvents();
        return ResponseEntity.ok(ApiResponse.success(featured));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get detailed event information by ID")
    public ResponseEntity<ApiResponse<EventDTO>> getEventById(@PathVariable String id) {
        EventDTO event = eventService.getEventById(id);
        return ResponseEntity.ok(ApiResponse.success(event));
    }

    @GetMapping("/slug/{slug}")
    @Operation(summary = "Get detailed event information by Slug")
    public ResponseEntity<ApiResponse<EventDTO>> getEventBySlug(@PathVariable String slug) {
        EventDTO event = eventService.getEventBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success(event));
    }

    @GetMapping("/{id}/inquiry-whatsapp")
    @Operation(summary = "Generate prefilled WhatsApp inquiry draft for an event")
    public ResponseEntity<ApiResponse<WhatsAppMessageDTO>> getEventInquiryWhatsApp(@PathVariable String id) {
        EventDTO eventDTO = eventService.getEventById(id);
        com.eventsphere.model.Event event = com.eventsphere.model.Event.builder()
                .title(eventDTO.getTitle())
                .eventDate(eventDTO.getEventDate())
                .venue(eventDTO.getVenue())
                .city(eventDTO.getCity())
                .build();
        WhatsAppMessageDTO draft = WhatsAppUtil.generateEventInquiryDraft(event, defaultBusinessNumber);
        return ResponseEntity.ok(ApiResponse.success(draft));
    }
}
