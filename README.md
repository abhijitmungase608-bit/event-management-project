<<<<<<< HEAD
# event-management-project
=======
# EventSphere — Professional Event Management & Booking System

[![Java](https://img.shields.io/badge/Java-21%20LTS-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple.svg)](https://vitejs.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-green.svg)](https://www.mongodb.com/)

**EventSphere** is an enterprise-minded, full-stack event management and ticket reservation platform built for MCA academic submission and commercial demonstration. The application combines a high-performance **Java Spring Boot 3** REST API backend with a modern **React + Vite + Tailwind CSS** glassmorphism frontend, connected to a **MongoDB** document database.

---

## 🌟 Key Features

### 1. Visitor & Attendee Experience
- **Home & Hero Section**: Live event search bar, category pills, quick stats counters, hand-picked featured events, user testimonials, and call-to-action sections.
- **Explore Events Page**: Advanced search by title/city/venue, category tabs, price & date sorting, grid/list toggle, and responsive pagination.
- **Event Details & Availability**: Cover image, venue, date, time, organizer contacts, remaining seats progress, and related events.
- **Instant Seat Reservation**: Server-side capacity validation and price calculations (`totalAmount = price * tickets`).
- **Booking Confirmation & WhatsApp Auto-Draft**:
  - Immediate booking confirmation screen with unique reference (`ES-YYYYMM-XXXXXX`).
  - **WhatsApp Click-to-Chat Integration**: Generates prefilled `wa.me` URLs with formatted booking details ready to send.
  - "Ask on WhatsApp" inquiry generator on event detail pages.
  - Copy booking details button with clipboard feedback.
- **My Bookings History**: View upcoming/past bookings, status badges (`CONFIRMED`, `PENDING`, `CANCELLED`), cancellation requests, and WhatsApp draft triggers.

### 2. Administrator Dashboard & Management
- **Analytics Cards & Charts**: Total events, published count, total bookings, status breakdown, registered user count, and estimated revenue.
- **Interactive Recharts**: Monthly booking trends area chart, status distribution pie chart, and category bar chart.
- **Event CRUD Module**: Create/edit events, toggle publish/draft status, configure cover images, set deadlines, and manage seat capacity.
- **Booking Management**: Review all system reservations, filter by status, change booking status with seat capacity auto-restoration upon cancellation, and trigger WhatsApp messages.
- **User Directory**: View registered accounts, role badges (`ROLE_USER`, `ROLE_ADMIN`), and timestamps.
- **System Reports & CSV Export**: One-click export of all booking records into structured `.CSV` files.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS + Bootstrap utilities + Glassmorphism custom CSS
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios with Bearer token interceptor
- **Icons & Visuals**: Lucide React
- **Notifications**: React Hot Toast
- **Analytics**: Recharts

### Backend
- **Framework**: Spring Boot 3.3.0 (Java 21/25)
- **Security**: Spring Security 6 with JWT stateless authentication & BCrypt password hashing
- **Database**: Spring Data MongoDB
- **Validation**: Jakarta Bean Validation (`@NotBlank`, `@Min`, `@FutureOrPresent`)
- **Documentation**: OpenAPI / Swagger UI (`/swagger-ui.html`)
- **Build Tool**: Apache Maven 3.9.x

---

## 🚀 Quick Start & Execution Guide

### Prerequisites
- Java 21 JDK (or Java 25 installed)
- Node.js v18+ and npm
- MongoDB running locally on port `27017` (or MongoDB Atlas URI)
- Apache Maven 3.9+ (or included Maven binary)

### 1. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Compile Java sources
& 'C:\apache-maven-3.9.6\bin\mvn.cmd' clean compile

# Run Spring Boot backend
& 'C:\apache-maven-3.9.6\bin\mvn.cmd' spring-boot:run
```
> Backend starts at: `http://localhost:8080`  
> Swagger Documentation: `http://localhost:8080/swagger-ui.html`

### 2. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
> Frontend runs at: `http://localhost:5173`

---

## 🔑 Admin Bootstrap Credentials

Upon initial startup, the backend automatically seeds initial sample events and a default Administrator account into MongoDB:

| Parameter | Value |
| :--- | :--- |
| **Admin Email** | `admin@eventsphere.com` |
| **Admin Password** | `Admin@123456` |
| **Role** | `ROLE_ADMIN` |

> *Note: On the login page, click the **"Autofill Admin"** button for instant one-click login!*

---

## 💬 WhatsApp Integration & Limitation Note

- **Click-to-Chat URL Protocol**: EventSphere uses the official WhatsApp click-to-chat format (`https://wa.me/<PHONE>?text=<URL_ENCODED_MSG>`).
- **User Action Requirement**: Clicking "Prepare WhatsApp Confirmation" opens WhatsApp (Web or Mobile App) with the prefilled message draft. The user must press **Send** inside WhatsApp to deliver the message.
- **No Credentials Required**: This URL-based draft mechanism requires zero third-party API credentials, making it reliable for academic demonstrations.

---

## 📄 Academic Documentation Directory

Detailed academic submission documentation, diagrams, and viva Q&A are located in `docs/`:
- `docs/PROJECT_DOCUMENTATION.md`: Full academic project report, architecture, database design, testing matrix, user/admin manuals, and viva Q&A.
>>>>>>> e5a7761 (Initial commit - Event Sphere Management System)
