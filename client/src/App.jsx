import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth.js';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';

import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route
        path='/login'
        element={user ? <Navigate to='/dashboard' /> : <LoginPage />}
      />
      <Route
        path='/register'
        element={user ? <Navigate to='/dashboard' /> : <RegisterPage />}
      />
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;