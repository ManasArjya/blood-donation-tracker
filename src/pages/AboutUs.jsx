import { Box, Typography, Paper } from '@mui/material';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../index.css';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function AboutUs() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const testimonials = [
    {
      name: "Ravi Kumar",
      quote: "Thanks to this platform, I was able to find donors quickly during an emergency. Forever grateful!",
    },
    {
      name: "Anjali Sharma",
      quote: "Organizing our college blood camp was easy and efficient using this app. Great initiative!",
    },
    {
      name: "Dr. Neha Mehta",
      quote: "As a medical professional, this tool helps track and appreciate donors who save lives regularly.",
    },
  ];

  const images = [
    "/assets/camp1.jpg",
    "/assets/camp2.gif",
    "/assets/camp3.jpg",
    "/assets/camp4.jpg",
    "/assets/camp5.jpg",
    "/assets/camp6.jpeg",
    "/assets/camp7.JPG",
    "/assets/camp8.jpg",
    "/assets/camp9.webp",
    "/assets/camp10.jpg",
  ];

  return (
    <Box className="about-container">
      <Paper elevation={3} className="about-section">
        <Typography variant="h4" className="section-title" data-aos="fade-up">About Us</Typography>
        <Typography variant="body1" className="section-text">
          <br/>At Blood Donation Tracker, we are driven by a single, powerful mission — to save lives by simplifying and modernizing the way blood donations are tracked, managed, and encouraged. With thousands of lives lost every year due to the unavailability of timely blood transfusions, we recognized a critical gap in the healthcare system — and decided to bridge it with technology.
          Our platform empowers individuals, medical institutions, and blood banks by providing a seamless way to connect blood donors with recipients, organize donation drives, and track donation history all in one place. Whether you are a first-time donor or a regular lifesaver, our goal is to support your journey with clarity, purpose, and reward.
          We understand that blood is not just a resource — it's a gift of life. That’s why we’ve built a transparent, accessible, and secure ecosystem that encourages voluntary blood donation and ensures that no one suffers due to its shortage.
          Our features are built with compassion and community in mind:<br /><br />
          🔍 Smart Matching System – to instantly connect compatible donors and recipients.<br />
          
          📍 Real-Time Alerts – for urgent requirements in your area.<br />
          
          🏥 Verified Donation Camps – easily locate nearby donation events.<br />
          
          📊 Personal Dashboard – track your donation history, badges, and eligibility.<br />
          
          🎖 Donor Recognition – because heroes deserve to be acknowledged.<br /><br /> 
          
          More than just an app, Blood Donation Tracker is a movement — uniting individuals, hospitals, and communities across India. We work closely with NGOs, college volunteers, hospitals, and government health departments to raise awareness and improve the efficiency of blood distribution.
          As we grow, we continue to innovate with the belief that every contribution matters. Behind every feature we develop and every alert we send, there’s a life that could be saved — and that’s the true heartbeat of our mission.
          Join us today. Be a part of the change. Be the reason someone lives tomorrow.<br />
        </Typography>
        <Typography variant="body1" className="section-text">
          Join our community to find donation centers, track your donations, and make a difference across India.
          Whether you’re a regular donor or donating for the first time, we make it easy to give the gift of life.
        </Typography>
      </Paper>

      {/* Testimonials Section */}
      <Paper elevation={3} className="testimonial-section" data-aos="fade-up">
        <Typography variant="h5" className="section-title">What People Say</Typography>
        <Box className="testimonial-carousel">
          {testimonials.map((t, index) => (
            <Box className="testimonial-card" key={index} data-aos="fade-up">
              <Typography variant="body1" className="testimonial-quote">“{t.quote}”</Typography>
              <Typography variant="subtitle2" className="testimonial-name">— {t.name}</Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Gallery Section */}
      <Paper elevation={3} className="gallery-section" data-aos="fade-up">
        <Typography variant="h5" className="section-title">Blood Donation Camps</Typography>
        <Box className="gallery-carousel">
          {images.map((src, i) => (
            <img key={i} src={src} alt={`Camp ${i + 1}`} className="gallery-image" data-aos="zoom-in" />
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

export default AboutUs;
