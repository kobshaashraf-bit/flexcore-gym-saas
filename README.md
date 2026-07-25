# FlexCore — Premium Gym Management SaaS

A commercial-grade gym management dashboard built with React 19, Vite, TypeScript,
Tailwind CSS, shadcn/ui-style components, Firebase Auth + Firestore, React Hook Form,
Zod, Framer Motion, TanStack Query, and Recharts.

## What's included in this milestone

- **Authentication**: Email/password Login, Register (with role selection), and Forgot
  Password flows, backed by Firebase Authentication. Validation via React Hook Form + Zod.
- **Role-based access**: `admin`, `receptionist`, `trainer` roles are stored in Firestore
  (`users/{uid}`) and enforced with a `RoleGuard` component (Payments/Reports/Settings are
  admin/receptionist-restricted as an example).
- **Protected routes**: `ProtectedRoute` redirects unauthenticated users to `/login` and
  preserves the intended destination.
- **App shell**: responsive collapsible sidebar (desktop) + slide-over sheet (mobile),
  top navbar with global search, breadcrumbs, notification bell, theme switcher, and
  user profile dropdown, plus a footer.
- **Dashboard**: stat cards, revenue area chart, weekly attendance bar chart, recent
  members, recent payments table, quick actions, upcoming membership expiry, and an
  activity timeline — all built on reusable, typed components with mock data.
- **Design system**: Orange + white/black premium theme with light & dark mode, glass
  surfaces, gradients, soft shadows, and Framer Motion micro-interactions.

Every other sidebar destination (Clients, Membership Plans, Attendance, Payments,
Trainers, Classes, Reports, Notifications, Settings, Profile) is routed and renders a
branded "coming soon" placeholder — ready to be built out in the next milestone.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Firebase project credentials
npm run dev
```

### Firebase setup

1. Create a project at https://console.firebase.google.com.
2. Enable **Authentication → Email/Password**.
3. Enable **Firestore Database** (start in production mode) and create a `users`
   collection — documents are created automatically on registration with this shape:

   ```ts
   {
     uid: string;
     name: string;
     email: string;
     role: "admin" | "receptionist" | "trainer";
     gymName: string;
     createdAt: Timestamp;
   }
   ```

4. Copy your web app config into `.env.local` using the keys in `.env.example`.

Suggested starter Firestore rules (tighten before production):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Folder structure

```
src/
  components/
    ui/          shadcn-style primitives (button, input, card, dropdown, sheet, ...)
    layout/      app shell (sidebar, navbar, footer, breadcrumbs, notifications, ...)
    auth/        ProtectedRoute, RoleGuard
    dashboard/   dashboard widgets (charts, stat cards, timelines, ...)
  contexts/      AuthContext (Firebase), ThemeContext (light/dark)
  hooks/         useAuth, useTheme, useMediaQuery
  pages/         route-level screens (dashboard + placeholder modules + auth pages)
  routes/        React Router route tree
  schemas/       Zod validation schemas
  lib/           firebase.ts, queryClient.ts, utils.ts
  data/          mock data powering the dashboard until Firestore collections exist
  types/         shared TypeScript domain types
```

## Notes

- This sandbox environment has no outbound network access, so `npm install` could not
  be run here — run it locally after downloading the project.
- Charts and dashboard lists currently read from `src/data/mockData.ts`. Swapping to
  live Firestore data is a drop-in replacement: build TanStack Query hooks (e.g.
  `useMembersQuery`) that call Firestore and feed the same components.
