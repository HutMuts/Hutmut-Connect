# Hutmuts

## Overview

Hutmuts is a two-sided property rental marketplace that connects renters to hidden properties found by local "Scouts" who photograph physical "For Rent" signs. The platform bridges the gap between private landlords and renters, digitizing offline rental listings that never make it to traditional platforms.

The current implementation is a waitlist landing page with persona-based content switching (Renter vs Landlord views), designed with a trust-first, dark premium aesthetic inspired by Airbnb and Linear.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **Component Library**: shadcn/ui (Radix UI primitives with custom styling)
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom plugins for Replit integration

The frontend follows a component-based architecture with:
- Pages in `client/src/pages/`
- Reusable UI components in `client/src/components/ui/`
- Custom hooks in `client/src/hooks/`
- Utility functions in `client/src/lib/`

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Style**: REST endpoints under `/api/` prefix
- **Development**: Vite dev server with HMR proxied through Express

The server provides:
- Static file serving for production builds
- API routes for waitlist management
- Middleware for JSON parsing and request logging

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Migrations**: Drizzle Kit with push-based migrations

Current database tables:
- `users`: Basic user authentication (id, username, password)
- `waitlist`: Waitlist signups (id, name, email, userType, createdAt)

### Shared Code Pattern
The `shared/` directory contains code used by both frontend and backend:
- Database schema definitions
- Type exports
- Validation schemas

Path aliases configured:
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`

### Design System
The project uses a dark theme with emerald green accents:
- Primary Dark: #0f172a (Dark Navy)
- Accent: #10b981 (Emerald Green)
- Typography: Inter font family
- Custom CSS variables in `client/src/index.css`

## External Dependencies

### Database
- **PostgreSQL**: Primary database accessed via `DATABASE_URL` environment variable
- **Connection**: pg Pool with Drizzle ORM wrapper

### Third-Party Libraries
- **UI Components**: Radix UI primitives (dialogs, forms, menus, etc.)
- **Charts**: Recharts for data visualization
- **Carousel**: Embla Carousel
- **Date Handling**: date-fns

### Build & Development
- **Bundler**: Vite (frontend), esbuild (backend production build)
- **Type Checking**: TypeScript with strict mode
- **CSS Processing**: PostCSS with Tailwind and Autoprefixer

### Environment Requirements
- `DATABASE_URL`: PostgreSQL connection string (required)
- Node.js with ESM support