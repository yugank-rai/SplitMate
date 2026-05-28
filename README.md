# 💸 SplitMate

### Hi there! 👋 I'm Yugank Rai

I'm a passionate **Computer Science Engineering student at IIIT Bhagalpur** and a dedicated learner.

While my other repositories track my coding journey, **SplitMate** is where I put that knowledge into action. This is my **first full-stack MERN project** — a fully functional expense splitting web-app to master full-stack development, real-time communication, and deployment.

🎯 **My Goal:** To move beyond frontend basics and build a production-ready application that real people can actually use — and my college friends actually do!

---

## 🔗 Live Demo

👉 [Click here to use SplitMate Live](https://split-mate-peach.vercel.app)

---

## 🚀 About The Project

**SplitMate** is a full-stack web application that lets you track and split shared expenses with friends and groups — just like Splitwise. It handles the math, simplifies debts, and sends real-time notifications so everyone stays on the same page.

I built this because my college friend group was always struggling to track who owes who during trips and shared expenses. Now we actually use this app ourselves!

---

## ✨ Key Features

- **👥 Group Management:** Create groups for trips, home, office or any occasion and add members by email
- **💸 Expense Splitting:** Add expenses and split them 3 ways — equally, by exact amount, or by percentage
- **⚖️ Debt Simplification:** Smart algorithm that minimizes the number of transactions needed to settle all debts
- **✅ Settle Up:** Mark debts as paid and track settlement history per group
- **🔔 Real-Time Notifications:** Instant notifications via Socket.io when someone adds an expense or settles up
- **📊 Dashboard & Charts:** Live pie chart (spending by category) and bar chart (monthly trend) with real data
- **👤 Profile Management:** Edit name, change password, view personal stats
- **🌙 Dark Mode:** Toggle between light and dark theme, preference saved locally
- **📱 Responsive Design:** Works on both desktop and mobile browsers

---

## 🛠️ Tech Stack & Learnings

This project was built to solidify my understanding of the following concepts:

**Frontend**
- **React 18 + Vite:** Component-based UI with hooks (useState, useEffect, useContext)
- **React Router DOM:** Client-side routing with protected routes
- **Context API:** Global state management for auth, theme, and notifications
- **Recharts:** Data visualization with pie and bar charts
- **Socket.io Client:** Real-time bidirectional communication
- **Axios:** HTTP requests with interceptors for auto token injection
- **Plain CSS:** Custom design system using CSS variables for theming

**Backend**
- **Node.js + Express:** REST API with MVC architecture
- **MongoDB + Mongoose:** NoSQL database with schema design and population
- **JWT + bcryptjs:** Stateless authentication and password hashing
- **Socket.io:** Real-time event emission to specific user rooms
- **Middleware Pattern:** Auth protection, error handling, async wrapping

**Concepts Learned**
- **Debt Simplification Algorithm:** Graph-based approach to minimize transactions between N people
- **CORS Configuration:** Handling cross-origin requests between separate frontend/backend deployments
- **Environment Variables:** Separating dev and production configs securely
- **Continuous Deployment:** Auto-deploy on git push via Render + Vercel
- **MongoDB Atlas:** Cloud database setup, IP whitelisting, connection strings

---

## 🔗 Live Demo

👉 [https://split-mate-peach.vercel.app](https://split-mate-peach.vercel.app)

---

## 📁 Project Structure

```
splitmate/
├── client/                   # React + Vite Frontend
│   └── src/
│       ├── api/              # All Axios API calls
│       ├── components/       # Reusable UI components
│       │   ├── common/       # Navbar, Sidebar, Modal, ProtectedRoute
│       │   ├── dashboard/    # Charts, BalanceCard, ActivityFeed
│       │   ├── expenses/     # ExpenseCard, ExpenseForm, SplitSelector
│       │   ├── groups/       # GroupCard, GroupForm, MemberList
│       │   ├── notifications/# NotificationBell, NotificationItem
│       │   └── settlements/  # BalanceSummary, SettleUpModal
│       ├── context/          # AuthContext, ThemeContext, NotificationContext
│       ├── hooks/            # useAuth, useNotifications
│       ├── pages/            # All page components
│       └── styles/           # CSS files per feature
│
└── server/                   # Node.js + Express Backend
    ├── config/               # MongoDB connection, Cloudinary
    ├── controllers/          # Business logic per resource
    ├── middleware/           # authMiddleware, errorMiddleware
    ├── models/               # Mongoose schemas
    ├── routes/               # Express route definitions
    ├── socket/               # Socket.io event handlers
    └── utils/                # generateToken, splitCalculator, debtSimplifier
```


## ⚡ How to Run Locally

If you want to test this on your own machine instead of the live site:

**1. Clone the repo:**
```bash
git clone https://github.com/yugank-rai/SplitMate.git
cd splitmate
```

**2. Setup Backend:**
```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

```bash
npm run dev
# Server runs on http://localhost:5000
```

**3. Setup Frontend:**
```bash
cd ../client
npm install
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

```bash
npm run dev
# App runs on http://localhost:5173
```

---

## 🌐 Deployment

| Part | Platform | Details |
|---|---|---|
| Frontend | Vercel | Root: `client`, Build: `npm run build`, Output: `dist` |
| Backend | Render | Root: `server`, Start: `npm start` |
| Database | MongoDB Atlas | Free M0 cluster, IP whitelisted |

Both platforms auto-deploy whenever I push to the `main` branch on GitHub — this is **Continuous Deployment (CD)** in action!

---

## 🗄️ Database Models

```
User         → name, email, password (hashed), avatar, totalOwed, totalOwe
Group        → name, type, icon, members[{user, role}], createdBy, totalExpenses
Expense      → title, amount, category, paidBy, group, splits[{user, amount, isPaid}], splitType, note, date
Settlement   → from, to, amount, group, note, settledAt
Notification → recipient, sender, type, message, group, isRead
```

---

## 🤝 Connect with Me

**Yugank Rai**
- 📧 Email: yugankrai.smn@gmail.com
- 🐙 GitHub: [@yugank-rai](https://github.com/yugank-rai)
- 💼 LinkedIn: [Yugank Rai](https://linkedin.com/in/contactyugankrai)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <p>Built by Yugank Rai</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
