# 🩸 Blood Donation Tracker

A modern, responsive full-stack web application built with **React.js**, **Firebase**, **Material UI**, and **PrimeReact** to streamline blood donation efforts. This app helps users **register, login, submit donation details**, and interact with a clean interface to promote awareness and simplify blood tracking.

---

## 🌟 Live Demo

🔗 Coming Soon (Deploy on Firebase / Vercel / Netlify)

---

## 📸 Screenshots

- ![Homepage]<img width="1920" height="1080" alt="Screenshot (738)" src="https://github.com/user-attachments/assets/0190131e-3ce8-419b-b3e2-0208cffdf76f" />

- ![Signup Page]<img width="1919" height="870" alt="Screenshot 2025-07-22 231514" src="https://github.com/user-attachments/assets/504e1030-677d-490f-a79c-d4c6dd17a936" />

- ![Login Page]<img width="1919" height="867" alt="Screenshot 2025-07-22 231454" src="https://github.com/user-attachments/assets/c4cf6969-222f-43fe-909e-75437646649d" />

- ![Contact Us Page]<img width="1919" height="867" alt="Screenshot 2025-07-22 231349" src="https://github.com/user-attachments/assets/695cc7d9-050a-4d9a-a505-ba799d4a0bda" />

- ![About Us Page1]<img width="1919" height="865" alt="Screenshot 2025-07-22 231259" src="https://github.com/user-attachments/assets/322eaf72-e747-4089-a182-2fef1c4e47f1" />

- ![About Us Page2]<img width="1919" height="865" alt="Screenshot 2025-07-22 231316" src="https://github.com/user-attachments/assets/37bcf81c-291e-49fb-8a39-e3bb51e3be16" />

- ![Search Donors page]<img width="1918" height="867" alt="Screenshot 2025-07-22 231115" src="https://github.com/user-attachments/assets/909d9626-a1fc-4f14-be39-ae4438308ec7" />

- ![Donation Centre Page]<img width="1918" height="867" alt="Screenshot 2025-07-22 230912" src="https://github.com/user-attachments/assets/d5a3c40e-e6d5-4eba-9143-e9bf1726c4f3" />

- ![Donation Dashboard Page]<img width="1913" height="870" alt="Screenshot 2025-07-22 231239" src="https://github.com/user-attachments/assets/9b110e11-fe8d-4ded-a6be-97c663d22984" />

- ![Profile Page]<img width="1912" height="870" alt="Screenshot 2025-07-22 231412" src="https://github.com/user-attachments/assets/718c7e7a-2be6-49a7-a2c0-12dd9e840bcc" />


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

blood-donation-tracker/  <br/>
├── public/      <br/>
├── src/
│ ├── components/  <br/>
│ │ ├── Footer.jsx      <br/>
│ │ ├── Header.jsx      <br/>
│ ├── pages/            <br/>
│ │ ├── Login.jsx        <br/>
│ │ ├── Signup.jsx      <br/>
│ │ ├── Contact.jsx      <br/>
│ │ ├── Home.jsx          <br/>
│ │ ├── SearchDonor.jsx    <br/>
│ │ ├── Profile.jsx        <br/>
│ │ ├── DonorDashboard.jsx    <br/>
│ │ ├── DonationCenters.jsx    <br/>
│ │ ├── AboutUs.jsx            <br/>
│ ├── firebase.js              <br/>
│ ├── App.jsx                  <br/>
│ ├── main.jsx                <br/>
│ ├── App.css                <br/>
│ ├── index.js            <br/>
│ ├── index.css            <br/>
├── package.json            <br/>
│── README.md                <br/>
├── index.html                <br/>
└── vite.config.js            <br/>



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

1.Go to Firebase Console

2.Create a new project

3.Enable Authentication → Email/Password

4.Create a Cloud Firestore database (in test mode)

5.Click "Add Web App" and copy your config

6.Create a new file:
src/firebase.js

Paste this:( in the api section edit and put your firebase details)

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
💅 Styling & Animations:

Material UI for structure and spacing

PrimeReact components for inputs/buttons

AOS (Animate on Scroll) for fade/zoom effects

Fully responsive layout

Custom index.css to maintain theme consistency

🔐 Authentication Logic:

Signup uses createUserWithEmailAndPassword

On signup, user record is stored in Firestore

Login with signInWithEmailAndPassword

Basic error handling with UI feedback

📧 Contact Page:

Fully animated Contact form

Captures user name, email, and message

Currently logs form data to console (can be extended to send via email or store in DB)

📥 Future Enhancements:

🔍 Advanced Donor Search (by blood group, location)

🗺️ Google Maps Integration to show nearby donors

📊 Admin dashboard

📧 Email notification integration

🌐 Multi-language support

🧾 Donation history for logged-in users


📦 Dependencies:

json

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
