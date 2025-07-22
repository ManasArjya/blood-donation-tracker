import { Box, Typography, Link } from '@mui/material';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../index.css';

function Footer() {
  return (
    <Box className="footer" >
      <Box className="footer-content">
        <Typography variant="body2" color="white">
          © 2025 Blood Donation Tracker. All rights reserved.
        </Typography>
        <Box className="footer-links">
          <Link href="/about" color="inherit" className="footer-link">About Us</Link>
          <Link href="/contact" color="inherit" className="footer-link">Contact</Link>
          <Link href="/privacy" color="inherit" className="footer-link">Privacy Policy</Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;