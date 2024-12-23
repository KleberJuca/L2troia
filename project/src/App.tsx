import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Downloads from './pages/Downloads';
import Rankings from './pages/Rankings';
import Support from './pages/Support';
import History from './pages/History';
import Wiki from './pages/Wiki';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Shop from './pages/Dashboard/Shop/Shop';
import Donation from './pages/Dashboard/Donation';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Footer from './components/Footer';
import React from 'react';
import Character from './pages/Dashboard/Character';
import AccountPage from './pages/Dashboard/Account/AccountPage';
import HistoryPage from './pages/Dashboard/History/HistoryPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white" style={{
          cursor: "url('/L2-Cursor.cur'), auto", // Define o cursor personalizado
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<HistoryPage />} />
              <Route path="shop" element={<Shop />} />
              <Route path="donation" element={<Donation />} />
              <Route path="character" element={<Character />} />
              <Route path="account" element={<AccountPage />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;