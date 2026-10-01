# Shortly — URL Shortener

A full-stack URL shortening platform built with React and Node.js.

The project started as a simple URL shortener and gradually evolved into a production-oriented application with authentication, session management, analytics, QR codes, custom aliases, URL expiration, auditing, rate limiting, and a dashboard.

The goal was not only to make shortened URLs work, but to understand how a real-world web application is structured — from the frontend and API layer to authentication, database access, security, deployment, and production configuration.

---

## 🚀 Live Demo

### Frontend
🔗 https://url-shortener-frontend-two-phi.vercel.app

### Backend API
🔗 https://url-shortener-backend-1el4.onrender.com

### API Health Check
🔗 https://url-shortener-backend-1el4.onrender.com/api/v1/health

---

## 🚧 Project Status

This project is currently under active development.

The core URL-shortening platform is implemented and deployed, while development continues with performance improvements, testing, refinement, and additional production-level enhancements. New features and architectural improvements may be introduced as the project evolves.

---

## 🐛 Issues, Bugs & Feedback

Although the core features and workflows are implemented, this project is still under active development. If you encounter any issue, unexpected behavior, broken workflow, incorrect logic, or something that does not work as intended, please report it.

This includes, but is not limited to:

- Unexpected application behavior
- Broken or incomplete workflows
- Authentication or session issues
- Incorrect API responses
- UI/UX problems
- Data or analytics inconsistencies
- Performance issues
- Deployment-related problems
- Security concerns
- Any logic that appears to be incorrect
- Features that do not behave as expected

### How to Report an Issue

When reporting a problem, please include as much relevant information as possible:

1. **What you were trying to do**
2. **What you expected to happen**
3. **What actually happened**
4. **Steps to reproduce the issue**
5. **Relevant error message or API response**
6. **Browser/device information, if applicable**
7. **Screenshots or logs, if available**

---

## ✨ Features

### URL Management

* Create shortened URLs
* Automatically generate unique short codes
* Create custom aliases
* Prevent duplicate custom aliases
* Update existing URLs
* Delete URLs
* View URL details
* Enable/disable URL status
* Configure URL expiration
* Paginated URL listing
* Sort URLs by supported fields
* Redirect short URLs to their original destination

### Authentication & Security

* User registration
* User login
* Secure password hashing with bcrypt
* JWT-based authentication
* Short-lived access tokens
* Refresh tokens
* HTTP-only cookies
* Refresh-token rotation
* Session tracking
* Session revocation
* Logout from the current session
* Logout from all sessions
* Change password
* Profile management
* Protected routes
* Admin-protected routes
* Input validation with Zod
* Authentication rate limiting
* Global rate limiting
* CORS configuration
* Helmet security headers
* Request body-size limits
* URL protocol validation
* Custom alias protection
* Production environment validation

### Dashboard

The dashboard provides an overview of the user's URL activity, including:

* Total URLs
* Active URLs
* Click statistics
* Recent URLs
* Top-performing URLs
* Analytics information
* URL management shortcuts

Charts are rendered on the frontend using Recharts.

### Analytics

Each shortened URL can have click analytics.

The analytics system supports information such as:

* Total clicks
* Clicks over time
* Recent click activity
* Aggregated analytics
* Time-based analytics
* URL-specific analytics

The analytics structure is designed so additional click information can be incorporated as the tracking system grows.

### QR Codes

Users can generate QR codes for shortened URLs.

QR functionality includes:

* Create QR codes
* Retrieve QR codes
* Update QR codes
* Delete QR codes
* Connect QR codes with shortened URLs

### Audit Logging

Important application actions are recorded through the audit system.

The backend contains a dedicated audit module responsible for:

* Audit event definitions
* Audit constants
* Audit repository operations
* Audit service logic
* Recording important authentication and URL-related actions

### Sessions

The application maintains server-side session records for refresh-token management.

A session can contain information such as:

* User
* Refresh-token identifier
* Hashed refresh token
* IP address
* User agent
* Device information
* Expiration
* Revocation state

This allows refresh tokens to be rotated and sessions to be individually or globally revoked.

---

# 🏗️ Architecture

The current application uses a traditional full-stack architecture:

```text
                    ┌──────────────────────┐
                    │      React/Vite      │
                    │       Frontend       │
                    │       Vercel         │
                    └──────────┬───────────┘
                               │
                              HTTPS
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Express / Node.js │
                    │       Backend        │
                    │        Render        │
                    └──────────┬───────────┘
                               │
                             Prisma
                               │
                               ▼
                    ┌──────────────────────┐
                    │      MySQL / Aiven   │
                    │       Database       │
                    └──────────────────────┘
```

The backend follows a layered architecture:

```text
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Prisma
  ↓
MySQL
```

This separation keeps HTTP handling, business logic, database access, and infrastructure concerns from being mixed together.

---

# 🔄 How a Request Works

For example, when a user creates a shortened URL:

```text
React UI
   │
   │ POST /api/v1/urls
   ▼
API Route
   │
   ▼
Authentication Middleware
   │
   ▼
Validation Middleware
   │
   ▼
URL Controller
   │
   ▼
URL Service
   │
   ├── Validate URL
   ├── Validate custom alias
   ├── Generate short code
   ├── Process expiration
   └── Create URL
   │
   ▼
URL Repository
   │
   ▼
Prisma Client
   │
   ▼
MySQL
   │
   ▼
Repository
   │
   ▼
Service
   │
   ▼
Controller
   │
   ▼
JSON Response
   │
   ▼
React
```

The same general pattern is used throughout the backend.

---

# 🔐 Authentication Flow

Authentication is based on access and refresh tokens.

### Login

```text
User
 │
 │ email + password
 ▼
POST /api/v1/auth/login
 │
 ▼
Validate input
 │
 ▼
Find user
 │
 ▼
Compare password with bcrypt
 │
 ▼
Generate access token
 │
 ▼
Generate refresh token
 │
 ▼
Hash/store refresh-token session
 │
 ▼
Set HTTP-only cookies
 │
 ▼
Return authenticated user
```

The access token contains information such as:

```text
sub
role
type: access
```

The refresh token contains:

```text
sub
jti
type: refresh
```

Refresh tokens are stored in hashed form in the database and are rotated during refresh operations.

---

# 🍪 Cookie-Based Authentication

The application uses HTTP-only cookies for authentication.

The frontend API client is configured to send credentials with requests.

The backend enables credentialed CORS and validates the configured frontend origin.

This provides a safer authentication flow than exposing authentication tokens directly to normal frontend JavaScript storage.

---

# 🔄 Refresh Token Flow

When an access token expires, the frontend can request:

```text
POST /api/v1/auth/refresh-token
```

The backend:

1. Reads the refresh token.
2. Verifies the JWT.
3. Validates the token type.
4. Finds the corresponding session.
5. Checks whether the session has been revoked.
6. Checks expiration.
7. Compares the refresh token against its stored hash.
8. Rotates the refresh token.
9. Creates a new access token.
10. Updates the session.

This provides session-based refresh-token management rather than treating refresh tokens as completely stateless credentials.

---

# 🗂️ Backend Folder Structure

The backend is organized by responsibility and domain.

```text
backend/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   │
│   ├── common/
│   │   ├── audit/
│   │   │   ├── audit.constants.js
│   │   │   ├── audit.repository.js
│   │   │   ├── audit.service.js
│   │   │   └── index.js
│   │   │
│   │   └── request/
│   │       └── requestContext.js
│   │
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── cookie.config.js
│   │   ├── env.js
│   │   ├── logger.js
│   │   └── prisma.js
│   │
│   ├── middlewares/
│   │   ├── admin.middleware.js
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── notFound.middleware.js
│   │   ├── rateLimiter.middleware.js
│   │   └── validate.middleware.js
│   │
│   ├── modules/
│   │   ├── admin/
│   │   ├── analytics/
│   │   ├── auth/
│   │   ├── click/
│   │   ├── dashboard/
│   │   ├── health/
│   │   ├── qr/
│   │   └── urls/
│   │
│   ├── routes/
│   │   ├── redirect.routes.js
│   │   └── routes.js
│   │
│   ├── services/
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── prisma.config.ts
```

## Backend Responsibilities

### `common/`

Contains reusable application-level functionality that is shared between multiple modules.

The audit system lives here because auditing is not limited to a single feature.

### `config/`

Contains infrastructure and application configuration.

Examples include:

* Environment configuration
* Prisma configuration
* Cookies
* Cloudinary
* Logging

### `middlewares/`

Contains Express middleware responsible for cross-cutting concerns.

Examples:

* Authentication
* Authorization
* Validation
* Error handling
* Rate limiting
* 404 handling

### `modules/`

Contains the application's business domains.

The major modules currently include:

```text
admin
analytics
auth
click
dashboard
health
qr
urls
```

Each module is responsible for its own domain logic.

For example, the URL module contains URL-related controller, service, repository, DTO, validation, and supporting logic.

### `routes/`

Connects HTTP endpoints to their respective modules.

The API is mounted under:

```text
/api/v1
```

Short URL redirects are handled separately from the API routes.

### `services/`

Contains shared application services that do not belong exclusively to one business module.

### `app.js`

Creates and configures the Express application.

Responsibilities include:

* Security headers
* CORS
* Request parsing
* Cookies
* Compression
* Logging
* Rate limiting
* API routes
* Redirect routes
* Error handling

### `server.js`

Starts the HTTP server.

In production it binds the server so Render can expose it correctly.

---

# 🖥️ Frontend Structure

The frontend is a React application built with Vite.

The major application areas are:

```text
frontend/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   │   ├── Home
│   │   ├── Authentication
│   │   ├── Dashboard
│   │   ├── My URLs
│   │   ├── Analytics
│   │   ├── QR
│   │   ├── Sessions
│   │   └── Profile
│   │
│   ├── stores/
│   │   ├── auth
│   │   └── url
│   │
│   ├── routes/
│   └── ...
│
├── public/
├── package.json
└── vite.config.js
```

The frontend uses Zustand for application state and Axios for API communication.

Authentication state includes concepts such as:

* Current user
* Authentication status
* Authentication initialization
* Protected application state

---

# 🧭 Frontend Routing

The frontend separates public and protected areas.

Conceptually:

```text
Public Routes
   │
   ├── Home
   ├── Login
   └── Register

Protected Routes
   │
   ├── Dashboard
   ├── My URLs
   ├── Analytics
   ├── QR
   ├── Sessions
   └── Profile

Admin Routes
   │
   └── Admin functionality
```

Authentication is initialized before protected application content is displayed so the frontend can determine whether the current session is authenticated.

---

# 🧰 Technologies

## Frontend

| Technology   | Purpose                                 |
| ------------ | --------------------------------------- |
| React        | UI development                          |
| Vite         | Frontend tooling and development server |
| JavaScript   | Application language                    |
| Tailwind CSS | Styling                                 |
| shadcn/ui    | UI components                           |
| Zustand      | Client-side state management            |
| Axios        | HTTP client                             |
| React Router | Client-side routing                     |
| Recharts     | Analytics visualization                 |
| Lucide React | Icons                                   |

## Backend

| Technology         | Purpose                       |
| ------------------ | ----------------------------- |
| Node.js            | Runtime                       |
| Express            | HTTP server/API framework     |
| JavaScript         | Application language          |
| Prisma             | ORM/database access           |
| MySQL              | Relational database           |
| Zod                | Request validation            |
| JWT                | Access/refresh authentication |
| bcrypt             | Password and token hashing    |
| Helmet             | Security headers              |
| CORS               | Cross-origin configuration    |
| express-rate-limit | Rate limiting                 |
| Morgan             | HTTP request logging          |
| Winston            | Application logging           |
| Nano ID            | Short-code generation         |
| QRCode             | QR-code generation            |
| Cloudinary         | Cloud/media integration       |

---

# 🗄️ Database

The project uses MySQL through Prisma.

The database currently contains models for areas including:

```text
users
urls
clicks
sessions
refresh_tokens
audit_logs
api_keys
custom_domains
tags
url_tags
qr_codes
login_history
password_reset_tokens
email_verification_tokens
```

The exact schema is maintained in:

```text
prisma/schema.prisma
```

The application uses Prisma Client for database access rather than writing SQL directly throughout the business logic.

---

# 🔗 API Structure

The API is versioned under:

```text
/api/v1
```

Major API areas include:

```text
/auth
/urls
/analytics
/dashboard
/qr
/click
/admin
/health
```

Examples include:

```text
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/auth/me
POST   /api/v1/auth/refresh-token
POST   /api/v1/auth/logout
POST   /api/v1/auth/logout-all
GET    /api/v1/auth/sessions
PATCH  /api/v1/auth/profile
PATCH  /api/v1/auth/change-password
```

URL management includes operations for creating, listing, retrieving, updating, and deleting shortened URLs.

A separate redirect route handles shortened URLs:

```text
GET /:shortCode
```

A successful redirect returns an HTTP `302` response to the original URL.

---

# ❤️ Health Check

The backend exposes a health endpoint:

```text
GET /api/v1/health
```

There is also a root endpoint used to confirm that the application is responding.

The health functionality is intentionally kept separate from normal business operations so deployment infrastructure can check whether the application is available.

---

# ⚙️ Environment Variables

The backend uses environment variables for configuration and secrets.

Typical production configuration includes:

```env
NODE_ENV=production

DATABASE_URL=...

JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...

ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d

CLIENT_URL=https://your-frontend-domain

BASE_URL=https://your-backend-domain

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Important

Secrets should never be committed to Git.

The `.env` file is ignored by Git and production secrets are configured through the hosting environment.

`CLIENT_URL` and `BASE_URL` serve different purposes:

```text
CLIENT_URL
→ frontend origin allowed by CORS

BASE_URL
→ public backend URL used when constructing shortened URLs
```

For example:

```text
CLIENT_URL
https://your-frontend-domain

BASE_URL
https://your-backend-domain
```

---

# 🚀 Running Locally

## 1. Clone the repository

Clone the project and enter the backend or frontend directory as needed.

## 2. Install backend dependencies

```bash
cd backend
npm install
```

## 3. Configure environment variables

Create:

```text
backend/.env
```

and provide the required database, authentication, frontend, and service configuration.

## 4. Generate Prisma Client

```bash
npx prisma generate
```

## 5. Start the backend

Development:

```bash
npm run dev
```

Production-style local start:

```bash
npm start
```

The backend runs on the configured port.

## 6. Run the frontend

From the frontend directory:

```bash
npm install
npm run dev
```

The Vite development server will provide the local frontend URL.

---

# 🧪 Database & Prisma

Prisma is responsible for communicating with MySQL.

Useful commands include:

```bash
npx prisma generate
```

Generate/update the Prisma Client.

```bash
npx prisma db pull
```

Introspect an existing database schema.

```bash
npx prisma studio
```

Open Prisma Studio to inspect database records.

The current project uses an existing MySQL schema and does not currently contain a `prisma/migrations` directory.

Therefore, migration commands should not be run blindly against the production database.

---

# 🌍 Deployment

The current production architecture is:

```text
Frontend
React + Vite
       ↓
Vercel

Backend
Node.js + Express
       ↓
Render

Database
MySQL
       ↓
Aiven
```

This keeps the frontend, backend, and database independently deployable.

The backend is configured to use Render's assigned `PORT` and listens on:

```text
0.0.0.0
```

in production.

---

# 🔒 Production Security

The project includes several production-oriented protections.

### HTTP Security

Helmet is used to configure security-related HTTP headers.

### CORS

Only configured frontend origins are accepted in production.

Credentialed requests are enabled because authentication uses cookies.

### Rate Limiting

Rate limiting is applied to protect the API from excessive requests.

Authentication endpoints have additional protection.

### Password Security

Passwords are never stored as plaintext.

They are hashed using bcrypt.

### Refresh Token Security

Refresh tokens are stored in hashed form and associated with sessions.

Refresh-token rotation reduces the usefulness of a previously issued refresh token.

### Input Validation

Incoming data is validated before reaching the business logic.

Zod is used for request validation.

### URL Validation

The application validates URL protocols before accepting destination URLs.

### Environment Validation

Production startup validates required environment variables and authentication-secret requirements.

---

# 📊 Analytics Flow

A shortened URL is not simply a database record.

When someone visits:

```text
https://your-backend-domain/abc123
```

the backend can:

```text
Receive short code
      ↓
Find URL
      ↓
Validate URL status
      ↓
Record click
      ↓
Update analytics
      ↓
Redirect visitor
```

This separates URL redirection from analytics presentation.

The dashboard can then query the stored click data and transform it into information suitable for charts and summaries.

---

# 🧾 Audit System

The audit system records important application actions.

Conceptually:

```text
Application Action
       ↓
Audit Event
       ↓
Audit Service
       ↓
Audit Repository
       ↓
audit_logs
```

This gives the application a central place for tracking security- and business-relevant events rather than scattering logging logic throughout controllers.

---

# 🧠 Design Decisions

A few architectural decisions were intentional.

### Why controllers, services, and repositories?

Instead of putting everything inside route handlers:

```text
Route → huge controller → database
```

the application separates responsibilities:

```text
Route
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Prisma
```

This makes business logic easier to understand and maintain.

### Why Prisma?

Prisma provides a structured interface to MySQL and keeps database access organized around the application's data model.

### Why HTTP-only cookies?

Authentication tokens are handled through cookies rather than being stored directly in normal browser JavaScript storage.

### Why refresh-token sessions?

Refresh tokens are tied to database sessions so the application can revoke individual sessions and all sessions for a user.

### Why API versioning?

Using:

```text
/api/v1
```

creates a stable boundary for future API evolution.

---

# 📈 Current Scalability

The current application is intentionally a **modular monolith**.

It is not currently a microservices architecture.

That means the business domains are separated inside one backend application:

```text
                  Express Application
                         │
        ┌────────────────┼────────────────┐
        │                │                │
       Auth             URLs          Analytics
        │                │                │
       QR             Dashboard         Clicks
        │                │                │
        └────────────────┼────────────────┘
                         │
                       MySQL
```

This is simpler to develop and deploy while still keeping domain boundaries clear.

---

# 🔮 Possible Future Evolution

The current architecture leaves room for future scaling if the application's traffic and requirements justify it.

Possible future infrastructure could include:

```text
CDN
 ↓
DNS
 ↓
Load Balancer
 ↓
Multiple API Instances
 ↓
Redis
 ↓
Database Primary
 ↓
Read Replicas
```

Individual domains could eventually become independent services:

```text
Auth Service
URL Service
Analytics Service
QR Service
Admin Service
```

Other possible additions include:

* Redis caching
* Background jobs
* Message queues
* Database read replicas
* Database partitioning/sharding
* API gateway
* Multiple backend instances
* CDN
* Dedicated monitoring
* Centralized logging
* Distributed tracing

These are **future architectural possibilities, not components currently required by this project**.

The existing modular structure makes such evolution easier because business responsibilities are already separated.

---

# 📁 Project Development Philosophy

This project was built progressively rather than starting with an unnecessarily complex architecture.

The general progression was:

```text
Basic URL Shortener
       ↓
Database Integration
       ↓
Authentication
       ↓
Protected Routes
       ↓
URL Management
       ↓
Analytics
       ↓
QR Codes
       ↓
Sessions & Refresh Tokens
       ↓
Auditing
       ↓
Security Hardening
       ↓
Production Configuration
       ↓
Cloud Deployment
```

The result is a project that demonstrates both application development and the engineering decisions involved in moving an application from local development toward production.

---

# 🛠️ Development Scripts

Backend:

```bash
npm run dev
```

Starts the development server using Nodemon.

```bash
npm start
```

Starts the production-style Node.js server.

```bash
npm run prisma:generate
```

Generates Prisma Client.

```bash
npm run prisma:migrate
```

Runs Prisma's development migration command when migrations are intentionally being used.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run format
```

Formats the project using Prettier.

---

# 🐛 Troubleshooting

### `undefined/short-code`

If generated URLs contain:

```text
undefined/example
```

check:

```env
BASE_URL=https://your-backend-domain
```

`BASE_URL` must point to the backend, not the frontend.

### CORS errors

Check that:

```env
CLIENT_URL=https://your-frontend-domain
```

matches the exact production frontend origin.

### Authentication problems

Check:

* Cookies are being sent with requests.
* Backend CORS allows credentials.
* `CLIENT_URL` is correct.
* JWT secrets are configured.
* Access and refresh secrets are different.
* HTTPS is being used in production.
* The user exists in the production database.

### Prisma problems

Check:

```bash
npx prisma generate
```

and verify that `DATABASE_URL` points to the intended database.

---

# 📌 Project Status

The application currently has:

* Full frontend
* Full backend API
* MySQL database
* Prisma ORM
* Authentication
* Session management
* URL CRUD
* Custom aliases
* URL expiration
* QR codes
* Analytics
* Dashboard
* Audit logging
* Rate limiting
* Validation
* Production security configuration
* Vercel frontend deployment
* Render backend deployment
* Aiven MySQL production database

The project is currently deployed as a **modular monolith**, with the frontend, backend, and database hosted separately.

---

# 👨‍💻 Built With

**Frontend**

React · Vite · JavaScript · Tailwind CSS · shadcn/ui · Zustand · Axios · React Router · Recharts

**Backend**

Node.js · Express · JavaScript · Prisma · MySQL · JWT · bcrypt · Zod · Helmet · CORS · Express Rate Limit

**Infrastructure**

Vercel · Render · Aiven

---

## 🤖 AI Assistance

AI tools were used during the development of this project as a development and learning aid.

They were used in areas such as:

* Understanding technical concepts and implementation approaches
* Debugging and troubleshooting
* Reviewing code and identifying potential issues
* Exploring alternative implementation approaches
* Improving documentation
* Learning about software architecture and best practices
* Assisting with development-related research and problem solving

The implementation, testing, verification, architectural decisions, and final integration were handled as part of the development process. AI-generated suggestions were reviewed and adapted rather than being blindly incorporated into the project.

> AI assistance was used as a tool to support development and learning, not as a replacement for understanding how the application works.

---

---

# 👨‍💻 Author

**Md Owarasur Rahman Raj**

GitHub:
https://github.com/Coder7Raj

LinkedIn:
https://www.linkedin.com/in/owarasurrahman/

---  

## Final Note

This project is more than a URL-shortening utility.

It was built as a practical exercise in understanding how a modern web application works across multiple layers — from the browser and API design to authentication, database access, security, analytics, deployment, and production configuration.

The architecture is intentionally understandable today while leaving room for more advanced system-design concepts tomorrow.



⭐ If you found this project useful, consider giving it a star on GitHub.
