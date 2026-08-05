import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AuthWidget() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const widgetStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    zIndex: 10,
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif'
  };

  const btnStyle = {
    background: 'transparent',
    border: '1.5px solid #8f1d1d',
    color: '#8f1d1d',
    padding: '8px 18px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer'
  };

  if (currentUser) {
    return (
      <div style={widgetStyle}>
        <button style={btnStyle} onClick={() => navigate('/my-trips')}>My Trips</button>
        <button style={btnStyle} onClick={logout}>Log out</button>
      </div>
    );
  }

  return (
    <div style={widgetStyle}>
      <button style={btnStyle} onClick={() => navigate('/signin')}>Sign In</button>
    </div>
  );
}

export default AuthWidget;