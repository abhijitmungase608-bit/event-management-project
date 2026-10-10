package com.eventsphere.repository;

import com.eventsphere.model.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {

    Optional<Event> findBySlug(String slug);

    Page<Event> findByPublished(boolean published, Pageable pageable);

    List<Event> findTop6ByPublishedOrderByCreatedAtDesc(boolean published);

    @Query("{ 'published': true, " +
           "  '$or': [ " +
           "    { 'title': { '$regex': ?0, '$options': 'i' } }, " +
           "    { 'description': { '$regex': ?0, '$options': 'i' } }, " +
           "    { 'city': { '$regex': ?0, '$options': 'i' } }, " +
           "    { 'venue': { '$regex': ?0, '$options': 'i' } } " +
           "  ] " +
           "}")
    Page<Event> searchEvents(String query, Pageable pageable);

    List<Event> findByCategoryAndPublishedTrue(String category);

    long countByPublished(boolean published);
}
