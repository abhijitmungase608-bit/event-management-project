package com.eventsphere.dto;

public class CategoryDistributionDTO {
    private String category;
    private long eventCount;

    public CategoryDistributionDTO() {}

    public CategoryDistributionDTO(String category, long eventCount) {
        this.category = category;
        this.eventCount = eventCount;
    }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public long getEventCount() { return eventCount; }
    public void setEventCount(long eventCount) { this.eventCount = eventCount; }
}
