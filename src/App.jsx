import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Listing from './pages/Listing.jsx';
import About from './pages/About.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import HostDashboard from './pages/HostDashboard.jsx';

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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;