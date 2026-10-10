package com.eventsphere.repository;

import com.eventsphere.model.Booking;
import com.eventsphere.model.BookingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends MongoRepository<Booking, String> {

    Optional<Booking> findByBookingReference(String bookingReference);

    Page<Booking> findByUserIdOrderByCreatedAtDesc(String userId, Pageable pageable);

    List<Booking> findByUserIdOrderByCreatedAtDesc(String userId);

    List<Booking> findByEventIdAndStatus(String eventId, BookingStatus status);

    long countByStatus(BookingStatus status);

    Page<Booking> findByStatus(BookingStatus status, Pageable pageable);
}
