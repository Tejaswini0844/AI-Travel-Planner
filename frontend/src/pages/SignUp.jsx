import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import mandalaImg from '../assets/mandala.jpg';

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message.includes('email-already') ? 'Email already in use.' : 'Could not create account.');
    }
  };

  return (
    <div style={{ background: '#f3e0cf', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins, sans-serif' }}>
      <div style={{ background: '#fff7ef', borderRadius: '28px', padding: '60px', width: '400px', maxWidth: '90vw', boxShadow: '0 18px 40px rgba(0,0,0,.08)', position: 'relative', overflow: 'hidden' }}>

        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${mandalaImg})`,
          backgroundSize: '900px 900px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'sepia(1) saturate(3) hue-rotate(-15deg) brightness(0.9)',
          opacity: 0.15,
          mixBlendMode: 'multiply'
        }} />

        <div style={{ position: 'relative', zIndex: 5 }}>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', color: '#3d2619', marginBottom: '24px', textAlign: 'center' }}>Sign Up</h1>

          <form onSubmit={handleSignUp}>
            <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
            <input type="password" required placeholder="Password (min 6 characters)" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
            {error && <p style={{ color: '#8f1d1d', fontSize: '13px', marginBottom: '10px' }}>{error}</p>}
            <button type="submit" style={btnStyle}>Create Account</button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#5d4433' }}>
            Already have an account? <span onClick={() => navigate('/signin')} style={{ color: '#8f1d1d', cursor: 'pointer', fontWeight: 600 }}>Sign In</span>
          </p>
          <p onClick={() => navigate('/')} style={{ textAlign: 'center', marginTop: '10px', fontSize: '12px', color: '#a08a76', cursor: 'pointer' }}>
            ← Back to home
          </p>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', boxSizing: 'border-box', padding: '14px 16px', borderRadius: '10px',
  border: '1px solid #e6ccb0', background: '#fffdf8', fontSize: '14px', marginBottom: '16px', fontFamily: 'Poppins, sans-serif'
};

const btnStyle = {
  width: '100%', background: '#8f1d1d', color: 'white', border: 'none',
  padding: '14px', borderRadius: '24px', fontSize: '15px', fontWeight: 600, cursor: 'pointer'
};

export default SignUp;