# CraneTrack - Fleet Management System

## Project Overview

CraneTrack is a professional MVP web platform designed for efficient **Fleet Management of crane trucks**. This system aims to provide a robust, scalable, and user-friendly solution for managing various aspects of a crane truck fleet, including trucks, drivers, trips, maintenance, and real-time tracking. The project is built with a focus on production-readiness, clean architecture, and ease of maintenance.

## Tech Stack

### Backend
- **Django**: High-level Python Web framework for rapid development and clean, pragmatic design.
- **Django REST Framework (DRF)**: Powerful and flexible toolkit for building Web APIs.
- **PostgreSQL**: Robust, open-source relational database.
- **JWT Authentication**: Secure token-based authentication for stateless API communication.
- **Django Channels**: Enables Django to handle WebSockets, HTTP/2, and other protocols.
- **Redis**: In-memory data structure store, used as a message broker for Django Channels and Celery.
- **Celery**: Asynchronous task queue/job queue based on distributed message passing.

### Frontend
- **React + Vite**: A fast and modern JavaScript library for building user interfaces, bundled with Vite for a lightning-fast development experience.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **React Router**: Declarative routing for React applications.
- **React Query**: Hooks for fetching, caching and updating asynchronous data in React.

## Project Goal

The primary goal of CraneTrack is to manage:
- Crane trucks
- Drivers
- Trips
- Maintenance
- Notifications
- Real-time truck tracking

The MVP focuses on core features to ensure a solid foundation for future enhancements.

## MVP Features

1.  **Authentication**
    *   Login
    *   Register
    *   JWT authentication with access and refresh tokens
    *   User roles: Admin, Manager, Driver

2.  **Trucks Management**
    *   Create, Update, Delete, List trucks
    *   Truck details: plate number, model, status, fuel level, GPS coordinates, speed, heading

3.  **Drivers Management**
    *   Create, Update, Delete drivers
    *   Assign driver to truck (one-to-one relationship)
    *   Driver details: name, phone, license number, status

4.  **Trips Management**
    *   Start and End trips
    *   Track trip details: driver, truck, start/destination, distance, fuel used, status, timestamps

5.  **Maintenance**
    *   Create maintenance records
    *   List maintenance history
    *   Scheduled maintenance date, completion date, cost, type

6.  **Notifications**
    *   In-app notification system
    *   Alerts for maintenance due and trip completion

7.  **Real-Time Tracking**
    *   Utilizes Django Channels and WebSockets for live truck location updates.
    *   Frontend updates without page refresh.

## Backend Requirements

### Project Structure
```
backend/
├── apps/
│   ├── accounts/         # User authentication and profiles
│   ├── trucks/           # Truck management and real-time tracking
│   ├── drivers/          # Driver management
│   ├── trips/            # Trip management
│   ├── maintenance/      # Maintenance records
│   └── notifications/    # In-app notifications
├── config/               # Django project settings, URLs, ASGI/WSGI
├── requirements.txt      # Python dependencies
└── manage.py             # Django management utility
```

### Technical Details
-   **Class-Based Views**: Used for API endpoints.
-   **Serializers**: Data serialization and deserialization.
-   **ViewSets**: Combine logic for a set of related views into a single class.
-   **PostgreSQL**: Primary database.
-   **Model Relationships**: Proper foreign key and one-to-one relationships defined.
-   **RESTful API**: Adherence to REST principles.
-   **JWT Auth**: `djangorestframework-simplejwt` for token management.
-   **Permissions System**: Role-based access control.
-   **Environment Variables**: Managed with `python-decouple`.
-   **API Versioning**: (Future consideration, not explicitly implemented in MVP but structure allows).
-   **Swagger/OpenAPI Documentation**: Generated via `drf-spectacular`.
-   **Pagination, Filtering, Search**: Implemented for list views.
-   **Docker-ready**: Containerized setup for easy deployment.

## Frontend Requirements

### Project Structure
```
frontend/
├── src/
│   ├── api/              # API service calls
│   ├── components/       # Reusable UI components
│   ├── pages/            # Main application pages
│   ├── layouts/          # Layout components (e.g., Sidebar, Navbar)
│   ├── hooks/            # Custom React hooks
│   ├── services/         # Axios instance with interceptors
│   ├── routes/           # React Router configuration
│   └── contexts/         # React Context for global state (e.g., AuthContext)
```

### Pages
-   Login
-   Register
-   Dashboard
-   Trucks
-   Drivers
-   Trips
-   Maintenance
-   Notifications

### Technical Details
-   **Responsive Design**: Adapts to various screen sizes.
-   **Sidebar Navigation**: For main application routes.
-   **Top Navbar**: Contains user info and logout.
-   **Dashboard Cards**: For displaying key metrics.
-   **Data Tables**: For listing trucks, drivers, trips, etc.
-   **Forms with Validation**: For data input.
-   **Protected Routes**: Ensures only authenticated users can access certain pages.
-   **JWT Token Handling**: Stores and refreshes tokens.
-   **API Integration**: Uses Axios and React Query for data fetching.
-   **Loading States**: User feedback during data loading.
-   **Error Handling**: Displays error messages.
-   **Real-time Updates**: WebSockets for live data (e.g., truck tracking).

## Database Design

Key relationships:
-   One driver can be assigned to one truck.
-   One truck can have many trips.
-   Trips belong to a truck and a driver.
-   Maintenance records belong to trucks.
-   Notifications belong to users.

## UI/UX Style

-   **Style**: Modern fleet management dashboard, minimal, clean, dark/light mode ready (though dark mode not fully implemented in MVP), professional logistics company appearance.
-   **Components**: Tailwind CSS, card layouts, charts placeholders, status badges, responsive tables.

## Deliverables

1.  Complete backend code (Django, DRF, Channels, Celery).
2.  Complete frontend code (React, Vite, Tailwind CSS).
3.  API endpoints for all core features.
4.  Database models with proper relationships.
5.  JWT Authentication system with user roles.
6.  WebSocket implementation for real-time tracking.
7.  Docker configuration for all services.
8.  Environment variable examples (`.env.example`).
9.  Setup instructions.
10. Detailed folder structure.
11. Comprehensive `README.md`.

## Setup Instructions

### Prerequisites
-   Docker and Docker Compose installed.

### 1. Clone the repository
```bash
git clone <repository_url>
cd cranetrack
```

### 2. Environment Variables
Create a `.env` file in the root directory of the project based on `.env.example`:

```dotenv
SECRET_KEY=your_django_secret_key_here
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost

DB_NAME=cranetrack_db
DB_USER=cranetrack_user
DB_PASSWORD=cranetrack_password

VITE_API_URL=http://localhost:8000/api
```

**Note**: Replace `your_django_secret_key_here` with a strong, unique secret key.

### 3. Run with Docker Compose
From the root directory of the project, run:

```bash
docker-compose up --build
```

This will:
-   Build Docker images for the backend and frontend.
-   Start PostgreSQL, Redis, Django backend, and React frontend services.

### 4. Backend Setup (inside the backend container)
Once the containers are running, you need to run migrations and create a superuser for Django.

First, access the backend container shell:
```bash
docker-compose exec backend bash
```

Then, run the following commands:
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```
Follow the prompts to create an admin user.

### 5. Access the Application
-   **Backend API (Swagger UI)**: `http://localhost:8000/api/schema/swagger-ui/`
-   **Frontend**: `http://localhost:5173`

## Important Notes

-   **Clean and Commented Code**: All code adheres to best practices and is well-commented for readability.
-   **Scalability**: The architecture is designed to be scalable, allowing for easy addition of new features and services.
-   **Simplicity**: The MVP focuses on core functionality, avoiding unnecessary complexity.
-   **Reusable Components**: Frontend components are designed for reusability.
-   **Professional Naming Conventions**: Consistent and clear naming throughout the codebase.

## API Endpoints (Overview)

Detailed API documentation is available via Swagger UI at `http://localhost:8000/api/schema/swagger-ui/`.

### Authentication
-   `POST /api/auth/login/`: Obtain JWT tokens.
-   `POST /api/auth/refresh/`: Refresh JWT access token.
-   `POST /api/auth/register/`: Register a new user.
-   `GET /api/auth/me/`: Get/update current user details.

### Trucks
-   `GET /api/trucks/`: List all trucks.
-   `POST /api/trucks/`: Create a new truck.
-   `GET /api/trucks/{id}/`: Retrieve a truck by ID.
-   `PATCH /api/trucks/{id}/`: Update a truck by ID.
-   `DELETE /api/trucks/{id}/`: Delete a truck by ID.

### Drivers
-   `GET /api/drivers/`: List all drivers.
-   `POST /api/drivers/`: Create a new driver.
-   `GET /api/drivers/{id}/`: Retrieve a driver by ID.
-   `PATCH /api/drivers/{id}/`: Update a driver by ID.
-   `DELETE /api/drivers/{id}/`: Delete a driver by ID.

### Trips
-   `GET /api/trips/`: List all trips.
-   `POST /api/trips/`: Create a new trip.
-   `GET /api/trips/{id}/`: Retrieve a trip by ID.
-   `PATCH /api/trips/{id}/`: Update a trip by ID.
-   `DELETE /api/trips/{id}/`: Delete a trip by ID.

### Maintenance
-   `GET /api/maintenance/`: List all maintenance records.
-   `POST /api/maintenance/`: Create a new maintenance record.
-   `GET /api/maintenance/{id}/`: Retrieve a maintenance record by ID.
-   `PATCH /api/maintenance/{id}/`: Update a maintenance record by ID.
-   `DELETE /api/maintenance/{id}/`: Delete a maintenance record by ID.

### Notifications
-   `GET /api/notifications/`: List all notifications for the authenticated user.
-   `GET /api/notifications/{id}/`: Retrieve a notification by ID.
-   `PATCH /api/notifications/{id}/`: Mark a notification as read.

## WebSocket Implementation

-   **Endpoint**: `ws://localhost:8000/ws/tracking/`
-   **Purpose**: Real-time updates for truck locations.
-   **Technology**: Django Channels with Redis as the channel layer.
-   **Consumer**: `TruckTrackingConsumer` handles WebSocket connections and message broadcasting.

## Folder Structure

```
.env.example
docker-compose.yml
README.md
backend/
├── apps/
│   ├── accounts/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── trucks/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── consumers.py
│   │   ├── models.py
│   │   ├── routing.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── drivers/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── maintenance/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── notifications/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   └── trips/
│       ├── __init__.py
│       ├── admin.py
│       ├── apps.py
│       ├── models.py
│       ├── serializers.py
│       ├── urls.py
│       └── views.py
├── config/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── Dockerfile
├── manage.py
└── requirements.txt
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── api/
│   │   ├── auth.js
│   │   ├── drivers.js
│   │   ├── maintenance.js
│   │   ├── notifications.js
│   │   ├── trucks.js
│   │   └── trips.js
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Drivers.jsx
│   │   ├── Login.jsx
│   │   ├── Maintenance.jsx
│   │   ├── Notifications.jsx
│   │   ├── Register.jsx
│   │   ├── Trips.jsx
│   │   └── Trucks.jsx
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   ├── services/
│   │   └── axiosInstance.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── Dockerfile
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```
