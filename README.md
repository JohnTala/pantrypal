# PantryPal

PantryPal is a web application designed to help individuals and families manage their pantry inventory, track food expiration dates, and reduce food waste through timely reminders.

The application provides a simple, user-friendly interface where users can securely manage their pantry items, search and filter their inventory, monitor expiration dates, and view important pantry information from a centralized dashboard.

##  Team Members

* Miracle Lawrence
* ArchFord Nhanga
* Saidi Talatala

##  Project Purpose

PantryPal addresses the common problem of forgetting what food is available at home and when it will expire.

The application is intended for individuals and households who want an organized way to manage pantry inventory and reduce unnecessary food waste.

##  Core Features

* User registration and login
* Secure authentication using Auth.js v5
* Add new pantry items
* Edit existing pantry items
* Delete pantry items
* Track food expiration dates
* Expiration reminders
* Search pantry items
* Filter pantry items by category
* Pagination for pantry items
* Dashboard with pantry statistics
* Recently added pantry items
* Items expiring soon
* Responsive navigation
* Responsive design for desktop and mobile devices
* User profile page
* Custom loading and not-found pages

##  Technologies Used

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* Auth.js v5
* MongoDB
* Mongoose
* Next.js App Router
* Next.js Route Handlers
* Vercel

##  Application Architecture

PantryPal uses the Next.js App Router architecture.

The application includes:

* Server Components for database-backed pages
* Client Components for interactive UI
* Server Actions for server-side operations
* API Route Handlers for CRUD operations
* MongoDB/Mongoose for persistent data
* Auth.js v5 for authentication
* Reusable TypeScript components

### Database Flow

A typical pantry operation follows this structure:

```text
Client Component
      ↓
Next.js Route Handler
      ↓
Authentication Check
      ↓
MongoDB / Mongoose
      ↓
Response
      ↓
Updated UI
```

For example, deleting a pantry item uses:

```text
DeleteDialog
      ↓
DELETE /api/pantry/[id]
      ↓
Auth.js session verification
      ↓
MongoDB
      ↓
Delete item belonging to logged-in user
      ↓
Success response
      ↓
Pantry page refresh
```

##  Main Application Views

PantryPal includes several meaningful views with dynamic data:

### Home

Introduces PantryPal, explains its purpose, and highlights the main features.

### Dashboard

Provides an overview of the user's pantry, including statistics, recently added items, and items approaching their expiration dates.

### Pantry

Allows authenticated users to:

* View pantry items
* Search items
* Filter items by category
* Add items
* Edit items
* Delete items
* Navigate through paginated results

### Reminders

Displays pantry items that are approaching their expiration dates.

### Profile

Provides access to the authenticated user's profile information.

##  Authentication

PantryPal uses **Auth.js v5** for authentication.

Users can:

1. Register an account.
2. Log in using their credentials.
3. Access protected application routes.
4. Manage their pantry items.
5. Log out securely.

Protected routes include:

```text
/dashboard
/pantry
/profile
/reminders
```

Users who are not authenticated are redirected to the login page.

##  Demo Access

A demo account is available for testing the deployed application.

**Demo email:**

```text
amaru123@gmail.uk
```

**Demo password:**

```text
Muka1234!
```

### Testing the Application

1. Open the deployed PantryPal application.
2. Select **Login**.
3. Enter the demo credentials.
4. Open the **Dashboard**.
5. Navigate to **Pantry**.
6. Add a pantry item.
7. Edit the pantry item.
8. Search or filter pantry items.
9. Delete an item.
10. Check the **Reminders** page for expiring items.
11. Test the logout functionality.

##  Deployment

### Production Application

https://pantrypal-igyd6xprh-w-dd-430.vercel.app/

### GitHub Repository

https://github.com/JohnTala/pantrypa

The application is deployed using Vercel.

##  Getting Started

### Prerequisites

Before running PantryPal locally, make sure you have:

* Node.js installed
* npm installed
* MongoDB database
* Git installed

### Clone the Repository

```bash
git clone https://github.com/JohnTala/pantrypal.git
```

Navigate into the project:

```bash
cd pantrypal
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root of the project.

Add the required environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
AUTH_SECRET=your_auth_secret
```

Do not commit `.env.local` or database credentials to GitHub.

### Run the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Production Build

To verify that the application builds successfully:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

##  API Routes

PantryPal uses Next.js Route Handlers for pantry operations.

### Pantry API

```text
/api/pantry
```

Used for pantry item operations such as creating and retrieving pantry items.

### Individual Pantry Item API

```text
/api/pantry/[id]
```

Supported operations include:

```text
PUT
DELETE
```

The API verifies the authenticated user's session before modifying pantry data.

Each pantry item is associated with the user who created it to prevent users from modifying another user's data.

##  Project Structure

```text
app/
├── api/
│   ├── auth/
│   └── pantry/
├── dashboard/
├── login/
├── pantry/
│   ├── [id]/
│   │   └── edit/
│   ├── new/
│   └── search/
├── profile/
├── register/
├── reminders/
├── layout.tsx
├── loading.tsx
├── not-found.tsx
└── page.tsx

components/
├── auth/
├── dashboard/
├── layout/
├── pantry/
├── providers/
├── reminders/
└── ui/

lib/
├── actions.ts
├── mongodb.ts
├── pantry.ts
└── password.ts

models/
├── PantryItem.ts
└── User.ts

auth.ts
auth.config.ts
proxy.ts
```

##  Design and User Experience

PantryPal uses a consistent green-based visual identity to communicate freshness, food management, and sustainability.

The interface includes:

* Consistent colors and typography
* Responsive layouts
* Reusable buttons and form components
* Clear navigation
* Empty states
* Loading states
* Error handling
* Confirmation dialogs for destructive actions
* Mobile-friendly layouts
* Accessible form controls and navigation

##  Lighthouse Results

The application's Lighthouse mobile audit produced the following results:

| Category       |   Score |
| -------------- | ------: |
| Performance    |  **91** |
| Accessibility  |  **95** |
| Best Practices | **100** |
| SEO            |  **60** |

### Lighthouse Summary

The strongest category is **Best Practices**, with a score of **100**, demonstrating strong adherence to modern web development practices.

The weakest category is **SEO**, with a score of **60**, leaving opportunities to improve metadata, discoverability, and other search-engine optimization techniques.

##  Accessibility

PantryPal was reviewed using Lighthouse accessibility testing.

The application achieved an **Accessibility score of 95**.

The interface uses:

* Semantic HTML
* Accessible form labels
* Clear button text
* Keyboard-friendly controls
* Visible focus states
* Responsive layouts
* Appropriate text/background contrast

The application should continue to be tested against WCAG AA requirements as new features are added.

##  Known Issues and Future Opportunities

Potential improvements for future versions include:

* Improve SEO metadata and structured data.
* Add more advanced pantry analytics.
* Add notification/email reminders.
* Add sorting options for pantry items.
* Add more detailed user profile management.
* Improve dashboard visualizations.
* Add administrator functionality for system-level monitoring.
* Add automated testing for additional API routes.
* Improve performance by reducing unnecessary client-side requests.
* Add more comprehensive accessibility testing.

## Learning Resources

This project was developed using the Next.js App Router and related technologies.

* [Next.js Documentation](https://nextjs.org/docs)
* [Next.js Learn](https://nextjs.org/learn)
* [Vercel Documentation](https://vercel.com/docs)
* [MongoDB Documentation](https://www.mongodb.com/docs/)
* [Auth.js Documentation](https://authjs.dev/)

##  License

This project was developed as an academic team project for BYU-Idaho.
