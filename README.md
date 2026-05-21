# 💼 Job Board App

A full-stack job board platform that connects job seekers with companies. Built with **Next.js 15**, **Express.js**, **PostgreSQL** (via Supabase), and **Prisma ORM**.

---

## 🚀 Features

### For Job Seekers
- Register, verify email, and manage profile
- Browse and search job listings by location, category, employment type, and worksite
- Apply to jobs with CV upload
- Track application status (Pending → Viewed → Shortlisted → Interview → Offered → Accepted/Rejected)
- Take pre-employment tests per job listing
- Build and generate a resume (PDF export)
- Write company reviews with ratings
- Take skill assessments and earn badges
- Subscribe to premium plans via Xendit payment gateway

### For Companies
- Register, verify email, and manage company profile
- Post, publish, and manage job listings
- Review and manage applicants
- Schedule interviews and send notifications
- Create pre-employment tests for job listings
- View analytics dashboard
- Receive email notifications for key events

### For Developers (Admin)
- Dedicated developer dashboard
- Platform-wide management

---

## 🛠️ Tech Stack

### Frontend
| Technology | Description |
|---|---|
| [Next.js 15](https://nextjs.org/) | React framework with App Router & Turbopack |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS framework |
| [NextAuth v5](https://authjs.dev/) | Authentication (credentials + social login) |
| [Axios](https://axios-http.com/) | HTTP client |
| [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) | Form handling & validation |
| [TipTap](https://tiptap.dev/) | Rich text editor |
| [React Leaflet](https://react-leaflet.js.org/) | Interactive maps |
| [Chart.js](https://www.chartjs.org/) | Analytics charts |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | Toast notifications |
| [Motion](https://motion.dev/) | Animations |

### Backend
| Technology | Description |
|---|---|
| [Express.js v5](https://expressjs.com/) | Node.js web framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Prisma ORM](https://www.prisma.io/) | Database ORM |
| [PostgreSQL](https://www.postgresql.org/) | Relational database (hosted on Supabase) |
| [JWT](https://jwt.io/) | Authentication tokens |
| [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) | Password hashing |
| [Nodemailer](https://nodemailer.com/) | Email service (Gmail SMTP) |
| [Cloudinary](https://cloudinary.com/) | Image & file storage |
| [Xendit](https://www.xendit.co/) | Payment gateway |
| [Puppeteer Core](https://pptr.dev/) | PDF generation (CV & certificates) |
| [Node Cron](https://github.com/node-cron/node-cron) | Scheduled tasks |
| [express-validator](https://express-validator.github.io/) | Request validation |

---

## 📁 Project Structure

```
job-board-app/
├── backend/                  # Express.js REST API
│   ├── src/
│   │   ├── controller/       # Route controllers
│   │   ├── services/         # Business logic
│   │   ├── router/           # API route definitions
│   │   ├── middleware/       # Auth & validation middleware
│   │   ├── helpers/          # Utility helpers (cloudinary, mailer, etc.)
│   │   ├── validation/       # Yup validation schemas
│   │   ├── templates/        # Email & PDF templates (HBS, EJS)
│   │   ├── utils/            # Shared utilities
│   │   └── index.ts          # App entry point
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── migrations/       # Migration history
│   ├── vercel.json           # Vercel deployment config
│   └── package.json
│
└── frontend/                 # Next.js 15 App
    ├── src/
    │   ├── app/
    │   │   ├── (auth)/       # Auth pages (login, register, verify)
    │   │   ├── (dashboard)/  # User & company dashboards
    │   │   ├── (homepage)/   # Public pages (jobs, companies, reviews)
    │   │   ├── assessment/   # Skill assessment pages
    │   │   ├── usertest/     # Job pre-employment test pages
    │   │   └── dev/          # Developer/admin panel
    │   ├── components/       # Reusable UI components
    │   ├── helper/           # Formatting & normalizer utilities
    │   ├── lib/              # Auth & Axios config
    │   ├── schema/           # Yup form schemas
    │   └── types/            # TypeScript type definitions
    └── package.json
```

---

## 🗄️ Database Models

- **User** — Job seeker accounts
- **Company** — Employer accounts
- **Industry** — Company industry categories
- **Job** — Job listings
- **Application** — Job applications with status tracking
- **Interview** — Interview scheduling
- **Review** — Company reviews with ratings
- **Test / UserTest** — Pre-employment tests
- **UserResume** — Resume builder (work experience, education, leadership, additional)
- **SkillAssessment / AssessmentSession** — Skill assessment system
- **Subscription / Subscriber / Transaction** — Premium subscription & payments

---

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL database (or a [Supabase](https://supabase.com/) project)
- Cloudinary account
- Xendit account (for payments)
- Gmail account (for email notifications)

---

### Backend Setup

1. **Clone the repository and navigate to the backend:**
   ```bash
   cd backend
   npm install
   ```

2. **Create a `.env` file** based on the example below:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?pgbouncer=true"
   DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

   BASE_URL_FRONTEND="http://localhost:3000"

   JWT_SECRET="your_jwt_secret"

   GMAIL_USER="your_email@gmail.com"
   GMAIL_PASS="your_gmail_app_password"

   CLOUD_KEY="your_cloudinary_api_key"
   CLOUD_SECRET="your_cloudinary_api_secret"
   CLOUD_NAME="your_cloudinary_cloud_name"

   XENDIT_CALLBACK_TOKEN="your_xendit_callback_token"
   SECRET_API_KEY="your_xendit_secret_api_key"
   ```

3. **Run database migrations:**
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:8000`.

---

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   npm install
   ```

2. **Create a `.env.local` file:**
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:8000"
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

---

## 📦 Deployment

### Backend — Vercel
The backend is configured for Vercel deployment via `vercel.json`. Build the project first:
```bash
npm run build
```
Then deploy using the Vercel CLI or connect the repository to Vercel.

### Frontend — Vercel
The Next.js frontend can be deployed directly to Vercel:
```bash
npm run build
```

---

## 📧 Email Notifications

The app sends automated emails for:
- Account verification
- Password reset
- Email change confirmation
- Application status updates (accepted, rejected, offered)
- Interview scheduling notices
- Subscription renewal reminders

---
