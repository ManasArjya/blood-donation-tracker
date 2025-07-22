import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../index.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
      window.scrollTo(0, 0);
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
  };

  return (
    <Grid container className="auth-page">
      {/* Left Image Section */}
      <Grid item xs={12} md={6} className="auth-image" data-aos="fade-right">
        <img
          src="/assets/signup.jpg"
          alt="Blood Donation"
        />
      </Grid>

      {/* Right Form Section */}
      <Grid item xs={12} md={6} className="auth-form" data-aos="fade-left">
        <Paper elevation={3} className="form-card">
          <Typography variant="h4" color="#d32f2f" gutterBottom>Login</Typography>
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
            <Button
              label="Login"
              icon="pi pi-sign-in"
              className="p-button-danger full-button"
              onClick={handleLogin}
            />
            <Button
              label="Signup"
              icon="pi pi-user-plus"
              className="p-button-outlined full-button"
              onClick={() => navigate('/signup')}
            />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
