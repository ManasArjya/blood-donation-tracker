import { useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Header() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        setIsAdmin(userSnap.exists() && userSnap.data().isAdmin || false);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err.message);
    }
  };

  const items = [
    { label: 'Home', icon: 'pi pi-home', command: () => navigate('/') },
    {
      label: 'Donation',
      icon: 'pi pi-heart-fill',
      items: [
        { label: 'Donation Centers', icon: 'pi pi-map-marker', command: () => navigate('/donation-centers') },
        { label: 'Search Donors', icon: 'pi pi-search', command: () => navigate('/search-donors') }
      ],
    },
    { label: 'Dashboard', icon: 'pi pi-chart-line', command: () => navigate('/dashboard') },
    { label: 'About', icon: 'pi pi-info-circle', command: () => navigate('/about') },
    { label: 'Contact', icon: 'pi pi-envelope', command: () => navigate('/contact') },
    { label: 'Profile', icon: 'pi pi-user', command: () => navigate('/profile') },
  ];

const end = user ? (
  <Box className="header-end">
    <span className="welcome-message">👋 {user.email.split('@')[0]}</span>
    <button className="header-btn logout-btn" onClick={handleLogout}>
      <i className="pi pi-sign-out"></i> Logout
    </button>
  </Box>
) : (
  <Box className="header-end">
    <button className="header-btn login-btn" onClick={() => navigate('/login')}>
      <i className="pi pi-sign-in"></i> Login
    </button>
    <button className="header-btn signup-btn" onClick={() => navigate('/signup')}>
      <i className="pi pi-user-plus"></i> Signup
    </button>
  </Box>
);


  return (
    <AppBar position="static" className="header" data-aos="fade-down">
      <Toolbar className="header-toolbar" >
        <Box className="logo-box" onClick={() => navigate('/')}>
          <img
            //src="https://cdn-icons-png.flaticon.com/512/927/927567.png" // 🔗 Free blood icon from flaticon
            src="/assets/logo.jpg" // Local logo image
            alt="Blood Logo"
            className="logo-image"
            data-aos="zoom-in"
          />
          <Typography variant="h6" className="header-title" data-aos="fade-right">
            Blood Donation Tracker
          </Typography>
        </Box>
        <Menubar model={items} end={end} className="custom-menubar" data-aos="zoom-in" />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
