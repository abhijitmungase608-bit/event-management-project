package com.eventsphere.dto;

import java.math.BigDecimal;
import java.util.List;

public class DashboardStatsDTO {
    private long totalEvents;
    private long publishedEvents;
    private long totalBookings;
    private long confirmedBookings;
    private long pendingBookings;
    private long cancelledBookings;
    private long registeredUsers;
    private BigDecimal estimatedRevenue;
    private List<MonthlyBookingDTO> monthlyBookings;
    private List<StatusDistributionDTO> statusDistribution;
    private List<CategoryDistributionDTO> categoryDistribution;

    public DashboardStatsDTO() {}

    public DashboardStatsDTO(long totalEvents, long publishedEvents, long totalBookings, long confirmedBookings, long pendingBookings, long cancelledBookings, long registeredUsers, BigDecimal estimatedRevenue, List<MonthlyBookingDTO> monthlyBookings, List<StatusDistributionDTO> statusDistribution, List<CategoryDistributionDTO> categoryDistribution) {
        this.totalEvents = totalEvents;
        this.publishedEvents = publishedEvents;
        this.totalBookings = totalBookings;
        this.confirmedBookings = confirmedBookings;
        this.pendingBookings = pendingBookings;
        this.cancelledBookings = cancelledBookings;
        this.registeredUsers = registeredUsers;
        this.estimatedRevenue = estimatedRevenue;
        this.monthlyBookings = monthlyBookings;
        this.statusDistribution = statusDistribution;
        this.categoryDistribution = categoryDistribution;
    }

    public static DashboardStatsDTOBuilder builder() {
        return new DashboardStatsDTOBuilder();
    }

    public long getTotalEvents() { return totalEvents; }
    public void setTotalEvents(long totalEvents) { this.totalEvents = totalEvents; }

    public long getPublishedEvents() { return publishedEvents; }
    public void setPublishedEvents(long publishedEvents) { this.publishedEvents = publishedEvents; }

    public long getTotalBookings() { return totalBookings; }
    public void setTotalBookings(long totalBookings) { this.totalBookings = totalBookings; }

    public long getConfirmedBookings() { return confirmedBookings; }
    public void setConfirmedBookings(long confirmedBookings) { this.confirmedBookings = confirmedBookings; }

    public long getPendingBookings() { return pendingBookings; }
    public void setPendingBookings(long pendingBookings) { this.pendingBookings = pendingBookings; }

    public long getCancelledBookings() { return cancelledBookings; }
    public void setCancelledBookings(long cancelledBookings) { this.cancelledBookings = cancelledBookings; }

    public long getRegisteredUsers() { return registeredUsers; }
    public void setRegisteredUsers(long registeredUsers) { this.registeredUsers = registeredUsers; }

    public BigDecimal getEstimatedRevenue() { return estimatedRevenue; }
    public void setEstimatedRevenue(BigDecimal estimatedRevenue) { this.estimatedRevenue = estimatedRevenue; }

    public List<MonthlyBookingDTO> getMonthlyBookings() { return monthlyBookings; }
    public void setMonthlyBookings(List<MonthlyBookingDTO> monthlyBookings) { this.monthlyBookings = monthlyBookings; }

    public List<StatusDistributionDTO> getStatusDistribution() { return statusDistribution; }
    public void setStatusDistribution(List<StatusDistributionDTO> statusDistribution) { this.statusDistribution = statusDistribution; }

    public List<CategoryDistributionDTO> getCategoryDistribution() { return categoryDistribution; }
    public void setCategoryDistribution(List<CategoryDistributionDTO> categoryDistribution) { this.categoryDistribution = categoryDistribution; }

    public static class DashboardStatsDTOBuilder {
        private long totalEvents;
        private long publishedEvents;
        private long totalBookings;
        private long confirmedBookings;
        private long pendingBookings;
        private long cancelledBookings;
        private long registeredUsers;
        private BigDecimal estimatedRevenue;
        private List<MonthlyBookingDTO> monthlyBookings;
        private List<StatusDistributionDTO> statusDistribution;
        private List<CategoryDistributionDTO> categoryDistribution;

        public DashboardStatsDTOBuilder totalEvents(long totalEvents) { this.totalEvents = totalEvents; return this; }
        public DashboardStatsDTOBuilder publishedEvents(long publishedEvents) { this.publishedEvents = publishedEvents; return this; }
        public DashboardStatsDTOBuilder totalBookings(long totalBookings) { this.totalBookings = totalBookings; return this; }
        public DashboardStatsDTOBuilder confirmedBookings(long confirmedBookings) { this.confirmedBookings = confirmedBookings; return this; }
        public DashboardStatsDTOBuilder pendingBookings(long pendingBookings) { this.pendingBookings = pendingBookings; return this; }
        public DashboardStatsDTOBuilder cancelledBookings(long cancelledBookings) { this.cancelledBookings = cancelledBookings; return this; }
        public DashboardStatsDTOBuilder registeredUsers(long registeredUsers) { this.registeredUsers = registeredUsers; return this; }
        public DashboardStatsDTOBuilder estimatedRevenue(BigDecimal estimatedRevenue) { this.estimatedRevenue = estimatedRevenue; return this; }
        public DashboardStatsDTOBuilder monthlyBookings(List<MonthlyBookingDTO> monthlyBookings) { this.monthlyBookings = monthlyBookings; return this; }
        public DashboardStatsDTOBuilder statusDistribution(List<StatusDistributionDTO> statusDistribution) { this.statusDistribution = statusDistribution; return this; }
        public DashboardStatsDTOBuilder categoryDistribution(List<CategoryDistributionDTO> categoryDistribution) { this.categoryDistribution = categoryDistribution; return this; }

        public DashboardStatsDTO build() {
            return new DashboardStatsDTO(totalEvents, publishedEvents, totalBookings, confirmedBookings, pendingBookings, cancelledBookings, registeredUsers, estimatedRevenue, monthlyBookings, statusDistribution, categoryDistribution);
        }
    }
}
