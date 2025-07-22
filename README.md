# 🩸 Blood Donation Tracker

A modern, responsive full-stack web application built with **React.js**, **Firebase**, **Material UI**, and **PrimeReact** to streamline blood donation efforts. This app helps users **register, login, submit donation details**, and interact with a clean interface to promote awareness and simplify blood tracking.

---

## 🌟 Live Demo

🔗 Coming Soon (Deploy on Firebase / Vercel / Netlify)

---

## 📸 Screenshots

> Add screenshots in `/assets/screenshots/` or directly here once the UI is ready.

- ![Homepage](/blood-donation-tracker/public/assets/screenshots/homepage.png)
- ![Signup Page](/blood-donation-tracker/public/assets/screenshots/signup%20page.png)
- ![Login Page](/blood-donation-tracker/public/assets/screenshots/login%20page.png)
- ![Contact Us Page](/blood-donation-tracker/public/assets/screenshots/contact%20us%20page.png)
- ![About Us Page1](/blood-donation-tracker/public/assets/screenshots/Aboutus1.png)
- ![About Us Page2](/blood-donation-tracker/public/assets/screenshots/Aboutus2.png)
- ![Search Donors page](/blood-donation-tracker/public/assets/screenshots/DonorSearch%20page.png)
- ![Donation Centre Page](/blood-donation-tracker/public/assets/screenshots/Donation%20Centrre%20page.png)
- ![Donation Dashboard Page](/blood-donation-tracker/public/assets/screenshots/DonationDashboard.png)
- ![Profile Page](/blood-donation-tracker/public/assets/screenshots/profile%20page.png)

---

## 🚀 Features

- 🔐 **User Authentication** (Signup/Login via Firebase Auth)
- 🧾 **Contact Us** form (client-side UI with validation)
- 🎨 **Modern UI/UX** (Material UI + PrimeReact)
- 📄 **Animated Transitions** (AOS – Animate On Scroll)
- 🔎 **Search Donor Page** (Functional base with future expansion)
- 🧠 **Responsive Design** (Mobile & Desktop friendly)
- 🛡️ **Secure Password Handling**
- ⚙️ **Firebase Firestore Integration** (User record storage)

---

## 🛠️ Built With

| Frontend       | Backend (Cloud)     | UI Libraries     | Tools           |
|----------------|---------------------|------------------|-----------------|
| React.js       | Firebase Auth       | Material UI      | Git & GitHub    |
| React Router   | Firestore Database  | PrimeReact       | AOS             |
| JavaScript     | Firebase Hosting    | PrimeIcons       | Vite / CRA      |

---

## 🧱 Folder Structure

blood-donation-tracker/
├── public/
├── src/
│ ├── components/
│ │ ├── Footer.jsx
│ │ ├── Header.jsx
│ ├── pages/
│ │ ├── Login.jsx
│ │ ├── Signup.jsx
│ │ ├── Contact.jsx
│ │ ├── Home.jsx
│ │ ├── SearchDonor.jsx
│ │ ├── Profile.jsx
│ │ ├── DonorDashboard.jsx
│ │ ├── DonationCenters.jsx
│ │ ├── AboutUs.jsx
│ ├── firebase.js
│ ├── App.jsx
│ ├── main.jsx
│ ├── App.css
│ ├── index.js
│ ├── index.css
├── package.json
│── README.md
├── index.html
└── vite.config.js



---

## ⚙️ Setup Instructions

> Make sure you have **Node.js** and **npm** installed

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/blood-donation-tracker.git
cd blood-donation-tracker

### 2. Install dependencies

npm install


#### 3. Setup Firebase:

Go to Firebase Console

Create a new project

Enable Authentication → Email/Password

Create a Cloud Firestore database (in test mode)

Click "Add Web App" and copy your config

Create a new file:
touch src/firebase.js

Paste this:

js
Copy
Edit
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_APP.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_APP.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


Replace the firebase configs in above file and save.


### 4. Start the App:

npm run dev
# OR
npm start

### Details
💅 Styling & Animations
Material UI for structure and spacing

PrimeReact components for inputs/buttons

AOS (Animate on Scroll) for fade/zoom effects

Fully responsive layout

Custom index.css to maintain theme consistency

🔐 Authentication Logic
Signup uses createUserWithEmailAndPassword

On signup, user record is stored in Firestore

Login with signInWithEmailAndPassword

Basic error handling with UI feedback

📧 Contact Page
Fully animated Contact form

Captures user name, email, and message

Currently logs form data to console (can be extended to send via email or store in DB)

📥 Future Enhancements
🔍 Advanced Donor Search (by blood group, location)

🗺️ Google Maps Integration to show nearby donors

📊 Admin dashboard

📧 Email notification integration

🌐 Multi-language support

🧾 Donation history for logged-in users


### 📦 Dependencies
json
Copy
Edit
"dependencies": {
  "@mui/material": "^5.x",
  "firebase": "^10.x",
  "primereact": "^9.x",
  "primeicons": "^6.x",
  "aos": "^3.x",
  "react-router-dom": "^6.x"
}

🔍 Lint & Format

npm run lint
npm run format


🚀 Deployment (Optional)
Deploy on Firebase Hosting:

npm install -g firebase-tools
firebase login
firebase init
firebase deploy


🤝 Contributing:

1.Fork this repo

2.Clone your fork

3.Create a new branch feature/your-feature-name

4.Make changes

5.Push and create a pull request


🙌 Acknowledgments:

React Team
Firebase Team
MUI & PrimeReact contributors
Open Source community