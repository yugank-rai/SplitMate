import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserPlus, Trash2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import DashboardLayout from '../components/common/DashboardLayout.jsx';
import ExpenseCard from '../components/expenses/ExpenseCard.jsx';
import ExpenseForm from '../components/expenses/ExpenseForm.jsx';
import { getGroupByIdApi, addMemberApi, deleteGroupApi } from '../api/groupApi.js';
import { getExpensesApi, deleteExpenseApi } from '../api/expenseApi.js';
import useAuth from '../hooks/useAuth.js';
import '../styles/groups.css';
import '../styles/groupDetail.css';
import '../styles/expenses.css';

const GroupDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [group, setGroup] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [memberEmail, setMemberEmail] = useState('');
  const [addingMember, setAddingMember] = useState(false);

  useEffect(() => {
    fetchAll();
  }, [id]);

  const fetchAll = async () => {
    try {
      const [groupData, expenseData] = await Promise.all([
        getGroupByIdApi(id),
        getExpensesApi(id),
      ]);
      setGroup(groupData);
      setExpenses(expenseData);
    } catch (err) {
      toast.error('Failed to load group');
      navigate('/groups');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    setAddingMember(true);
    try {
      const updated = await addMemberApi(id, memberEmail);
      setGroup(updated);
      setMemberEmail('');
      setShowAddMember(false);
      toast.success('Member added!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add member');
    } finally {
      setAddingMember(false);
    }
  };

  const handleExpenseAdded = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
    setGroup((prev) => ({ ...prev, totalExpenses: prev.totalExpenses + 1 }));
  };

  const handleDeleteExpense = async (expenseId) => {
    if (!window.confirm('Delete this expense?')) return;
    try {
      await deleteExpenseApi(expenseId);
      setExpenses(expenses.filter((e) => e._id !== expenseId));
      setGroup((prev) => ({ ...prev, totalExpenses: prev.totalExpenses - 1 }));
      toast.success('Expense deleted');
    } catch (err) {
      toast.error('Failed to delete expense');
    }
  };

  const handleDeleteGroup = async () => {
    if (!window.confirm('Delete this group?')) return;
    try {
      await deleteGroupApi(id);
      toast.success('Group deleted');
      navigate('/groups');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete group');
    }
  };

  const isAdmin = group?.createdBy?._id === user?._id ||
    group?.createdBy === user?._id;

  if (loading) return (
    <DashboardLayout>
      <div className='loading-screen'><div className='spinner' /></div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className='group-detail'>

        {/* Header */}
        <div className='group-detail-header'>
          <button className='back-btn' onClick={() => navigate('/groups')}>
            <ArrowLeft size={20} /> Back
          </button>
          <div className='group-detail-title'>
            <span className='group-detail-icon'>{group?.icon}</span>
            <div>
              <h1>{group?.name}</h1>
              <p>{group?.type} • {group?.members?.length} members • {expenses.length} expenses</p>
            </div>
          </div>
          {isAdmin && (
            <button className='btn-danger-outline' onClick={handleDeleteGroup}>
              <Trash2 size={16} /> Delete Group
            </button>
          )}
        </div>

        <div className='group-detail-body'>

          {/* Members */}
          <div className='group-detail-members card'>
            <div className='card-header'>
              <h3>Members ({group?.members?.length})</h3>
              {isAdmin && (
                <button className='btn btn-outline' onClick={() => setShowAddMember(!showAddMember)}>
                  <UserPlus size={16} /> Add
                </button>
              )}
            </div>

            {showAddMember && (
              <form onSubmit={handleAddMember} className='add-member-form'>
                <input
                  type='email'
                  placeholder='Enter email'
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                  required
                />
                <button type='submit' className='btn btn-primary' disabled={addingMember}>
                  {addingMember ? '...' : 'Add'}
                </button>
              </form>
            )}

            <div className='member-list'>
              {group?.members?.map((m) => (
                <div key={m.user._id} className='member-item'>
                  <div className='member-avatar'>
                    {m.user?.avatar
                      ? <img src={m.user.avatar} alt={m.user.name} />
                      : m.user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className='member-info'>
                    <p className='member-name'>
                      {m.user?.name}
                      {m.user?._id === user?._id && <span className='member-you'> (You)</span>}
                    </p>
                    <p className='member-email'>{m.user?.email}</p>
                  </div>
                  <span className={`member-role member-role-${m.role}`}>{m.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expenses */}
          <div className='group-detail-expenses card'>
            <div className='card-header'>
              <h3>Expenses ({expenses.length})</h3>
              <button className='btn btn-primary' onClick={() => setShowExpenseForm(true)}>
                + Add Expense
              </button>
            </div>

            {expenses.length === 0 ? (
              <div className='expenses-empty'>
                <span>🧾</span>
                <p>No expenses yet</p>
                <p>Add the first expense to get started!</p>
              </div>
            ) : (
              <div className='expenses-list'>
                {expenses.map((expense) => (
                  <ExpenseCard
                    key={expense._id}
                    expense={expense}
                    onDelete={handleDeleteExpense}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Add Expense Modal */}
      {showExpenseForm && (
        <ExpenseForm
          onClose={() => setShowExpenseForm(false)}
          onExpenseAdded={handleExpenseAdded}
          group={group}
        />
      )}

    </DashboardLayout>
  );
};

export default GroupDetailPage;