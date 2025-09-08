import Header from './Header/Header';
import About from './About/About';
import Screenshot from './Screenshot/Screenshot';
import Contact from './Contact/Contact';
import Footer from './Footer/Footer';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ChangePassword from './Auth/ChangePassword';
import ChatbotWidget from './ChatbotWidget/ChatbotWidget';

import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const isLoggedIn = !!localStorage.getItem("token"); // kiểm tra login

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route
          path="/"
          element={
            <>
              <About />
              <Screenshot />
              <Contact />
              <Footer />
            </>
          }
        />
      </Routes>

      {/* 👉 chỉ render chatbot nếu đã login */}
      {isLoggedIn && <ChatbotWidget />}
    </Router>
  );
}

export default App;
