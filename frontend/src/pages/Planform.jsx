import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import lotusBg from '../assets/lotus-bg.jpg';

function PlanForm() {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/plan-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city, days, budget }),
      });
      const data = await response.json();
      navigate('/itinerary', { state: { itinerary: data.itinerary, city } });
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: '#f3e0cf',
      fontFamily: 'Poppins, sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <div style={{
        width: '1100px',
        maxWidth: '95vw',
        minHeight: '650px',
        background: `linear-gradient(rgba(255,247,239,0.55), rgba(255,247,239,0.55)), url(${lotusBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '28px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 18px 40px rgba(0,0,0,.08)'
      }}>

        <div style={{
          position: 'absolute', left: 0, bottom: 0, width: '100%', height: '120px',
          background: 'radial-gradient(circle at 50% 120%, transparent 65%, rgba(223,191,150,.35) 66%)',
          opacity: 0.5
        }} />

        <div style={{ padding: '70px', position: 'relative', zIndex: 5 }}>
          <p style={{ color: '#8f1d1d', letterSpacing: '6px', fontWeight: 600, marginBottom: '18px', fontSize: '13px' }}>STEP 1 OF 1</p>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '68px', color: '#3d2619', marginBottom: '20px' }}>
            Tell us about your trip
          </h1>
          <div style={{ width: '260px', height: '2px', background: '#dfbf96', marginBottom: '35px' }} />

          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>City</label>
            <input
              type="text" required value={city} onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Jaipur" style={inputStyle}
            />

            <div style={{ display: 'flex', gap: '30px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Days</label>
                <input type="number" required value={days} onChange={(e) => setDays(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Budget / Day (₹)</label>
                <input type="number" required value={budget} onChange={(e) => setBudget(e.target.value)} style={inputStyle} />
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              style={{
                marginTop: '25px', background: '#8f1d1d', color: 'white', border: 'none',
                borderRadius: '40px', padding: '18px 45px', fontSize: '18px', cursor: 'pointer'
              }}
            >
              {loading ? 'Generating...' : 'Generate itinerary'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block', marginBottom: '8px', color: '#5d4433',
  textTransform: 'uppercase', fontSize: '13px', letterSpacing: '2px'
};

const inputStyle = {
  width: '100%', boxSizing: 'border-box', padding: '18px', borderRadius: '14px',
  border: '1px solid #e6ccb0', background: '#fffdf8', fontSize: '16px', marginBottom: '28px'
};

export default PlanForm;