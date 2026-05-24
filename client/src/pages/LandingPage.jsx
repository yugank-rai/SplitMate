import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Welcome to SplitMate 💸</h1>
      <p>Split expenses effortlessly with friends</p>
      <div style={{ marginTop: '20px', display: 'flex',
        gap: '12px', justifyContent: 'center' }}>
        <Link to='/login' className='btn btn-outline'>Login</Link>
        <Link to='/register' className='btn btn-primary'>Get Started</Link>
      </div>
    </div>
  );
};

export default LandingPage;