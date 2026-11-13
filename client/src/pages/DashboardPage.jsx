import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Users,
  Receipt,
  PieChart,
  TrendingUp,
  CreditCard,
  Plus,
} from 'lucide-react';
import DashboardLayout from '../components/common/DashboardLayout.jsx';
import SpendingPieChart from '../components/dashboard/SpendingPieChart.jsx';
import MonthlyBarChart from '../components/dashboard/MonthlyBarChart.jsx';
import ActivityFeed from '../components/dashboard/ActivityFeed.jsx';
import useAuth from '../hooks/useAuth.js';
import {
  getDashboardStatsApi,
  getSpendingByCategoryApi,
  getMonthlyTrendApi,
} from '../api/statsApi.js';
import '../styles/dashboard.css';

const DashboardPage = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [statsData, pieData, barData] = await Promise.all([
        getDashboardStatsApi(),
        getSpendingByCategoryApi(),
        getMonthlyTrendApi(),
      ]);
      setStats(statsData);
      setPieData(pieData);
      setBarData(barData);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const netBalance = (stats?.totalOwed || 0) - (stats?.totalOwe || 0);

  return (
    <DashboardLayout>
      <div className='dashboard'>
        <div className='dashboard-header'>
          <div>
            <h1>Overview</h1>
            <p>Welcome back, {user?.name?.split(' ')[0]}. Here is your current financial summary.</p>
          </div>
          <Link to='/groups' className='btn btn-primary'>
            <Plus size={16} /> Add Expense
          </Link>
        </div>

        {/* Unified Financial Summary Panel (Replaces generic 3 cards in a row) */}
        {loading ? (
          <div className='dashboard-summary-banner skeleton' style={{ height: '110px', marginBottom: '24px' }} />
        ) : (
          <div className='dashboard-summary-banner card'>
            <div className='summary-net-col'>
              <span className='summary-caption'>Overall Net Position</span>
              <div className='summary-net-value-row'>
                <p className={`summary-net-amount ${netBalance >= 0 ? 'text-positive' : 'text-negative'}`}>
                  {netBalance >= 0 ? '+' : '-'}₹{Math.abs(netBalance).toLocaleString()}
                </p>
                <span className={`summary-pill ${netBalance >= 0 ? 'pill-positive' : 'pill-negative'}`}>
                  {netBalance >= 0 ? 'Net Positive' : 'Payment Due'}
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
                  <p className='summary-metric-title'>Owed to You</p>
                  <p className='summary-metric-num text-positive'>₹{(stats?.totalOwed || 0).toLocaleString()}</p>
                </div>
              </div>

              <div className='summary-metric-item'>
                <div className='summary-metric-icon icon-owe'>
                  <ArrowUpRight size={16} />
                </div>
                <div>
                  <p className='summary-metric-title'>You Owe</p>
                  <p className='summary-metric-num text-negative'>₹{(stats?.totalOwe || 0).toLocaleString()}</p>
                </div>
              </div>

              <div className='summary-metric-item'>
                <div className='summary-metric-icon icon-groups'>
                  <Users size={16} />
                </div>
                <div>
                  <p className='summary-metric-title'>Active Groups</p>
                  <p className='summary-metric-num'>{stats?.totalGroups || 0}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats Grid */}
        {!loading && (
          <div className='quick-stats'>
            <div className='quick-stat'>
              <div className='quick-stat-icon-wrapper'>
                <Receipt size={18} />
              </div>
              <div>
                <p className='quick-stat-value'>{stats?.totalExpenses || 0}</p>
                <p className='quick-stat-label'>Total Expenses</p>
              </div>
            </div>
            <div className='quick-stat'>
              <div className='quick-stat-icon-wrapper'>
                <PieChart size={18} />
              </div>
              <div>
                <p className='quick-stat-value'>{pieData.length}</p>
                <p className='quick-stat-label'>Categories Used</p>
              </div>
            </div>
            <div className='quick-stat'>
              <div className='quick-stat-icon-wrapper'>
                <TrendingUp size={18} />
              </div>
              <div>
                <p className='quick-stat-value'>
                  {barData.find(b => b.amount > 0)
                    ? `₹${Math.max(...barData.map(b => b.amount)).toLocaleString()}`
                    : '₹0'}
                </p>
                <p className='quick-stat-label'>Highest Month</p>
              </div>
            </div>
            <div className='quick-stat'>
              <div className='quick-stat-icon-wrapper'>
                <CreditCard size={18} />
              </div>
              <div>
                <p className='quick-stat-value'>
                  ₹{pieData.reduce((sum, d) => sum + d.value, 0).toLocaleString()}
                </p>
                <p className='quick-stat-label'>Total Spent</p>
              </div>
            </div>
          </div>
        )}

        {/* Charts Grid */}
        <div className='dashboard-charts'>
          <div className='chart-card'>
            <div className='card-title-row'>
              <h3>Spending by Category</h3>
            </div>
            {loading ? (
              <div className='chart-skeleton skeleton' />
            ) : pieData.length === 0 ? (
              <div className='chart-empty'>
                <div className='empty-icon-circle'>
                  <PieChart size={24} strokeWidth={1.75} />
                </div>
                <p className='empty-title'>No category breakdown yet</p>
                <p className='empty-sub'>Add categorized expenses in your groups to visualize spending.</p>
              </div>
            ) : (
              <SpendingPieChart data={pieData} />
            )}
          </div>

          <div className='chart-card'>
            <div className='card-title-row'>
              <h3>Monthly Spending Trend</h3>
            </div>
            {loading ? (
              <div className='chart-skeleton skeleton' />
            ) : (
              <MonthlyBarChart data={barData} />
            )}
          </div>
        </div>

        {/* Activity Feed */}
        <div className='dashboard-activity card'>
          <div className='activity-header'>
            <h3>Recent Group Activity</h3>
            <Link to='/groups' className='activity-view-all'>
              View all groups →
            </Link>
          </div>
          {loading ? (
            <div className='activity-skeleton skeleton' />
          ) : (
            <ActivityFeed activities={stats?.activity || []} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
