package com.spring.my_app_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.FetchType;

import java.util.List;

@Entity //tells spring and JPA that this is a database entity
public class TimelineEvent {
    @Id //marks id as primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) //tells JPA to generate unique ids for new events
    
    private Long id;
    private String title;
    private String location;
    private String description;
    private String buttonText;
    private String date;
    private String icon;
    private String color;
    
    //seperate table for techs (key words)
    //EAGER so the list is loaded with the event; otherwise JSON serialization fails
    //with a LazyInitializationException once the DB session has closed (open-in-view=false)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "timeline_event_tech", joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "tech")
    private List<String> tech;
    
    private String long_desc;

    // Default constructor
    public TimelineEvent() {
    }

    // Constructor with fields
    public TimelineEvent(String title, String location, String description,
                        String buttonText, String date, String icon, 
                        String color, List<String> tech, String long_desc) {
        this.title = title;
        this.location = location;
        this.description = description;
        this.buttonText = buttonText;
        this.date = date;
        this.icon = icon;
        this.color = color;
        this.tech = tech;
        this.long_desc = long_desc;
    }

    //getters and setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getButtonText() {
        return buttonText;
    }
    public void setButtonText(String buttonText) {
        this.buttonText = buttonText;
    }

    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }

    public String getIcon() {
        return icon;
    }
    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getColor() {
        return color;
    }
    public void setColor(String color) {
        this.color = color;
    }

    public List<String> getTech() {
        return tech;
    }
    public void setTech(List<String> tech) {
        this.tech = tech;
    }

    public String getLong_desc() {
        return long_desc;
    }
    public void setLong_desc(String long_desc) {
        this.long_desc = long_desc;
    }
}
