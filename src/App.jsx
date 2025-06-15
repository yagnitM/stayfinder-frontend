import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add more routes as needed */}
            <Route path="/listings" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Listings Page Coming Soon</h1></div>} />
            <Route path="/bookings" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Bookings Page Coming Soon</h1></div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;