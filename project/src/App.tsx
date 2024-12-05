import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Downloads from './pages/Downloads';
import Rankings from './pages/Rankings';
import Support from './pages/Support';
import History from './pages/History';
import Wiki from './pages/Wiki';
import Footer from './components/Footer';
import React from 'react';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white" style={{

          backgroundImage: "url('/images/l2-header-baium.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/support" element={<Support />} />
            <Route path="/history" element={<History />} />
            <Route path="/wiki" element={<Wiki />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;