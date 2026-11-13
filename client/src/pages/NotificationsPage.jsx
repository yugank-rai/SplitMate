import { Check, Trash2, Bell } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/common/DashboardLayout.jsx';
import useNotifications from '../hooks/useNotifications.js';
import { markAsReadApi, deleteNotificationApi } from '../api/notificationApi.js';
import { getNotificationIcon } from '../utils/appIcons.jsx';
import '../styles/notifications.css';

const TYPE_LABELS = {
  expense_added:   'Expense Added',
  expense_deleted: 'Expense Deleted',
  settled_up:      'Settled Up',
  group_joined:    'Group Joined',
  member_added:    'Member Added',
};

const NotificationsPage = () => {
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    markAllRead,
    markOneRead,
    removeNotification,
  } = useNotifications();

  const handleMarkRead = async (id) => {
    try {
      await markAsReadApi(id);
      markOneRead(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotificationApi(id);
      removeNotification(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = async (notif) => {
    if (!notif.isRead) await handleMarkRead(notif._id);
    if (notif.group?._id) navigate(`/groups/${notif.group._id}`);
  };

  return (
    <DashboardLayout>
      <div className='notifications-page'>
        <div className='page-header'>
          <div>
            <h1>Notifications</h1>
            <p>{unreadCount > 0 ? `${unreadCount} unread update${unreadCount > 1 ? 's' : ''}` : 'All caught up'}</p>
          </div>
          {unreadCount > 0 && (
            <button className='btn btn-outline' onClick={markAllRead}>
              <Check size={15} /> Mark all read
            </button>
          )}
        </div>

        <div className='notifications-list card'>
          {notifications.length === 0 ? (
            <div className='notif-page-empty'>
              <div className='empty-icon-circle'>
                <Bell size={24} strokeWidth={1.75} />
              </div>
              <h3>No notifications yet</h3>
              <p>When someone logs a new bill or records a settlement, you will see it here.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif._id}
                className={`notif-page-item ${!notif.isRead ? 'notif-page-unread' : ''}`}
                onClick={() => handleClick(notif)}
              >
                <div className='notif-page-icon'>
                  {getNotificationIcon(notif.type, 18)}
                </div>

                <div className='notif-page-content'>
                  <div className='notif-page-top'>
                    <span className='notif-type-label'>
                      {TYPE_LABELS[notif.type] || 'Activity'}
                    </span>
                    {!notif.isRead && (
                      <span className='notif-unread-dot' />
                    )}
                  </div>
                  <p className='notif-page-message'>{notif.message}</p>
                  {notif.group && (
                    <p className='notif-page-group'>
                      {notif.group.name}
                    </p>
                  )}
                  <p className='notif-page-time'>
                    {formatDistanceToNow(new Date(notif.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>

                <div className='notif-page-actions'>
                  {!notif.isRead && (
                    <button
                      className='notif-read-btn'
                      onClick={(e) => { e.stopPropagation(); handleMarkRead(notif._id); }}
                      title='Mark as read'
                      aria-label='Mark as read'
                    >
                      <Check size={14} />
                    </button>
                  )}
                  <button
                    className='notif-del-btn'
                    onClick={(e) => { e.stopPropagation(); handleDelete(notif._id); }}
                    title='Delete'
                    aria-label='Delete'
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;
