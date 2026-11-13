import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Receipt,
  ArrowLeftRight,
  Bell,
  UserCircle,
  X,
} from 'lucide-react';
import BrandLogo from './BrandLogo.jsx';
import '../../styles/sidebar.css';

const navItems = [
  { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { to: '/groups', icon: <Users size={18} />, label: 'Groups' },
  { to: '/expenses', icon: <Receipt size={18} />, label: 'Expenses' },
  { to: '/balances', icon: <ArrowLeftRight size={18} />, label: 'Balances' },
  { to: '/notifications', icon: <Bell size={18} />, label: 'Notifications' },
  { to: '/profile', icon: <UserCircle size={18} />, label: 'Profile' },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div className='sidebar-overlay' onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className='sidebar-header'>
          <BrandLogo size={24} />
          <button className='sidebar-close' onClick={onClose} aria-label='Close sidebar'>
            <X size={18} />
          </button>
        </div>

        <nav className='sidebar-nav'>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? 'sidebar-item-active' : ''}`
              }
              onClick={onClose}
            >
              <span className='sidebar-item-icon'>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className='sidebar-footer'>
          <div className='sidebar-status-pill'>
            <span className='sidebar-status-dot' />
            <span>SplitMate Standard</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
