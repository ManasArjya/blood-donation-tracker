import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Box, Typography, Paper } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../index.css';

function Contact() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Submitted:', formData);
    alert('Message sent successfully!');
    // Clear fields
    setFormData({ name: '', email: '', message: '' });
    // Here you can connect to backend or email service
  };

  return (
    <Box className="contact-container" sx={{ p: 4 }}>
      <Paper elevation={4} className="custom-card" data-aos="fade-up" sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h4" color="#d32f2f" gutterBottom>
          Contact Us
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

          <Box data-aos="fade-up">
            <Typography variant="body1">Name</Typography>
            <InputText
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              style={{ width: '100%' }}
              placeholder="Enter your name"
            />
          </Box>

          <Box data-aos="fade-up" data-aos-delay="100">
            <Typography variant="body1">Email</Typography>
            <InputText
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              style={{ width: '100%' }}
              placeholder="Enter your email"
            />
          </Box>

          <Box data-aos="fade-up" data-aos-delay="200">
            <Typography variant="body1">Message</Typography>
            <InputTextarea
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              style={{ width: '100%' }}
              rows={5}
              placeholder="Enter your message"
            />
          </Box>

          <Box data-aos="zoom-in" data-aos-delay="300" sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              label="Send Message"
              icon="pi pi-send"
              className="p-button-danger contact-button"
              onClick={handleSubmit}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Contact;
