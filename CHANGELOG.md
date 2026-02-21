# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [Final Production Polish] - February 21, 2026

### Fixed
- **Double-Prefix 404 Errors** (6 files)
  - Removed hardcoded `/api/v1/` from all API calls
  - AIChatBot: `/api/v1/ai/chat` → `/ai/chat`
  - PublicFeed: `/api/v1/tweet/allTweets` → `/tweet/allTweets`
  - Profile: `/api/v1/user/...` → `/user/...`
  - Tweet: `/api/v1/tweet/...` → `/tweet/...`
  - Tweet: `/api/v1/user/bookmark` → `/user/bookmark`

- **Backend CORS** (`backend/src/app.js`)
  - Verified credentials: true is set
  - Origins include localhost:5173 and Vercel URL

- **Cookie Settings** (`backend/controllers/user.controller.js`)
  - Verified consistency across Login, Register, Logout

### Files Modified
1. `frontend/src/components/AIChatBot.jsx`
2. `frontend/src/components/PublicFeed.jsx`
3. `frontend/src/components/Profile.jsx`
4. `frontend/src/components/Tweet.jsx`

## [Routing Hotfix] - February 21, 2026

### Fixed
- **Body.jsx Layout Route** (`frontend/src/components/Body.jsx`)
  - Changed to pathless layout route pattern
  - `<Route element={<Home />}>` wraps all authenticated routes
  - `/home` now correctly renders Feed component
  - Resolves blank /home page issue

- **LeftSidebar Navigation** (`frontend/src/components/LeftSidebar.jsx`)
  - Changed Home link from `/` to `/home`

### Files Modified
1. `frontend/src/components/Body.jsx`
2. `frontend/src/components/LeftSidebar.jsx`

## [Final Polish: API Path Standardization] - February 21, 2026

### Fixed
- **API Path Conflict** (`frontend/src/utils/constant.js`)
  - Simplified to use relative paths only (`/user`, `/tweet`)
  - Removed duplicate getBaseURL() logic
  - Single source of truth now: `axios.js`

- **Component API Calls** (`frontend/src/components/LeftSidebar.jsx`, `Profile.jsx`)
  - Removed USER_API_END_POINT imports
  - Changed to relative paths: `/user/logout`

- **App Hydration** (`frontend/src/App.jsx`)
  - Added explicit 401 error handling in hydrateUser
  - Ensures loading state resolves even on auth failure

### Files Modified
1. `frontend/src/utils/constant.js`
2. `frontend/src/components/LeftSidebar.jsx`
3. `frontend/src/components/Profile.jsx`
4. `frontend/src/App.jsx`

## [System Audit & Authentication Hotfix] - February 21, 2026, 10:00 PM IST

### Fixed
- **Environment Configuration** (`frontend/.env.development`)
  - Added `/api/v1` suffix to VITE_API_URL
  - Fixes 404 errors on localhost

- **Cookie Settings** (`backend/controllers/user.controller.js`)
  - Made `secure` and `sameSite` conditional based on NODE_ENV
  - Development (localhost): `secure: false, sameSite: 'lax'`
  - Production: `secure: true, sameSite: 'none'`
  - Fixes cookie not being set on localhost

- **Authentication Middleware** (`backend/config/auth.js`)
  - Removed extraneous backtick on line 26

- **API Instance Refactor** (6 frontend files)
  - Changed from raw axios to centralized API instance
  - Ensures consistent baseURL and credentials across app

### Files Modified
1. `frontend/.env.development`
2. `backend/controllers/user.controller.js`
3. `backend/config/auth.js`
4. `frontend/src/App.jsx`
5. `frontend/src/components/EditProfile.jsx`
6. `frontend/src/hooks/useGetProfile.js`
7. `frontend/src/hooks/useOtherUsers.js`
8. `frontend/src/hooks/useGetTweets.js`
9. `frontend/src/components/RightSideBar.jsx`
10. `frontend/src/components/CreatePost.jsx`

## [Fix: Localhost API Routing] - February 21, 2026, 3:40 PM UTC

### Fixed
- **Axios BaseURL Logic** (`frontend/src/api/axios.js`)
  - Added explicit localhost detection using `window.location.hostname`
  - Localhost now points to `http://localhost:8080/api/v1` (backend port)
  - Prevents browser from incorrectly routing to frontend port (5173)
  - Maintains Vercel proxy fallback (`/api/v1`) for production
  - Resolves 404 errors: `/user/login` and `/user/register` on localhost

### Technical Details
- Development (localhost): Uses full URL to backend port 8080
- Production (Vercel): Uses relative path, proxied via vercel.json rewrites
- Custom deployments: Uses VITE_API_URL environment variable if set
- Three-tier fallback ensures correct routing in all environments

### Files Modified
1. `frontend/src/api/axios.js` - Updated getBaseURL() function logic

## [Landing Page & Public Feed] - February 21, 2026, 3:21 PM UTC

### Added
- **LandingPage Component** (`frontend/src/components/LandingPage.jsx`)
  - Hero section with headline "Your voice, amplified."
  - Features showcase (Beautiful Design, AI Assistant, Lightning Fast)
  - Preview section with sample tweets
  - Call-to-action buttons: "Get Started" and "Explore Feed"
  - Footer with login/signup links
  - Redirects logged-in users to /home automatically

- **PublicFeed Component** (`frontend/src/components/PublicFeed.jsx`)
  - Public tweet viewing without authentication
  - Banner prompting users to sign up for interactions
  - Reuses existing Tweet component with readOnly prop
  - Loading and empty states
  - Smart redirect: logged-in users see "Go to Home" button

### Changed
- **Tweet Component** (`frontend/src/components/Tweet.jsx`)
  - Added readOnly prop (default: false)
  - Conditionally hides interaction buttons (Like, Bookmark, Delete) when readOnly is true
  - Maintains full functionality when readOnly is false (existing behavior)

- **Routing** (`frontend/src/App.jsx`)
  - Root route (/) now shows LandingPage instead of Login
  - Added /login route for Login component
  - Added /explore route for PublicFeed component
  - All protected routes (/home, /profile, /bookmarks) remain unchanged

- **Authentication Flow** (`frontend/src/components/Login.jsx`)
  - Post-login redirect changed from / to /home
  - Post-signup redirect changed from / to /home

- **Backend API** (`backend/routes/tweet.routes.js`)
  - GET /api/v1/tweet/allTweets endpoint is now public (removed isAuthenticated middleware)
  - Allows PublicFeed to fetch tweets without JWT token
  - All other endpoints remain protected

- **Home Component** (`frontend/src/components/Home.jsx`)
  - Added auth guard: redirects to /login if user is not authenticated
  - Prevents unauthorized access to protected home feed

### Technical Details
- No environment variables modified
- No database models changed
- No API response structures modified
- All existing features (like, bookmark, follow, tweet creation) remain fully functional
- Dark theme styling maintained throughout new components
- Mobile-responsive design using Tailwind breakpoints

### Files Modified
1. `frontend/src/App.jsx` - Routing updates
2. `frontend/src/components/Tweet.jsx` - Added readOnly prop
3. `frontend/src/components/Login.jsx` - Redirect fix
4. `frontend/src/components/Home.jsx` - Auth guard
5. `backend/routes/tweet.routes.js` - Public endpoint

### Files Created
1. `frontend/src/components/LandingPage.jsx` - New landing page
2. `frontend/src/components/PublicFeed.jsx` - New public feed

### Migration Notes
- Existing users: No impact, login flow works as before
- New users: See landing page first, can explore before signing up
- All existing authentication, authorization, and features remain intact
- Tweet component backwards compatible (readOnly defaults to false)

---

### Added
- Global theme support (works before/after login, on refresh, across all routes)
- Theme toggle in Login/Signup pages (top-right corner)
- Theme option in Desktop Sidebar (above Logout)
- Theme option in Mobile Nav (before Logout)
- Smooth theme transitions with transition-colors

### Removed
- Floating theme toggle button (bottom-right)

### Fixed
- Login/Signup pages now support both light and dark themes
- MobileNav now supports light and dark themes
- Theme now persists correctly with system preference fallback
- Hydration flicker prevented with proper theme initialization
- Backend refactoring: Updated import paths for new directory structure
  - `src/app.js`: Fixed route imports from `./routes/` to `../routes/`
  - `src/server.js`: Fixed app and database imports from `./` to `../`
  - `controllers/user.controller.js`: Fixed model imports from `userSchema.js/tweetSchema.js` to `user.model.js/tweet.model.js`
  - `controllers/tweet.controller.js`: Fixed model imports to `.model.js` extension
  - `routes/user.routes.js`: Fixed controller import from `userController.js` to `user.controller.js`
  - `routes/tweet.routes.js`: Fixed controller import from `tweetController.js` to `tweet.controller.js`
  - `package.json`: Updated start/dev scripts to point to `src/server.js` instead of `index.js`
- CopilotKit completely removed from the project:
  - Uninstalled `@copilotkit/react-ui` and `@copilotkit/react-core` npm packages
  - Deleted `CopilotHelper.jsx` component
  - Removed CopilotKit provider from `main.jsx`
  - Removed AI modal from `Home.jsx` (including `aiOpen` state and related effects)
  - Removed Echo AI button from `LeftSidebar.jsx`
  - Removed elevated AI button from `MobileNav.jsx`
  - Removed CopilotKit content path from `tailwind.config.js`
- API base URL fallback: Added robust getBaseURL() function to constant.js
  - Handles undefined/null/empty string cases to prevent "undefined/api/v1" URLs
  - Ensures Vercel proxy rewrites work correctly

### Verified
- Server startup: PORT correctly defaults to 8080 (from `process.env.PORT || 8080`)
- Database connection: Path correctly points to `../config/database.js`
- API base URL compatibility: Frontend `.env` configured for `http://localhost:8080/api/v1`
- CORS configuration: Allows `localhost:5173` and environment `FRONTEND_URL`

### Notes
- Old `index.js` file remains in place (commented out) for reference - can be removed after verification
- Backend entry point is now `src/server.js`

---

**Date:** Tue Feb 17 2026 00:00:00 UTC
