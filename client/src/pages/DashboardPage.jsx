import { useState, useEffect } from 'react';
import DashboardLayout from '../components/common/DashboardLayout.jsx';
import BalanceCard from '../components/dashboard/BalanceCard.jsx';
import SpendingPieChart from '../components/dashboard/SpendingPieChart.jsx';
import MonthlyBarChart from '../components/dashboard/MonthlyBarChart.jsx';
import ActivityFeed from '../components/dashboard/ActivityFeed.jsx';
import useAuth from '../hooks/useAuth.js';
import '../styles/dashboard.css';

// Dummy data (we'll replace with real API later)
const dummyPieData = [
  { name: 'Food', value: 3200 },
  { name: 'Travel', value: 5400 },
  { name: 'Rent', value: 8000 },
  { name: 'Shopping', value: 1200 },
  { name: 'Entertainment', value: 900 },
];

const dummyBarData = [
  { month: 'Jan', amount: 4200 },
  { month: 'Feb', amount: 3800 },
  { month: 'Mar', amount: 6100 },
  { month: 'Apr', amount: 2900 },
  { month: 'May', amount: 5200 },
  { month: 'Jun', amount: 4700 },
];

const dummyActivities = [
  { action: 'Rahul added ₹500 in Manali Trip', createdAt: new Date(Date.now() - 1000 * 60 * 5) },
  { action: 'Priya settled ₹600 with you', createdAt: new Date(Date.now() - 1000 * 60 * 60) },
  { action: 'You were added to Home Expenses', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { action: 'Amit added ₹1200 in Office Lunch', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48) },
];

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className='dashboard'>

        {/* Header */}
        <div className='dashboard-header'>
          <div>
            <h1>Hello, {user?.name?.split(' ')[0]} 👋</h1>
            <p>Here's your expense summary</p>
          </div>
          <button className='btn btn-primary'>+ Add Expense</button>
        </div>

        {/* Balance Cards */}
        <div className='balance-cards'>
          <BalanceCard
            title='Total You Are Owed'
            amount={user?.totalOwed || 1500}
            type='owed'
            icon='💰'
          />
          <BalanceCard
            title='Total You Owe'
            amount={user?.totalOwe || 800}
            type='owe'
            icon='💸'
          />
          <BalanceCard
            title='Total Settled'
            amount={3200}
            type='settled'
            icon='✅'
          />
        </div>

        {/* Charts Row */}
        <div className='dashboard-charts'>
          <div className='chart-card'>
            <h3>Spending by Category</h3>
            <SpendingPieChart data={dummyPieData} />
          </div>
          <div className='chart-card'>
            <h3>Monthly Spending</h3>
            <MonthlyBarChart data={dummyBarData} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className='dashboard-activity'>
          <h3>Recent Activity</h3>
          <ActivityFeed activities={dummyActivities} />
        </div>

      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;