import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [open, setOpen] = useState(window.innerWidth <= 768 ? false : true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);
  const [userInfo, setUserInfo] = useState({
    full_name: '',
    email: '',
    department: '',
    phone: ''
  });

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setOpen(!mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
        setShowProfileTooltip(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const role = localStorage.getItem('role');
  let full_name = '';
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      full_name = payload.full_name || '';
    }
  } catch (e) {
    full_name = '';
  }

  const showLoginBtn = !isLoggedIn && location.pathname !== '/login';
  const showRegisterBtn = isLoggedIn && role === 'admin';

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img src="/public/VMC_Logo.png" alt="VMC Chatbot Logo" className="header__logo-img" />
        </div>

        <button className="header__menu-btn" onClick={() => setOpen(o => !o)} aria-label="Mở menu">
          <span className="header__menu-icon"><span></span><span></span><span></span></span>
        </button>

        {open && (
          <nav className={`header__nav${open ? ' open' : ''}`}>
            <a href="#gioi-thieu" className="header__nav-link" onClick={() => setOpen(false)}>Giới thiệu</a>
            <a href="#minh-hoa" className="header__nav-link" onClick={() => setOpen(false)}>Ảnh minh họa</a>
            <a href="#lien-he" className="header__nav-link" onClick={() => setOpen(false)}>Liên hệ</a>
          </nav>
        )}
        {!isMobile && (
          <nav className={`header__nav`}>
            <a href="#gioi-thieu" className="header__nav-link" onClick={() => setOpen(false)}>Giới thiệu</a>
            <a href="#minh-hoa" className="header__nav-link" onClick={() => setOpen(false)}>Ảnh minh họa</a>
            <a href="#lien-he" className="header__nav-link" onClick={() => setOpen(false)}>Liên hệ</a>
          </nav>
        )}

        {showLoginBtn && (
          <div className="header__login-btn">
            <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
          </div>
        )}

        {isLoggedIn && (
          <div className="header__profile" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {showRegisterBtn && (
              <button className="login-btn" onClick={() => navigate('/register')}>Register</button>
            )}

            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <div
                className="profile-box"
                style={{
                  padding: '0.5rem 1rem',
                  background: '#fff',
                  borderRadius: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
                onClick={() => setOpenDropdown(o => !o)}
              >
                👤 {full_name}
              </div>

              {openDropdown && (
                <div
                  className="dropdown-menu"

                >
                  <button className="dropdown-item" onClick={() => navigate('/change-password')}>Đổi mật khẩu</button>

                  <button
                    className="dropdown-item"
                    onClick={() => {
                      const token = localStorage.getItem('token');
                      if (token) {
                        const payload = JSON.parse(atob(token.split('.')[1]));
                        setUserInfo({
                          full_name: payload.full_name || '',
                          email: payload.email || '',
                          department: payload.department || '',
                          phone: payload.sub || ''
                        });
                      }
                      setShowProfileTooltip(prev => !prev);
                    }}
                  >
                    Thông tin cá nhân
                  </button>

                  <button
                    className="dropdown-item"
                    onClick={() => {
                      if (window.confirm('Bạn có chắc chắn muốn đăng xuất không?')) {
                        setIsLoggedIn(false);
                        navigate('/');
                        window.location.reload();
                        localStorage.removeItem('token');
                        localStorage.removeItem('role');
                      }
                    }}
                  >
                    Đăng xuất
                  </button>

                  {/* Tooltip mini thông tin cá nhân */}

                </div>
              )}
              {showProfileTooltip && (
                <div className="profile-tooltip">
                  <p><strong>{userInfo.full_name}</strong></p>
                  <p>{userInfo.email}</p>
                  <p>{userInfo.department}</p>
                  <p>{userInfo.phone}</p>
                  <button className="close-tooltip" onClick={() => setShowProfileTooltip(false)}>×</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
