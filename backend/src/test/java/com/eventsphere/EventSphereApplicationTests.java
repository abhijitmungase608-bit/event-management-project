package com.eventsphere;

import com.eventsphere.dto.BookingDTO;
import com.eventsphere.model.Booking;
import com.eventsphere.model.Event;
import com.eventsphere.util.WhatsAppUtil;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class EventSphereApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void testWhatsAppDraftGeneration() {
		Event event = Event.builder()
				.title("Tech Summit 2026")
				.venue("Convention Center")
				.city("Ahilyanagar")
				.eventDate(LocalDate.of(2026, 11, 15))
				.startTime(LocalTime.of(10, 0))
				.build();

		Booking booking = Booking.builder()
				.bookingReference("ES-202610-123456")
				.attendeeName("John Doe")
				.attendeePhone("+919307189068")
				.numberOfTickets(2)
				.totalAmount(new BigDecimal("5998.00"))
				.status(com.eventsphere.model.BookingStatus.CONFIRMED)
				.build();

		var draft = WhatsAppUtil.generateBookingDraft(booking, event, "919307189068", "ORGANIZER");

		assertNotNull(draft);
		assertTrue(draft.getClickToChatUrl().contains("wa.me/919307189068"));
		assertTrue(draft.getRawText().contains("ES-202610-123456"));
		assertTrue(draft.getRawText().contains("Tech Summit 2026"));
	}
}
