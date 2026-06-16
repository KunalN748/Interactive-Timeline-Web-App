package com.spring.my_app_backend.service;

import com.spring.my_app_backend.model.TimelineEvent;
import com.spring.my_app_backend.repository.TimelineEventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.annotation.PostConstruct;

import java.util.*;
import java.util.stream.Collectors;

@Service //the persistent implementation of TimelineEventService, backed by a real database
public class JpaTimelineEventService implements TimelineEventService {

    private final TimelineEventRepository repository; //handles all database access

    //Spring injects the repository (constructor injection)
    public JpaTimelineEventService(TimelineEventRepository repository) {
        this.repository = repository;
    }

    @PostConstruct //runs once after startup
    //seeds default events only when the table is empty, so persisted data is never clobbered on restart
    public void seedIfEmpty() {
        if (repository.count() == 0) {
            seedDefaults();
        }
    }

    @Override //returns all events sorted by date
    public List<TimelineEvent> getAllEvents() {
        return sortEventsByDate(repository.findAll());
    }

    @Override //fetches one event by id from the database
    public Optional<TimelineEvent> getEventById(Long id) {
        return repository.findById(id);
    }

    @Override //inserts a new event or updates an existing one (when id is set)
    public TimelineEvent saveEvent(TimelineEvent timelineEvent) {
        return repository.save(timelineEvent);
    }

    @Override //deletes an event by id
    public void deleteEvent(Long id) {
        repository.deleteById(id);
    }

    @Override
    @Transactional //clears all events and restores the defaults
    public void resetTimeline() {
        repository.deleteAll();
        seedDefaults();
    }

    //creates and saves the default TimelineEvent objects
    private void seedDefaults() {
        List<String> tech1 = Arrays.asList("English", "Hindi", "GooGoo-GaaGaa");
        repository.save(new TimelineEvent("Youth - Elementary", "Udaipur, Rajasthan",
                "Moved from India to Washington, US", "Details", "2006",
                "baby", "indigo", tech1, "dsaaaaaaaaaaaaaaaa sdaaaaaads d s s sd an djabd as dj ajd ja jd sja dj as dhas jdgiuasbic ashbdubasj iusabhdiuas dh asbdjbasjda cjhbsadbiusabjd asiciva"));

        List<String> tech2 = Arrays.asList("Python", "Django");
        repository.save(new TimelineEvent("Adolescence - Middle School", "Bellevue, Washington",
                "Graduated from middle school at Pine Lake Middle School", "Details", "2018",
                "person", "indigo", tech2, "very long example of a long description"));

        List<String> tech3 = Arrays.asList("Spanish", "Java", "JavaScript");
        repository.save(new TimelineEvent("Adolescence - High School", "Sammamish, Washington",
                "Graduated from high school at Skyline High School", "Details", "2021",
                "person", "orange", tech3, "very long example of a long description"));

        List<String> tech4 = Arrays.asList("Quiskit", "C++", "SQL");
        repository.save(new TimelineEvent("Young Adult", "Seattle, Washington",
                "Attended University of Washington with a Computer Science degree", "Details", "2025",
                "person", "indigo", tech4, "very long example of a long description"));

        List<String> tech5 = Arrays.asList("Flutter", "Ruby");
        repository.save(new TimelineEvent("Adult", "Seattle, Washington",
                "Began working as a freelance developer", "Details", "2060",
                "death", "indigo", tech5, "very long example of a long description"));
    }

    private List<TimelineEvent> sortEventsByDate(List<TimelineEvent> eventList) {
        return eventList.stream() //using java stream, returns events list sorted by date string
            .sorted((e1, e2) -> compareDates(e1.getDate(), e2.getDate()))
            .collect(Collectors.toList());  //converts the stream back to a list
    }

    private int compareDates(String date1, String date2) {
        //convert date string to integer
        int year1 = Integer.parseInt(date1);
        int year2 = Integer.parseInt(date2);

        return Integer.compare(year1, year2);
    }
}
