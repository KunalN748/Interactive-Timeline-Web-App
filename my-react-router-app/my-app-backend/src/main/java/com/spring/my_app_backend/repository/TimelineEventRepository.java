package com.spring.my_app_backend.repository;

import com.spring.my_app_backend.model.TimelineEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//Spring Data JPA generates the CRUD implementation at runtime.
//JpaRepository gives us findAll/findById/save/deleteById/count/deleteAll for free.
@Repository
public interface TimelineEventRepository extends JpaRepository<TimelineEvent, Long> {
}
