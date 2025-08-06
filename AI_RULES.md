# AI Development Rules

This document outlines the rules and conventions for the AI to follow when developing this application. The goal is to maintain a clean, consistent, and maintainable codebase.

## Tech Stack

This project is built with a modern, type-safe, and efficient technology stack:

*   **Framework**: React, built and served with Vite for a fast development experience.
*   **Language**: TypeScript for type safety and improved developer experience.
*   **UI Components**: A combination of custom components and shadcn/ui, which provides a set of high-quality, accessible components built on Radix UI.
*   **Styling**: Tailwind CSS is used exclusively for styling. All styles are applied via utility classes.
*   **Routing**: React Router (`react-router-dom`) for all client-side routing and navigation.
*   **Data Fetching & State**: React Query (`@tanstack/react-query`) is the standard for managing server state (API data). Simple component state is handled by React hooks (`useState`, `useReducer`).
*   **Forms**: React Hook Form (`react-hook-form`) is used for building forms, paired with Zod for robust schema validation.
*   **Icons**: `lucide-react` provides a comprehensive and consistent set of icons.
*   **Charts**: `recharts` is the designated library for all data visualizations and charts.
*   **Backend & Database**: Supabase is integrated for backend services, including database and authentication.

## Library Usage and Coding Conventions

To ensure consistency, the following rules must be strictly followed:

### 1. Component Strategy
*   **Primary UI**: Always prioritize using the pre-built components from `src/components/ui` (shadcn/ui).
*   **Custom Components**: If a new, specific component is needed, create it within the relevant feature directory (e.g., `src/components/dashboard/MyNewComponent.tsx`). Do not modify the base `src/components/ui` components directly.
*   **File Structure**: Place page components in `src/pages/` and shared or feature-specific components in `src/components/`.

### 2. Styling
*   **Tailwind CSS Only**: All styling must be done using Tailwind CSS utility classes. Do not write custom CSS in `.css` files or use inline `style` attributes.
*   **Conditional Classes**: Use the `cn` utility function (from `src/lib/utils.ts`) to merge and apply conditional classes.

### 3. State Management
*   **Server State**: Use React Query for all interactions with the Supabase backend (fetching, caching, mutations).
*   **Client State**:
    *   Use `useState` for simple, non-shared component state.
    *   For state shared between a few components, lift the state up to the nearest common ancestor.
    *   For app-wide state (like theme or sidebar status), create a custom hook in the `src/hooks/` directory. Do not introduce complex state management libraries like Redux unless explicitly requested and justified.

### 4. Forms & Validation
*   **Forms**: All forms must be built using `react-hook-form`.
*   **Validation**: All form validation schemas must be defined using `zod`.

### 5. Icons, Charts, and Notifications
*   **Icons**: Only use icons from the `lucide-react` library.
*   **Charts**: Only use `recharts` for creating charts.
*   **Notifications**: Use the `sonner` component for displaying toast notifications, as configured in `App.tsx`.

### 6. Backend
*   **Database**: All database and backend operations must go through the Supabase client, which is initialized in `src/integrations/supabase/client.ts`.
*   **Environment Variables**: Do not hardcode secrets or keys. Use Supabase's environment management.

By adhering to these rules, we ensure the project remains consistent, scalable, and easy to maintain.