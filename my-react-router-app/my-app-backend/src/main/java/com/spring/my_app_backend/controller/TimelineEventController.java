package com.spring.my_app_backend.controller;

//imports
import com.spring.my_app_backend.model.TimelineEvent;
import com.spring.my_app_backend.service.TimelineEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController //annotation handles API requests and returns JSON responses.
@RequestMapping("/api/timeline") //sets the url for all endpoints
//CORS is configured globally in WebConfig (driven by the ALLOWED_ORIGINS env var)
public class TimelineEventController {
    private final TimelineEventService timelineEventService; //timelineEventService handles logic

    @Autowired //tells Spring Boot to inject timelineEventService when creating controller
    public TimelineEventController(TimelineEventService timelineEventService) {
        this.timelineEventService = timelineEventService;
    }

    //handling get requests
    @GetMapping 
    public ResponseEntity<List<TimelineEvent>> getAllEvents() {
        return ResponseEntity.ok(timelineEventService.getAllEvents());
    }

    @GetMapping("/{id}") //get id from url and if found respond ok
    public ResponseEntity<TimelineEvent> getEventById(@PathVariable Long id) {
        return timelineEventService.getEventById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping //handles POST requests to api file in frontend
    //class to create new event 
    public ResponseEntity<TimelineEvent> createEvent(@RequestBody TimelineEvent timelineEvent) {
        TimelineEvent savedEvent = timelineEventService.saveEvent(timelineEvent); //saves event
        return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);
    }

    @PutMapping("/{id}") //handles PUT requests to update event
    //class to check if event exists, update and save it, or return 404
    public ResponseEntity<TimelineEvent> updateEvent(@PathVariable Long id, @RequestBody TimelineEvent timelineEvent) {
        return timelineEventService.getEventById(id)
                .map(existingEvent -> {
                    timelineEvent.setId(id);
                    return ResponseEntity.ok(timelineEventService.saveEvent(timelineEvent));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}") //hangles Delete requests
    //if event exists, it deletes it and returns 204 (no content) otherwise 404
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        return timelineEventService.getEventById(id)
                .map(event -> {
                    timelineEventService.deleteEvent(id);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/reset") //handles the reset function
    //clears all new timeline events and returns 204
    public ResponseEntity<Void> resetTimeline() {
        timelineEventService.resetTimeline();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
