import { useNavigate } from 'react-router-dom';
import mandalaImg from '../assets/mandala.jpg';
import AuthWidget from '../components/AuthWidget';



function Landing() {
  const navigate = useNavigate();

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
        background: '#fff7ef',
        borderRadius: '28px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 18px 40px rgba(0,0,0,.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>

        
        <AuthWidget /> 
 

        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${mandalaImg})`,
          backgroundSize: '1400px 1400px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'sepia(1) saturate(3) hue-rotate(-15deg) brightness(0.9)',
          opacity: 0.32,
          mixBlendMode: 'multiply',
          maskImage: 'radial-gradient(circle, black 55%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle, black 55%, transparent 85%)'
        }} />
        

        <div style={{
          position: 'absolute', left: 0, bottom: 0, width: '100%', height: '120px',
          background: 'radial-gradient(circle at 50% 120%, transparent 65%, rgba(223,191,150,.35) 66%)',
          opacity: 0.5
        }} />

        <div style={{ position: 'relative', zIndex: 5, padding: '40px' }}>
          <p style={{ fontSize: '13px', letterSpacing: '6px', color: '#8f1d1d', textTransform: 'uppercase', fontWeight: 600, marginBottom: '18px' }}>
            Plan smarter, travel better
          </p>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '64px', color: '#3d2619', fontWeight: 700, lineHeight: 1.1, margin: '0 0 24px' }}>
            India Travel<br />Planner
          </h1>
          <p style={{ fontSize: '16px', color: '#5d4433', maxWidth: '420px', margin: '0 auto 36px' }}>
            Tell us your city, days, and budget - get a full day-by-day plan built just for you.
          </p>
          <button
            onClick={() => navigate('/plan')}
            style={{
              background: '#8f1d1d', color: 'white', border: 'none',
              borderRadius: '40px', padding: '18px 45px', fontSize: '18px',
              cursor: 'pointer', transition: '.3s'
            }}
            onMouseOver={(e) => { e.target.style.background = '#761515'; e.target.style.transform = 'translateY(-2px)'; }}
            onMouseOut={(e) => { e.target.style.background = '#8f1d1d'; e.target.style.transform = 'translateY(0)'; }}
          >
            Plan my trip →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;