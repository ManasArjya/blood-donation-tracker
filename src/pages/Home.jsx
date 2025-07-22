import { useState } from 'react';
import { Carousel } from 'primereact/carousel';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../index.css';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


function Home() {
  useEffect(() => {
  AOS.init({ duration: 1000 }); // animation duration in ms
}, []);

  const [isHovered, setIsHovered] = useState(false);

  const carouselItems = [
    { title: 'Save Lives', description: 'Donate blood and make a difference.', icon: 'pi pi-heart' },
    { title: 'Find Centers', description: 'Locate nearby donation centers.', icon: 'pi pi-map-marker' },
    { title: 'Track Donations', description: 'Monitor your donation history.', icon: 'pi pi-chart-line' },
    { title: 'Earn Rewards', description: 'Get recognition for regular donations.', icon: 'pi pi-star' },
    { title: 'Be a Hero', description: 'Each drop you give is a life you save.', icon: 'pi pi-users' },
  ];

  const carouselTemplate = (item) => (
    <Card className="custom-card-secondary moving-card">
      <Box className="carousel-item">
        <i className={item.icon} style={{ fontSize: '2rem', color: '#d32f2f' }}></i>
        <Typography variant="h6" color="#d32f2f">{item.title}</Typography>
        <Typography variant="body2">{item.description}</Typography>
      </Box>
    </Card>
  );

  return (
    <Box className="home-container" >
      <Container maxWidth="lg">
        {/* HERO SECTION */}
        <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', borderRadius: 2, mb: 6, mt: 6}}>
          <Typography variant="h2" sx={{ color: '#d32f2f', mb: 2,  mt: 2, zIndex: 0, position: 'relative',}} data-aos="fade-up" >
            Welcome to Blood Donation Tracker
          </Typography>
          <Typography variant="h6" sx={{ color: '#555', mb: 3 }} data-aos="fade-up">
            Join our community to save lives by tracking, locating, and managing blood donations.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap', mb: 3 }} data-aos="zoom-in">
            <Button
              label="Find Donation Centers"
              icon="pi pi-map-marker"
              className="p-button-raised p-button-lg animate-button large-btn"
              onClick={() => window.location.href = '/donation-centers'}
            />
            <Button
              label="Join Now"
              icon="pi pi-user-plus"
              severity="secondary"
              className="p-button-raised p-button-lg p-button-secondary animate-button large-btn"
              onClick={() => window.location.href = '/signup'}
            />
          </Box>
          <img
            //src="https://images.unsplash.com/photo-1603032401344-7b7fd04b8d10?auto=format&fit=crop&w=1050&q=80"
            src="/assets/blood-donor-bag.jpg" // Local image for blood donation campaign
            alt="Blood Donation Campaign"
            style={{ maxWidth: '100%', borderRadius: '8px' }}
            referrerPolicy="no-referrer"
            data-aos="fade-up"
          />

        </Paper>

        {/* WHY JOIN US / FEATURES */}
        <Grid container spacing={3} sx={{ mb: 6 }} data-aos="zoom-in">
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: '#d32f2f' }}>
              Why Join Us?
            </Typography>
            <Carousel
              value={carouselItems}
              numVisible={3}
              numScroll={1}
              itemTemplate={carouselTemplate}
              className="custom-carousel auto-carousel"
              autoplayInterval={3000}
              circular
            />
          </Grid>
        </Grid>

        {/* OUR MISSION */}
        <Grid container spacing={4} alignItems="center" sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <img
              src="/assets/ourmission.jpg" 
              alt="Our Mission"
              style={{ width: '70%', borderRadius: '8px' }}
              data-aos="zoom-in"
            />
          </Grid>
          <Grid item xs={12} md={6} data-aos="fade-up">
            <Typography variant="h4" color="#d32f2f" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              We aim to build a connected network of blood donors and recipients. Our platform helps hospitals, blood banks, and individuals coordinate blood donations efficiently and reliably.
            </Typography>
            <Typography variant="body1">
              Whether you're donating for the first time or are a regular contributor, this tracker keeps everything in one place — your past donations, available centers, and upcoming drives.
            </Typography>
          </Grid>
        </Grid>

        {/* GET INVOLVED SECTION */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 6 }} data-aos="fade-up">
          <Typography variant="h4" align="center" sx={{ color: '#d32f2f', mb: 2 }}>
            Get Involved Today
          </Typography>
          <Typography align="center" sx={{ mb: 3 }}>
            Be the reason someone gets a second chance at life. Register, donate, and inspire others to give.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              label="Become a Donor"
              icon="pi pi-heart"
              className="p-button-xl p-button-outlined p-button-danger themed-button custom-icon-button"
              onClick={() => window.location.href = user ? '/profile' : '/login'}
              data-aos="zoom-in"
            />
            <Button
              label="Contact Us"
              icon="pi pi-envelope"
              className="p-button-xl p-button-outlined p-button-danger themed-button custom-icon-button"
              onClick={() => window.location.href = '/contact'}
              data-aos="zoom-in"
            />


          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Home;
