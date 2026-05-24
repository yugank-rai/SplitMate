import useAuth from '../hooks/useAuth.js';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  return (
    <div style={{ padding: '40px' }}>
      <h1>Welcome, {user?.name}! 🎉</h1>
      <p>Dashboard coming soon...</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default DashboardPage;