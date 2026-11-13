import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Scale,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import DashboardLayout from '../components/common/DashboardLayout.jsx';
import { getGroupsApi } from '../api/groupApi.js';
import { getGroupBalancesApi } from '../api/settlementApi.js';
import { getGroupTypeIcon } from '../utils/appIcons.jsx';
import useAuth from '../hooks/useAuth.js';
import toast from 'react-hot-toast';

const BalancesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [groupBalances, setGroupBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalOwed, setTotalOwed] = useState(0);
  const [totalOwe, setTotalOwe] = useState(0);

  useEffect(() => {
    fetchAllBalances();
  }, []);

  const fetchAllBalances = async () => {
    try {
      const groups = await getGroupsApi();
      const balanceResults = await Promise.all(
        groups.map(async (group) => {
          const data = await getGroupBalancesApi(group._id);
          return {
            group,
            balances: data.balances,
            totalExpenses: data.totalExpenses,
          };
        })
      );

      let owed = 0;
      let owe = 0;
      balanceResults.forEach(({ balances }) => {
        balances.forEach((b) => {
          if (b.to._id === user?._id) owed += b.amount;
          if (b.from._id === user?._id) owe += b.amount;
        });
      });

      setTotalOwed(owed);
      setTotalOwe(owe);
      setGroupBalances(balanceResults.filter(r => r.balances.length > 0 || r.totalExpenses > 0));
    } catch (err) {
      toast.error('Failed to load balances');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div style={{ maxWidth: '920px', margin: '0 auto' }}>
        <div className='page-header'>
          <div>
            <h1>Overall Balances</h1>
            <p>Calculated net settlement positions across all your groups</p>
          </div>
        </div>

        {!loading && (
          <div className='dashboard-summary-banner card' style={{ marginBottom: '24px' }}>
            <div className='summary-net-col'>
              <span className='summary-caption'>Overall Net Position</span>
              <div className='summary-net-value-row'>
                <p className={`summary-net-amount ${totalOwed - totalOwe >= 0 ? 'text-positive' : 'text-negative'}`}>
                  {totalOwed - totalOwe >= 0 ? '+' : '-'}₹{Math.abs(totalOwed - totalOwe).toLocaleString()}
                </p>
                <span className={`summary-pill ${totalOwed - totalOwe >= 0 ? 'pill-positive' : 'pill-negative'}`}>
                  {totalOwed - totalOwe >= 0 ? 'Net Positive' : 'Payment Due'}
                </span>
              </div>
            </div>

            <div className='summary-divider-vertical' />

            <div className='summary-details-grid'>
              <div className='summary-metric-item'>
                <div className='summary-metric-icon icon-owed'>
                  <ArrowDownLeft size={16} />
                </div>
                <div>
                  <p className='summary-metric-title'>Total Owed to You</p>
                  <p className='summary-metric-num text-positive'>₹{totalOwed.toLocaleString()}</p>
                </div>
              </div>

              <div className='summary-metric-item'>
                <div className='summary-metric-icon icon-owe'>
                  <ArrowUpRight size={16} />
                </div>
                <div>
                  <p className='summary-metric-title'>Total You Owe</p>
                  <p className='summary-metric-num text-negative'>₹{totalOwe.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <div className='spinner' style={{ margin: '0 auto 12px' }} />
            <p style={{ fontSize: '14px' }}>Calculating group balances...</p>
          </div>
        ) : groupBalances.length === 0 ? (
          <div className='card' style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div className='empty-icon-circle' style={{ margin: '0 auto 12px', color: 'var(--accent)' }}>
              <CheckCircle2 size={24} strokeWidth={2} />
            </div>
            <p style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
              All balances settled
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
              There are no pending debts or reimbursements across any of your groups.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {groupBalances.map(({ group, balances, totalExpenses }) => (
              <div key={group._id} className='card' style={{ padding: '22px' }}>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', marginBottom: '16px',
                  flexWrap: 'wrap', gap: '12px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(26, 86, 219, 0.08)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {getGroupTypeIcon(group.type, 18)}
                    </div>
                    <div>
                      <p style={{ fontWeight: '700', fontSize: '15.5px', color: 'var(--text-primary)' }}>
                        {group.name}
                      </p>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {group.members.length} members • Total spend: ₹{totalExpenses.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <button
                    className='btn btn-outline'
                    style={{ fontSize: '13px', padding: '6px 14px' }}
                    onClick={() => navigate(`/groups/${group._id}`)}
                  >
                    View Details →
                  </button>
                </div>

                {balances.length === 0 ? (
                  <div style={{
                    padding: '12px 16px',
                    background: 'rgba(0, 169, 157, 0.08)',
                    border: '1px solid rgba(0, 169, 157, 0.2)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    color: 'var(--accent)',
                    fontWeight: '600',
                    fontSize: '13px',
                  }}>
                    <CheckCircle2 size={16} /> All settled up in this group
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {balances.map((balance, i) => {
                      const isMyDebt = balance.from._id === user?._id;
                      const isOwedToMe = balance.to._id === user?._id;

                      return (
                        <div key={i} style={{
                          display: 'flex', alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 14px',
                          background: '#FFFFFF',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-sm)',
                          gap: '12px',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                              width: '32px', height: '32px', borderRadius: '50%',
                              background: '#1A56DB',
                              color: '#FFFFFF', display: 'flex', alignItems: 'center',
                              justifyContent: 'center', fontWeight: '700', fontSize: '13px',
                            }}>
                              {balance.from?.name?.charAt(0).toUpperCase()}
                            </div>

                            <ArrowRight size={15} color='var(--text-muted)' />

                            <div style={{
                              width: '32px', height: '32px', borderRadius: '50%',
                              background: '#00A99D',
                              color: '#FFFFFF', display: 'flex', alignItems: 'center',
                              justifyContent: 'center', fontWeight: '700', fontSize: '13px',
                            }}>
                              {balance.to?.name?.charAt(0).toUpperCase()}
                            </div>

                            <p style={{ fontSize: '13.5px', color: 'var(--text-primary)' }}>
                              <strong>{isMyDebt ? 'You' : balance.from?.name}</strong>
                              {' '}owe{isMyDebt ? '' : 's'}{' '}
                              <strong>{isOwedToMe ? 'you' : balance.to?.name}</strong>
                            </p>
                          </div>

                          <p style={{
                            fontSize: '16px', fontWeight: '800',
                            color: isMyDebt ? 'var(--danger)' : isOwedToMe ? 'var(--accent)' : 'var(--text-primary)',
                          }}>
                            ₹{balance.amount.toLocaleString()}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BalancesPage;
