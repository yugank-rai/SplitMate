import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, LogOut, User, Menu, X } from 'lucide-react';
import useAuth from '../../hooks/useAuth.js';
import '../../styles/navbar.css';

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        <button className='menu-btn' onClick={onMenuClick}>
          <Menu size={22} />
        </button>
        <Link to='/dashboard' className='navbar-brand'>
          <span>💸</span>
          <span>SplitMate</span>
        </Link>
      </div>

      <div className='navbar-right'>
        <Link to='/notifications' className='nav-icon-btn'>
          <Bell size={20} />
          <span className='notif-badge'>3</span>
        </Link>

        <div className='nav-avatar-wrap'>
          <button
            className='nav-avatar-btn'
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {user?.avatar ? (
              <img src={user.avatar} alt='avatar' className='nav-avatar' />
            ) : (
              <div className='nav-avatar-placeholder'>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </button>

          {dropdownOpen && (
            <div className='nav-dropdown'>
              <div className='nav-dropdown-header'>
                <p className='nav-dropdown-name'>{user?.name}</p>
                <p className='nav-dropdown-email'>{user?.email}</p>
              </div>
              <Link
                to='/profile'
                className='nav-dropdown-item'
                onClick={() => setDropdownOpen(false)}
              >
                <User size={16} /> Profile
              </Link>
              <button
                className='nav-dropdown-item nav-dropdown-logout'
                onClick={handleLogout}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;