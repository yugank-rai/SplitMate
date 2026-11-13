import { useState, useRef, useEffect } from 'react';
import { Bell, Check, Trash2, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import useNotifications from '../../hooks/useNotifications.js';
import { markAsReadApi, deleteNotificationApi } from '../../api/notificationApi.js';
import { getNotificationIcon } from '../../utils/appIcons.jsx';
import '../../styles/notifications.css';

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAllRead, markOneRead, removeNotification } = useNotifications();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await markAsReadApi(id);
      markOneRead(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await deleteNotificationApi(id);
      removeNotification(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNotifClick = async (notif) => {
    if (!notif.isRead) await handleMarkRead(notif._id);
    if (notif.group?._id) navigate(`/groups/${notif.group._id}`);
    setOpen(false);
  };

  return (
    <div className='notif-bell-wrap' ref={dropdownRef}>
      <button
        className='nav-icon-btn'
        onClick={() => setOpen(!open)}
        aria-label='Notifications'
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className='notif-badge'>{unreadCount > 9 ? '9+' : unreadCount}</span>
        )}
      </button>

      {open && (
        <div className='notif-dropdown'>
          <div className='notif-dropdown-header'>
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button className='notif-mark-all' onClick={markAllRead}>
                <Check size={13} /> Mark all read
              </button>
            )}
          </div>

          <div className='notif-list'>
            {notifications.length === 0 ? (
              <div className='notif-empty'>
                <div className='empty-icon-circle'>
                  <Bell size={20} strokeWidth={1.75} />
                </div>
                <p className='empty-title'>No notifications</p>
                <p className='empty-sub'>You're all caught up with group updates.</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif._id}
                  className={`notif-item ${!notif.isRead ? 'notif-unread' : ''}`}
                  onClick={() => handleNotifClick(notif)}
                >
                  <div className='notif-item-icon'>
                    {getNotificationIcon(notif.type, 16)}
                  </div>
                  <div className='notif-item-content'>
                    <p className='notif-item-message'>{notif.message}</p>
                    {notif.group && (
                      <p className='notif-item-group'>
                        {notif.group.name}
                      </p>
                    )}
                    <p className='notif-item-time'>
                      {formatDistanceToNow(new Date(notif.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <button
                    className='notif-delete-btn'
                    onClick={(e) => handleDelete(e, notif._id)}
                    aria-label='Delete notification'
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className='notif-footer'>
            <button onClick={() => { navigate('/notifications'); setOpen(false); }}>
              <span>View all notifications</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
