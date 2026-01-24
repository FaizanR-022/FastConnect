# 🎓 FastConnect

> Connecting FAST-NUCES Students with Alumni

FastConnect is a comprehensive platform that bridges the gap between current students and alumni of FAST-NUCES. Students can discover alumni working in their fields of interest, seek career guidance through Q&A forums, and build meaningful professional connections.

**🔗 Live Demo:** [https://fast-connect-nu.vercel.app/](https://fast-connect-nu.vercel.app/)

---

## ✨ Features

### 🔐 Authentication & Profiles

- **Dual Registration System**: Students sign up with @nu.edu.pk emails, alumni with personal emails
- **Email Verification**: OTP-based verification with 5-minute expiry
- **Rich Alumni Profiles**: Work history, current position, previous companies, skills, location
- **Profile Picture Upload**: Integrated with Cloudinary CDN
- **User Management**: View your own profile and explore other users

### 📚 Alumni Directory

- **Advanced Search**: Search by name, company, position, city, country, or expertise
- **Smart Filtering**: Filter by department, campus, graduation year
- **Pagination**: Smooth browsing through large alumni database
- **Detailed Profiles**: View complete professional journey of each alumni

### 💬 Q&A Forum

- **Ask Questions**: Students can post questions seeking guidance
- **Alumni Responses**: Only alumni can reply to posts
- **Engagement**: Like/unlike posts to show appreciation
- **Thread View**: View full discussions with all replies
- **Post Management**: Delete your own posts and replies

### 🔔 Notifications

- **Real-time Updates**: Notifications for new posts, replies, and likes
- **Notification Center**: Dedicated page with unread count badge
- **Daily Digest Emails**: Scheduled summary emails at 4 PM PKT
- **Mark as Read**: Individual and bulk mark-as-read functionality

### 🎨 Additional Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Dark Mode**: Toggle between light and dark themes
- **Feedback System**: Users can submit feedback and suggestions
- **Profile Exploration**: View profiles of other students and alumni

---

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS v4** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **React Hook Form** - Form management
- **Yup** - Schema validation
- **Zustand** - Lightweight state management
- **React Router v7** - Client-side routing
- **Axios** - HTTP client
- **Sonner** - Toast notifications
- **Lucide React** - Icon library

### Backend

- **Node.js + Express.js** - Server framework
- **PostgreSQL** - Relational database
- **Sequelize ORM** - Database abstraction
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Cloudinary** - Image storage and CDN
- **Brevo API** - Email service (300 emails/day)
- **Node-cron** - Scheduled tasks
- **Multer** - File upload handling
- **Express Rate Limit** - API rate limiting

### Deployment & DevOps

- **Vercel** - Frontend hosting
- **Vercel Cron** - Scheduled jobs (daily digest, keep-alive)
- **Render** - Backend hosting
- **PostgreSQL** - Hosted database

---

## 🏗️ System Architecture

FastConnect follows a **RESTful API architecture** with clear separation of concerns:

- **Client-Server Model**: React SPA communicates with Express REST API
- **JWT Authentication**: Stateless authentication with role-based access control
- **ORM Pattern**: Sequelize manages database operations with model relationships
- **File Upload**: Direct integration with Cloudinary for optimized image storage
- **Email Service**: Brevo API for transactional emails and daily digests
- **Scheduled Tasks**:
  - Daily digest emails (11 AM UTC / 4 PM PKT)
  - Keep-alive pings (every 14 minutes to prevent cold starts)
  - Notification cleanup (daily at 2 AM)

---

## 📁 Project Structure

```
fastconnect/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── alumni/          # Alumni directory components
│   │   │   ├── posts/           # Forum post components
│   │   │   ├── replies/         # Reply components
│   │   │   ├── notifications/   # Notification system
│   │   │   ├── profile/         # Profile management
│   │   │   ├── layout/          # Page layouts & navigation
│   │   │   ├── forms/           # Form components
│   │   │   ├── common/          # Shared components
│   │   │   └── ui/              # Radix UI primitives
│   │   ├── pages/               # Route pages
│   │   │   ├── Auth/            # Login, signup, verification
│   │   │   ├── Home/            # Dashboard, landing page
│   │   │   ├── Alumni/          # Alumni list & profiles
│   │   │   ├── Posts/           # Forum pages
│   │   │   ├── User/            # User profiles
│   │   │   ├── Notifications/   # Notification center
│   │   │   └── Feedback/        # Feedback page
│   │   ├── services/            # API call functions
│   │   ├── store/               # Zustand state stores
│   │   ├── hooks/               # Custom React hooks
│   │   ├── utils/               # Helper functions
│   │   ├── constants/           # App constants
│   │   └── routes/              # Route configurations
│   ├── api/cron/                # Vercel cron handlers
│   │   ├── digest.js            # Daily email digest
│   │   └── keep-alive.js        # Backend ping
│   └── public/                  # Static assets
│
└── backend/
    ├── src/
    │   ├── controllers/         # Request handlers
    │   ├── models/              # Sequelize models
    │   ├── routes/              # API route definitions
    │   ├── services/            # Business logic
    │   │   ├── notificationService.js
    │   │   ├── dailyDigestService.js
    │   │   └── emailService.js
    │   ├── middleware/          # Auth, validation, rate limiting
    │   ├── jobs/                # Cron job configurations
    │   ├── config/              # Database, email, Cloudinary
    │   ├── utils/               # Helper functions
    │   ├── validations/         # Input validation schemas
    │   └── scripts/             # Database seeding
    └── package.json
```

---

## 🗄️ Database Schema

### Core Tables

**Users & Authentication**

- `users` - Base authentication (email, password, user_type, verification status)
- `students` - Student profiles (name, department, campus, batch)
- `alumnis` - Alumni profiles (name, phone, current job/company/location)
- `otps` - Email verification codes

**Professional Data**

- `experiences` - Alumni work history
- `alumni_skills` - Junction table for alumni skills
- `companies` - Company master data
- `job_roles` - Job title master data
- `skills` - Skills master data
- `departments` - Academic departments
- `campuses` - University campuses
- `cities` & `countries` - Location data

**Forum & Engagement**

- `posts` - Student questions
- `replies` - Alumni responses (only alumni can reply)
- `post_likes` - Post engagement tracking

**Notifications**

- `notifications` - User notifications
- `feedbacks` - User feedback submissions

### Key Relationships

- **One-to-One**: `User` → `Student` or `Alumni`
- **One-to-Many**:
  - `Alumni` → `Experiences`
  - `Post` → `Replies`
  - `User` → `Notifications`
- **Many-to-Many**: `Alumni` ↔ `Skills` (via `alumni_skills`)

---

## 🔌 API Overview

### Authentication (`/api/auth`)

- `POST /auth/login` - User login
- `POST /auth/signup/student` - Student registration
- `POST /auth/signup/alumni` - Alumni registration
- `POST /auth/verify-signup-otp` - Verify email OTP
- `POST /auth/resend-signup-otp` - Resend verification code

### User Management (`/api/user`)

- `GET /user` - Get current user profile
- `PUT /user` - Update profile
- `DELETE /user` - Delete account
- `GET /user/:userId` - Get user by ID
- `GET /user/:userId/posts` - Get user's posts
- `GET /user/:userId/replies` - Get user's replies

### Alumni Directory (`/api/alumni`)

- `GET /alumni` - Get all alumni (with search & filters)
- `GET /alumni/:id` - Get alumni details

### Forum (`/api/posts`, `/api/replies`)

- `GET /posts` - Get all posts (paginated)
- `POST /posts` - Create new post
- `GET /posts/:id` - Get single post
- `DELETE /posts/:id` - Delete post
- `POST /posts/:id/like` - Like/unlike post
- `GET /posts/:id/replies` - Get post replies
- `POST /posts/:id/replies` - Create reply (alumni only)
- `DELETE /replies/:id` - Delete reply

### Notifications (`/api/notifications`)

- `GET /notifications` - Get user notifications
- `GET /notifications/unread-count` - Get unread count
- `PATCH /notifications/:id/read` - Mark as read
- `PATCH /notifications/read-all` - Mark all as read
- `DELETE /notifications/:id` - Delete notification

### Utilities

- `POST /api/upload/image` - Upload profile picture
- `POST /api/feedback` - Submit feedback
- `GET /health` - Health check endpoint

---

## 🔍 Key Features Deep Dive

### Smart Search System

The alumni directory includes a powerful search system that allows searching by:

- **Name**: First name or last name
- **Company**: Current or previous employers
- **Position**: Current or previous job titles
- **Location**: City or country (current or past)
- **Expertise**: Skills and specializations

Filters can be combined with search for precise results:

- Department (CS, SE, AI, etc.)
- Campus (Karachi, Lahore, Islamabad, etc.)
- Graduation Year (2000-present)

### Notification System

**In-App Notifications:**

- Bell icon with unread count badge
- Dropdown preview of recent notifications
- Dedicated notification center page
- Mark individual or all as read
- Delete notifications

**Email Notifications:**

- Daily digest sent at 4 PM PKT (11 AM UTC)
- Groups all unread notifications by type
- Includes links to relevant posts/replies
- Sent via Vercel cron job

**Notification Types:**

- `new_post` - When someone creates a new question
- `post_reply` - When alumni replies to your post
- `post_like` - When someone likes your post

### Q&A Forum Features

**For Students:**

- Create posts with title and detailed question
- View all posts sorted by engagement
- Like posts to show interest
- Delete their own posts
- View post details with all replies

**For Alumni:**

- View all student questions
- Reply to posts with detailed answers
- Like posts
- Delete their own replies
- Share professional insights

**Post Engagement:**

- Like count tracking
- Reply count tracking
- Trending posts (based on likes and recency)
- Post author information display

---

## 📊 Notable Implementation Details

### Email Verification Flow

1. User signs up with email and password
2. OTP generated (6 digits) with 5-minute expiry
3. Email sent via Brevo API
4. User enters OTP on verification page
5. Maximum 3 attempts before requesting new OTP
6. 60-second cooldown between resend requests

### Daily Digest System

- **Trigger**: Vercel cron job runs daily at 11 AM UTC (4 PM PKT)
- **Process**:
  1. Fetches all unread notifications from last 24 hours
  2. Groups by user and notification type
  3. Generates HTML email with digest
  4. Sends via Brevo API
  5. Marks notifications as email_sent
- **Email Structure**:
  - Summary of total notifications
  - Grouped by type (New Posts, Replies, Likes)
  - Includes post titles and previews
  - Direct links to relevant content

### Rate Limiting Strategy

- **Global**: 500 requests per 15 minutes per IP
- **Auth endpoints**: 8 requests per 15 minutes (prevents brute force)
- **API endpoints**: 250 requests per 15 minutes
- **Read operations**: 300 requests per 15 minutes
- **Write operations**: 50 requests per 15 minutes

### Image Upload Workflow

1. User selects image (max 5MB)
2. Frontend validates file type and size
3. File uploaded to backend via multipart/form-data
4. Multer processes upload to memory
5. Image sent to Cloudinary with transformations:
   - Max dimensions: 500x500px
   - Quality: auto:good
   - Format: JPG
6. Cloudinary URL returned and saved to database

### Keep-Alive System

- **Purpose**: Prevent Render backend from sleeping (free tier limitation)
- **Trigger**: Cron job every 14 minutes
- **Action**: Simple GET request to `/health` endpoint
- **Benefit**: Maintains fast response times for users

---


## 👨‍💻 Developer

**Faizan Raza**  
FAST-NUCES Karachi | Batch 2023

📧 Email: faizanfaisal05@gmail.com | k230834@nu.edu.pk  
💼 LinkedIn: [faizan-raza-302360245](https://www.linkedin.com/in/faizan-raza-302360245/)

---

## 📝 License

This project is developed as a university project for FAST-NUCES. All rights reserved.

---

<div align="center">
  <p>Built by FAST-NUCES student, to serve FAST-NUCES community</p>
  <p>© 2026 FastConnect. All rights reserved.</p>
</div>
