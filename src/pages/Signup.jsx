import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../index.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), { email, isAdmin: false });
      navigate('/');
      window.scrollTo(0, 0);
    } catch (err) {
      setError('Signup failed: ' + err.message);
    }
  };

  return (
    <Grid container className="signup-page">
      {/* Left Image */}
      <Grid item xs={12} md={6} className="signup-image" data-aos="fade-right">
        <img
          src="/assets/signup.jpg"
          alt="Blood Donation"
        />
      </Grid>

      {/* Signup Form */}
      <Grid item xs={12} md={6} className="signup-form" data-aos="fade-left">
        <Paper elevation={3} className="form-card">
          <Typography variant="h4" color="#d32f2f" gutterBottom>Signup</Typography>
          {error && <Message severity="error" text={error} style={{ marginBottom: '10px' }} />}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="body1">Email</Typography>
              <InputText
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-inputtext"
                placeholder="Enter your email"
              />
            </Box>
            <Box>
              <Typography variant="body1">Password</Typography>
              <InputText
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-inputtext"
                placeholder="Enter password"
              />
            </Box>
            <Box>
              <Typography variant="body1">Confirm Password</Typography>
              <InputText
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-inputtext"
                placeholder="Re-enter password"
              />
            </Box>
            <Button
              label="Signup"
              icon="pi pi-user-plus"
              className="p-button-danger full-button"
              onClick={handleSignup}
            />
            <Button
              label="Login"
              icon="pi pi-sign-in"
              className="p-button-outlined full-button"
              onClick={() => navigate('/login')}
            />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Signup;
