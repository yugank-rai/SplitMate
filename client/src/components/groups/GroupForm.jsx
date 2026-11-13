import { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { createGroupApi } from '../../api/groupApi.js';
import { getGroupTypeIcon } from '../../utils/appIcons.jsx';
import '../../styles/groups.css';

const GROUP_TYPES = ['Trip', 'Home', 'Office', 'Other'];

const GroupForm = ({ onClose, onGroupCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Other',
    icon: 'Other',
  });
  const [loading, setLoading] = useState(false);

  const handleTypeChange = (type) => {
    setFormData({ ...formData, type, icon: type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const group = await createGroupApi(formData);
      toast.success(`Group "${group.name}" created!`);
      onGroupCreated(group);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create group');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h2>Create New Group</h2>
          <button className='modal-close' onClick={onClose} aria-label='Close'>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Group Name</label>
            <input
              type='text'
              placeholder='e.g. Goa Trip, Flat 402, Office Lunch...'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className='form-group'>
            <label>Group Type</label>
            <div className='group-type-selector'>
              {GROUP_TYPES.map((type) => (
                <button
                  key={type}
                  type='button'
                  className={`group-type-btn ${
                    formData.type === type ? 'group-type-btn-active' : ''
                  }`}
                  onClick={() => handleTypeChange(type)}
                >
                  <span className='group-type-btn-icon'>
                    {getGroupTypeIcon(type, 16)}
                  </span>
                  <span>{type}</span>
                </button>
              ))}
            </div>
          </div>

          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-outline'
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Group'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupForm;
