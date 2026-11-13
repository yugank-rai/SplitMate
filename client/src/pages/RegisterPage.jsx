import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth.js';
import { registerApi } from '../api/authApi.js';
import BrandLogo from '../components/common/BrandLogo.jsx';
import '../styles/auth.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const data = await registerApi({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      login(data);
      toast.success(`Welcome to SplitMate, ${data.name}!`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
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
          The cleanest way to track and split expenses with anyone
        </h2>
        <p className='auth-hero-desc'>
          Create a free account in 30 seconds and keep all your household, trip, and shared debts organized.
        </p>
        <ul className='auth-features'>
          <li>
            <span className='auth-check-icon'><Check size={14} strokeWidth={2.5} /></span>
            <span>Free forever for personal use</span>
          </li>
          <li>
            <span className='auth-check-icon'><Check size={14} strokeWidth={2.5} /></span>
            <span>Create unlimited groups and add friends</span>
          </li>
          <li>
            <span className='auth-check-icon'><Check size={14} strokeWidth={2.5} /></span>
            <span>Accurate equal, exact, or percentage splits</span>
          </li>
          <li>
            <span className='auth-check-icon'><Check size={14} strokeWidth={2.5} /></span>
            <span>Transparent audit trail for every transaction</span>
          </li>
        </ul>
      </div>

      <div className='auth-right'>
        <div className='auth-card'>
          <h2>Create account</h2>
          <p className='auth-subtitle'>Sign up for SplitMate to get started</p>

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Full name</label>
              <input
                type='text'
                name='name'
                placeholder='e.g. Alex Morgan'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

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
              <label>Password</label>
              <input
                type='password'
                name='password'
                placeholder='At least 6 characters'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group'>
              <label>Confirm password</label>
              <input
                type='password'
                name='confirmPassword'
                placeholder='Repeat password'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type='submit'
              className='btn btn-primary btn-full'
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className='auth-switch'>
            Already have an account?{' '}
            <Link to='/login'>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
