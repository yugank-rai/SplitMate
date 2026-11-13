import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Search, Receipt, Layers } from 'lucide-react';
import DashboardLayout from '../components/common/DashboardLayout.jsx';
import CategoryBadge from '../components/expenses/CategoryBadge.jsx';
import { getCategoryIcon } from '../utils/appIcons.jsx';
import { getAllExpensesApi } from '../api/expenseApi.js';
import useAuth from '../hooks/useAuth.js';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const CATEGORIES = ['All', 'Food', 'Travel', 'Rent', 'Shopping', 'Entertainment', 'Other'];

const AllExpensesPage = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    filterExpenses();
  }, [expenses, selectedCategory, searchQuery]);

  const fetchExpenses = async () => {
    try {
      const data = await getAllExpensesApi();
      setExpenses(data);
      const total = data.reduce((sum, e) => {
        const mySplit = e.splits?.find(s => s.user?._id === user?._id);
        return sum + (mySplit?.amount || 0);
      }, 0);
      setTotalSpent(total);
    } catch (err) {
      toast.error('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const filterExpenses = () => {
    let result = [...expenses];
    if (selectedCategory !== 'All') {
      result = result.filter(e => e.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      result = result.filter(e =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFiltered(result);
  };

  return (
    <DashboardLayout>
      <div style={{ maxWidth: '920px', margin: '0 auto' }}>
        <div className='page-header'>
          <div>
            <h1>All Expenses</h1>
            <p>Every recorded expense across your groups</p>
          </div>
        </div>

        {!loading && (
          <div className='card' style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 24px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '2px' }}>
                Your Aggregate Share
              </p>
              <p style={{ fontSize: '24px', fontWeight: '800', color: 'var(--danger)' }}>
                ₹{totalSpent.toLocaleString()}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 500 }}>
                  Total Expenses
                </p>
                <p style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>
                  {expenses.length}
                </p>
              </div>

              <div style={{ width: '1px', height: '32px', background: 'var(--border)' }} />

              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 500 }}>
                  Categories Used
                </p>
                <p style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>
                  {new Set(expenses.map(e => e.category)).size}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className='card' style={{ padding: '16px 20px', marginBottom: '20px' }}>
          <div style={{ position: 'relative', marginBottom: '14px' }}>
            <Search
              size={17}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}
            />
            <input
              type='text'
              placeholder='Search by expense title...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 38px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '14px',
                background: '#FFFFFF',
                color: 'var(--text-primary)',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  border: '1px solid',
                  borderColor: selectedCategory === cat ? 'var(--primary)' : 'var(--border)',
                  background: selectedCategory === cat ? 'var(--primary)' : '#FFFFFF',
                  color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-secondary)',
                  fontSize: '12.5px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {cat !== 'All' && getCategoryIcon(cat, 13, selectedCategory === cat ? '#FFFFFF' : 'currentColor')}
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Expense List */}
        <div className='card' style={{ padding: '12px' }}>
          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <div className='spinner' style={{ margin: '0 auto 12px' }} />
              <p style={{ fontSize: '14px' }}>Loading expenses...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{
              padding: '60px 20px',
              textAlign: 'center',
              color: 'var(--text-secondary)'
            }}>
              <div className='empty-icon-circle' style={{ margin: '0 auto 12px' }}>
                <Receipt size={24} strokeWidth={1.75} />
              </div>
              <p style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
                No expenses found
              </p>
              <p style={{ fontSize: '13px' }}>Try a different filter or record expenses within your groups.</p>
            </div>
          ) : (
            filtered.map((expense) => {
              const mySplit = expense.splits?.find(s => s.user?._id === user?._id);
              const paidByMe = expense.paidBy?._id === user?._id;

              return (
                <Link
                  key={expense._id}
                  to={`/groups/${expense.group?._id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '14px 16px',
                      borderBottom: '1px solid var(--border)',
                      transition: 'background 0.15s ease',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#FFFFFF'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{
                      width: '42px',
                      height: '42px',
                      background: '#FFFFFF',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary)',
                      flexShrink: 0,
                    }}>
                      {getCategoryIcon(expense.category, 20)}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <p style={{ fontWeight: '700', fontSize: '14.5px', color: 'var(--text-primary)' }}>
                          {expense.title}
                        </p>
                        <CategoryBadge category={expense.category} />
                      </div>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                          {format(new Date(expense.date), 'dd MMM yyyy')}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600' }}>
                          {expense.group?.name}
                        </p>
                      </div>
                      <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        Paid by <strong>{paidByMe ? 'You' : expense.paidBy?.name}</strong>
                      </p>
                    </div>

                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)' }}>
                        ₹{expense.amount.toLocaleString()}
                      </p>
                      {mySplit && (
                        <p style={{
                          fontSize: '12px',
                          fontWeight: '600',
                          color: paidByMe ? 'var(--accent)' : 'var(--danger)',
                        }}>
                          {paidByMe ? 'You paid' : `Your share: ₹${mySplit.amount.toLocaleString()}`}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AllExpensesPage;
