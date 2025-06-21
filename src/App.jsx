import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/common/Home.jsx';
import Login from './pages/auth/Login.jsx';
import Signup from './pages/auth/Signup.jsx';
import Listing from './pages/common/Listing.jsx';
import About from './pages/common/About.jsx';
import Privacy from './pages/common/Privacy.jsx';
import Terms from './pages/common/Terms.jsx';
import HostDashboard from './pages/host/HostDashboard.jsx';
import GuestDashboard from './pages/guest/GuestDashboard.jsx';
import Contact from './pages/common/Contact.jsx';
import FAQ from './pages/common/FAQ.jsx';
import Messages from './pages/common/Messages.jsx';
import Bookings from './pages/common/Bookings.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add more routes as needed */}
            <Route path="/listings" element={<Listing />} />
            <Route path="/bookings" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Bookings Page Coming Soon</h1></div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/about" element = {<About />} />
            <Route path="/privacy" element = {<Privacy />} />
            <Route path="/terms" element = {<Terms />} />
            <Route path="/hostdashboard" element = {<HostDashboard />} />
            <Route path="/guestdashboard" element = {<GuestDashboard />} />
            <Route path="/contact" element = {<Contact />} />
            <Route path="/faq" element = {<FAQ />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/bookings" element={<Bookings />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;