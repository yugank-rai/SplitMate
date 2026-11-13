import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth.js';
import { loginApi } from '../api/authApi.js';
import BrandLogo from '../components/common/BrandLogo.jsx';
import '../styles/auth.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginApi(formData);
      login(data);
      toast.success(`Welcome back, ${data.name}!`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='auth-wrapper'>
      <div className='auth-left'>
        <div className='auth-brand-container'>
          <BrandLogo size={36} />
        </div>
        <h2 className='auth-hero-heading'>
          Clear, effortless expense tracking for groups and shared bills
        </h2>
        <p className='auth-hero-desc'>
          Split living costs, trips, and nights out accurately without spreadsheets or confusion.
        </p>
        <ul className='auth-features'>
          <li>
            <span className='auth-check-icon'><Check size={14} strokeWidth={2.5} /></span>
            <span>Real-time expense logging across devices</span>
          </li>
          <li>
            <span className='auth-check-icon'><Check size={14} strokeWidth={2.5} /></span>
            <span>One-click settlement and payment confirmation</span>
          </li>
          <li>
            <span className='auth-check-icon'><Check size={14} strokeWidth={2.5} /></span>
            <span>Smart debt reduction algorithm minimizes transactions</span>
          </li>
          <li>
            <span className='auth-check-icon'><Check size={14} strokeWidth={2.5} /></span>
            <span>Instant notification alerts when bills are logged</span>
          </li>
        </ul>
      </div>

      <div className='auth-right'>
        <div className='auth-card'>
          <h2>Sign in</h2>
          <p className='auth-subtitle'>Enter your credentials to access your account</p>

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Email address</label>
              <input
                type='email'
                name='email'
                placeholder='you@example.com'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group'>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label>Password</label>
                <Link to='/forgot-password' className='auth-inline-link'>Forgot password?</Link>
              </div>
              <input
                type='password'
                name='password'
                placeholder='Enter your password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type='submit'
              className='btn btn-primary btn-full'
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className='auth-switch'>
            Don't have an account?{' '}
            <Link to='/register'>Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
