import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import WhatsAppButton from './Components/WhatsAppButton';
import ScrollToTopButton from './Components/ScrollToTopButton';
import Home from './Pages/Home';
import Gallery from './Pages/Gallery';
import Videos from './Pages/Videos';
import About from './Pages/AboutUs';
import Contact from './Pages/ContactUs';
import './App.css';

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/Videos" element={<Videos />} />
        <Route path="/AboutUs" element={<About />} />
        <Route path="/ContactUs" element={<Contact />} />
      </Routes>
      <WhatsAppButton />
      <ScrollToTopButton />
      <Footer />
    </Router>
  );
}

export default App;

