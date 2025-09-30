# Star Wars Application

A full-stack Star Wars application built with React and Laravel, featuring clean architecture, modern development practices, and Docker containerization.

## 🏗️ Architecture Overview

This is a **monorepo** containing both client and server applications that work together to provide a comprehensive Star Wars data browsing experience.

### Project Structure

```
├── client/          # React frontend application
├── server/          # Laravel backend API
├── docker-compose.yml
└── README.md
```

## 🖥️ Client Side (React + Vite)

### Features

- **React 19** with **Vite** for fast development and building
- **TypeScript** for type safety
- **Clean Architecture** implementation with clear separation of concerns
- **Atomic Design** methodology for component organization
- **Design System** with design tokens
- **Comprehensive Unit Testing**

### Architecture

#### Clean Architecture Layers

```
src/
├── domain/           # Business logic & entities
│   ├── entities/     # Core business models (Film, People)
│   └── usecases/     # Business use cases interfaces
├── data/             # Data access layer
│   └── usecases/     # API implementation of use cases
├── presentation/     # UI layer
│   ├── pages/        # Application pages
│   └── themes/       # Design tokens & themes
└── components/       # Reusable UI components
```

#### Atomic Design Structure

```
components/
├── common/           # Atoms & Molecules
│   ├── button/       # Button atom
│   ├── card/         # Card molecule
│   ├── input/        # Input atom
│   └── radio/        # Radio atom
└── template/         # Organisms & Templates
    └── topbar/       # Topbar organism
```

#### Design Tokens

The application uses a centralized design system with tokens for:

- **Colors**: Primary, neutral, disabled states
- **Spacing**: Consistent spacing scale (xsmall, small, medium, large)
- **Breakpoints**: Responsive design breakpoints

### Tech Stack

- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **TypeScript 5.8** - Type safety
- **Styled Components 6** - CSS-in-JS styling
- **React Router 7** - Client-side routing
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities

### Testing

- **Unit Tests** for components, use cases, and business logic
- **Test Coverage** for critical application paths
- **Jest DOM** matchers for enhanced testing
- **Mocking** strategies for external dependencies

## 🔧 Server Side (Laravel 12)

### Features

- **Laravel 12** with modern PHP 8.2
- **MVC Pattern** with clear separation of concerns
- **Service Layer** to decouple business logic from controllers
- **Queue System** with Redis for background processing
- **Event-Driven Architecture** for statistics tracking
- **Comprehensive Unit Testing**

### Architecture

#### MVC + Service Layer

```
app/
├── Http/
│   ├── Controllers/     # API endpoints
│   └── Requests/        # Request validation
├── Services/           # Business logic layer
├── Models/             # Eloquent models
├── Jobs/               # Queue jobs
├── Events/             # Domain events
├── Listeners/          # Event handlers
└── Helpers/            # Utility classes
```

### API Endpoints

#### SWAPI Proxy Endpoints

```
GET /swapi/people              # Get all people
GET /swapi/people/{id}         # Get single person
GET /swapi/films               # Get all films
GET /swapi/films/{id}          # Get single film
GET /swapi/planets             # Get all planets
```

#### Statistics Endpoints

```
GET /statistics/top-queries           # Get API usage statistics
GET /statistics/trigger-computation   # Trigger statistics computation manually
```

### Cache Layer

The application implements a **Redis-based caching layer** to optimize API performance:

#### Cache Implementation

- **Cache Store**: Redis for high-performance data storage
- **Cache TTL**: 3600 seconds (1 hour) for SWAPI data
- **Cache Keys**: Structured naming for easy management
- **Cache Helper**: Centralized cache management utility

#### Cache Benefits

- **Performance**: Dramatically reduced response times
- **API Limits**: Reduces external SWAPI API calls
- **Reliability**: Serves cached data when external API is down
- **Scalability**: Handles high traffic with minimal external requests

### Key Features

- **Redis Caching** - High-performance API response caching layer
- **Queue System** - Background processing for statistics
- **Event System** - Decoupled statistics tracking
- **Service Layer** - Clean separation of business logic
- **API Validation** - Request validation and sanitization

### Tech Stack

- **Laravel 12** - PHP framework
- **PHP 8.2** - Modern PHP features
- **Redis** - Caching and queue backend
- **SQLite** - Lightweight database
- **PHPUnit** - Unit testing framework
- **Laravel Pint** - Code style fixer

## 🐳 Docker Setup

The application is fully containerized with Docker Compose for easy development and deployment.

### Services

- **app** (Laravel server) - Port 8000
- **client** (React app) - Port 5173
- **redis** (Cache & Queue) - Port 6379

### Container Configuration

- **Node.js 22.14.0** (matches .nvmrc)
- **PHP 8.2-FPM** with Redis extension
- **Redis Alpine** for lightweight caching
- **Hot-reload** enabled for both client and server

## 🚀 Getting Started

### Prerequisites

- Docker and Docker Compose
- Git

### Local Development with Docker

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd start-wars-app
   ```

2. **Run the application**

   ```bash
   docker-compose up --build
   ```

   This single command will:

   - Build and start the Laravel server on `http://localhost:8000`
   - Build and start the React client on `http://localhost:5173`
   - Start Redis for caching and queues
   - Enable hot-reload for both applications

3. **Access the applications**
   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:8000
   - **API Endpoints**: http://localhost:8000/swapi/\*

### Environment Variables

The Docker setup automatically configures:

#### Server Environment

- `CACHE_STORE=redis`
- `REDIS_HOST=redis`
- `QUEUE_CONNECTION=redis`
- `SWAPI_EXTERNAL_API_URL=https://swapi.dev/api`
- `SWAPI_CACHE_TTL=3600`

#### Client Environment

- `VITE_API_BASE_URL=http://localhost:8000/swapi`

## 🧪 Testing

### Client Testing

```bash
# Run tests
docker-compose exec client npm test

# Run tests with UI
docker-compose exec client npm run test:ui

# Run tests once
docker-compose exec client npm run test:run
```

### Server Testing

```bash
# Run PHP tests
docker-compose exec app php artisan test

# Run specific test
docker-compose exec app vendor/bin/phpunit tests/Unit/SwapiServiceTest.php
```

### Queue Processing

The application includes background job processing:

- Statistics computation runs in background
- Event-driven architecture for API usage tracking
- Redis-backed queue system
