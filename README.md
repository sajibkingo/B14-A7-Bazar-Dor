# 🛒 BazarDor (বাজার দর)

### Real-Time Commodity Price Tracking for Bangladesh

BazarDor is a modern, responsive web application designed to help consumers explore daily essential commodity prices across regional markets in Bangladesh. It provides price trend indicators, category-based filtering, regional market comparisons, and secure user authentication through an intuitive Bengali-friendly interface.

**Built with Next.js, Tailwind CSS, MongoDB, and Better Auth.**

---

## 📌 Overview

Accessing reliable daily commodity prices can help consumers make informed purchasing decisions. BazarDor brings market price information together in one place, allowing users to explore product prices, compare regional rates, and monitor daily price fluctuations.

The application combines a responsive user interface with dynamic product data, Bengali-aware numerical sorting, and authenticated user features to deliver a practical, user-friendly experience.

---

## ✨ Key Features

- **📊 Price Trend Monitoring:** View daily commodity prices with rising, falling, and unchanged indicators, including percentage variations against previous-day averages.
- **🔎 Smart Filtering & Sorting:** Filter products by category and sort prices from low to high or high to low, with support for Bengali numerals.
- **📍 Regional Market Comparison:** Explore product-level market comparisons across Dhaka, Chattogram, Rajshahi, Sylhet, and other regional markets, including minimum, maximum, and average prices.
- **🔐 Secure Authentication:** Sign up and sign in using email and password, Google, or GitHub authentication.
- **👤 User Profile Management:** Access a protected profile and update profile information.
- **📈 Dynamic Price Dashboard:** Explore products, top price risers, and top price fallers from the landing page.
- **🇧🇩 Bengali-Friendly Interface:** Display Bengali dates and support Bengali numerical price sorting.
- **📱 Responsive UI/UX:** Enjoy a mobile-first interface built with Tailwind CSS and daisyUI.
- **⚡ Enhanced User Experience:** Benefit from animated price tickers, skeleton loading states, custom 404 pages, and toast notifications.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend Framework | Next.js (App Router) |
| Programming Language | JavaScript |
| Runtime & Package Manager | Node.js, npm |
| Styling | Tailwind CSS, daisyUI |
| Authentication | Better Auth |
| Database | MongoDB |
| Database Adapter | `@better-auth/mongo-adapter` |
| Data API | Cloudflare Worker REST API |
| Notifications | React-Toastify |
| Deployment | Vercel |
| Image Optimization | Next.js Image Component |
| Version Control | Git, GitHub |

---

## 🏗️ Application Architecture

BazarDor uses Next.js for its application interface and routing, Better Auth for authentication, MongoDB for authentication-related database operations, and Cloudflare Worker REST API endpoints for retrieving category and product information.

**High-level data flow:**

`User → Next.js Interface → REST API → Product & Category Data`

`User → Authentication Interface → Better Auth → MongoDB`

---

## 📂 Project Structure

```text
bazardor/
├── public/
│   ├── logo.png
│   └── banner.png
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   ├── category/
│   │   │   └── [slug]/
│   │   ├── product/
│   │   │   └── [slug]/
│   │   ├── profile/
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── layout.jsx
│   │   ├── not-found.jsx
│   │   └── page.jsx
│   ├── components/
│   ├── context/
│   └── lib/
├── next.config.mjs
├── package.json
└── README.md
```

**Directory overview**

- `src/app/` — Application pages, layouts, dynamic routes, and authentication API handlers.
- `src/components/` — Reusable UI components, including the navbar, hero banner, product cards, price ticker, and loading skeletons.
- `src/context/` — React context providers for application-wide authentication state.
- `src/lib/` — Authentication client configuration and Bengali utility functions.
- `public/` — Static assets such as logos and banners.

---

## ⚡ Getting Started

Follow these steps to run BazarDor locally.

### Prerequisites

Make sure you have the following installed and configured:

- [Node.js](https://nodejs.org/) — A compatible version for your Next.js project.
- npm — Included with Node.js.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or another compatible MongoDB deployment.
- Google and GitHub OAuth credentials, if you want to enable social authentication.
- Access to the Cloudflare Worker REST API used by the application.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/bazardor.git
cd bazardor
```

Replace `your-username` with your GitHub username or use the actual repository URL.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root and configure the following variables:

```dotenv
# MongoDB Connection
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/bazar-dor?retryWrites=true&w=majority

# Better Auth Configuration
BETTER_AUTH_SECRET=your_super_secret_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth (Optional)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

**Configuration notes:**

- Replace all placeholder values with your actual credentials.
- Generate a strong, random secret for `BETTER_AUTH_SECRET`.
- Configure the authorized callback URLs in your Google and GitHub OAuth applications according to your Better Auth setup.
- Verify that the environment variable names match those expected by your application.
- Keep `.env.local` out of version control. Never commit database credentials, authentication secrets, or OAuth client secrets to GitHub.
- Ensure the product and category API endpoints are accessible and correctly configured in the application.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore BazarDor.

### 5. Build for Production

To create a production build, run:

```bash
npm run build
```

To start the production server after a successful build:

```bash
npm run start
```

---

## 🔐 Authentication & Security

BazarDor uses Better Auth to support credential-based authentication and optional Google and GitHub sign-in.

Security considerations include:

- Protecting private credentials through environment variables.
- Restricting access to authenticated application routes.
- Configuring OAuth callback URLs correctly.
- Using HTTPS and appropriate production environment settings during deployment.

---

## 🚀 Deployment

The application can be deployed on [Vercel](https://vercel.com/).

General deployment steps:

1. Push the project to a GitHub repository.
2. Import the repository into Vercel.
3. Configure the required environment variables in the Vercel project settings.
4. Verify the MongoDB connection and product/category API availability.
5. Configure production OAuth callback URLs.
6. Deploy the application and test the main user flows.

---

## 🎯 Project Goals

BazarDor demonstrates practical experience with:

- Building responsive web applications using Next.js.
- Designing reusable UI components and dynamic routes.
- Integrating REST APIs into a frontend application.
- Implementing authentication and protected pages.
- Working with MongoDB and environment-based configuration.
- Processing Bengali numerical values for accurate sorting.
- Improving usability through loading states, notifications, and responsive design.

---

## 🔮 Future Improvements

Potential enhancements include:

- Historical price charts and interactive trend analysis.
- Market-specific price alerts and notifications.
- Advanced search and filtering options.
- Additional regional market coverage.
- Automated API testing and end-to-end testing.
- Improved accessibility and performance monitoring.

---

