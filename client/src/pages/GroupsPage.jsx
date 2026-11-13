import { useState, useEffect } from 'react';
import { Plus, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import DashboardLayout from '../components/common/DashboardLayout.jsx';
import GroupCard from '../components/groups/GroupCard.jsx';
import GroupForm from '../components/groups/GroupForm.jsx';
import { getGroupsApi } from '../api/groupApi.js';
import '../styles/groups.css';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const data = await getGroupsApi();
      setGroups(data);
    } catch (err) {
      toast.error('Failed to load groups');
    } finally {
      setLoading(false);
    }
  };

  const handleGroupCreated = (newGroup) => {
    setGroups([newGroup, ...groups]);
  };

  return (
    <DashboardLayout>
      <div className='groups-page'>
        <div className='page-header'>
          <div>
            <h1>Groups</h1>
            <p>Organize shared expenses across flatmates, trips, and friends</p>
          </div>
          <button
            className='btn btn-primary'
            onClick={() => setShowForm(true)}
          >
            <Plus size={16} />
            Create Group
          </button>
        </div>

        {loading ? (
          <div className='groups-loading'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='group-card-skeleton skeleton' />
            ))}
          </div>
        ) : groups.length === 0 ? (
          <div className='groups-empty card'>
            <div className='empty-icon-circle'>
              <Users size={24} strokeWidth={1.75} />
            </div>
            <h3>No groups yet</h3>
            <p>Create a shared group to start logging expenses with other people.</p>
            <button
              className='btn btn-primary'
              onClick={() => setShowForm(true)}
              style={{ marginTop: '14px' }}
            >
              <Plus size={16} />
              Create First Group
            </button>
          </div>
        ) : (
          <div className='groups-grid'>
            {groups.map((group) => (
              <GroupCard key={group._id} group={group} />
            ))}
          </div>
        )}

        {showForm && (
          <GroupForm
            onClose={() => setShowForm(false)}
            onGroupCreated={handleGroupCreated}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default GroupsPage;
