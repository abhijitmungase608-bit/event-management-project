package com.eventsphere;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class EventSphereApplication {

    public static void main(String[] args) {
        SpringApplication.run(EventSphereApplication.class, args);
    }
}
