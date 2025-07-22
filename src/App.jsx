import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DonationCenters from './pages/DonationCenters';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import DonorDashboard from './pages/DonorDashboard';
import SearchDonors from './pages/SearchDonors';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donation-centers" element={<DonationCenters />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<DonorDashboard />} />
        <Route path="/search-donors" element={<SearchDonors />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;