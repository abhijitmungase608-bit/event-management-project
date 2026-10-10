import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import ExploreEvents from './pages/events/ExploreEvents';
import EventDetails from './pages/events/EventDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Services from './pages/Services';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans selection:bg-amber-500 selection:text-slate-950">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#ffffff',
              color: '#0f172a',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '13px',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
            },
          }}
        />

        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/events" element={<ExploreEvents />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
