package com.eventsphere.dto;

public class StatusDistributionDTO {
    private String name;
    private long value;

    public StatusDistributionDTO() {}

    public StatusDistributionDTO(String name, long value) {
        this.name = name;
        this.value = value;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public long getValue() { return value; }
    public void setValue(long value) { this.value = value; }
}
