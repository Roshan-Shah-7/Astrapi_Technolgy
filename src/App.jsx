// App.jsx (corrected)
import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Removed BrowserRouter import
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

const App = () => {
    return (
        // Removed <Router> wrapper
        <main className='max-w-[1920px] m-auto'>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </main>
    );
};

export default App;
