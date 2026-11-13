import { Inbox } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import '../../styles/dashboard.css';

const ActivityFeed = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className='activity-empty'>
        <div className='empty-icon-circle'>
          <Inbox size={24} strokeWidth={1.75} />
        </div>
        <p className='empty-title'>No recent activity yet</p>
        <p className='empty-sub'>Create a group and log expenses to track shared actions here.</p>
      </div>
    );
  }

  return (
    <div className='activity-list'>
      {activities.map((activity, index) => (
        <div key={index} className='activity-item'>
          <div className='activity-dot' />
          <div className='activity-content'>
            <p className='activity-text'>{activity.action}</p>
            <p className='activity-time'>
              {formatDistanceToNow(new Date(activity.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;
