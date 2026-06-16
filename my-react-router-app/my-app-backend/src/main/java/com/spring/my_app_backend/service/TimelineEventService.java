package com.spring.my_app_backend.service;

//imports
import com.spring.my_app_backend.model.TimelineEvent;
import java.util.List;
import java.util.Optional;

//defines interface, helps define operations controller will use
public interface TimelineEventService {
    List<TimelineEvent> getAllEvents(); 
    Optional<TimelineEvent> getEventById(Long id); //Optional handles null exceptions
    TimelineEvent saveEvent(TimelineEvent timelineEvent); 
    void deleteEvent(Long id); 
    void resetTimeline(); 
}
