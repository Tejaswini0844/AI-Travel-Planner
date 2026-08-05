import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import mandalaImg from '../assets/mandala.jpg';

function MyTrips() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate('/signin');
      return;
    }
    const fetchTrips = async () => {
  const q = query(collection(db, 'trips'), where('userId', '==', currentUser.uid));
  const snapshot = await getDocs(q);
  const tripsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  // Sort by newest first, done here in code instead of in the Firestore query
  tripsData.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
  
  setTrips(tripsData);
  setLoading(false);
};
    fetchTrips();
  }, [currentUser, navigate]);

  const openTrip = (trip) => {
    navigate('/itinerary', { state: { itinerary: trip.itinerary, city: trip.city } });
  };

  return (
    <div style={{ background: '#f3e0cf', minHeight: '100vh', padding: '60px 20px', fontFamily: 'Poppins, sans-serif', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `url(${mandalaImg})`,
        backgroundSize: '1550px',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'sepia(1) saturate(3) hue-rotate(-15deg) brightness(0.9)',
        opacity: 0.30,
        mixBlendMode: 'multiply'
      }} />
      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 5 }}>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', color: '#3d2619', marginBottom: '30px' }}>My Trips</h1>

        {loading && <p>Loading...</p>}
        {!loading && trips.length === 0 && <p>No saved trips yet. Go plan one!</p>}

        {trips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => openTrip(trip)}
            style={{
              background: '#fff7ef', borderRadius: '16px', padding: '20px 24px', marginBottom: '14px',
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,.05)'
            }}
          >
            <h3 style={{ margin: '0 0 6px', color: '#3d2619' }}>{trip.city}</h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#8f1d1d' }}>{trip.itinerary.days.length} days</p>
          </div>
        ))}

        <p onClick={() => navigate('/')} style={{ marginTop: '24px', color: '#8f1d1d', cursor: 'pointer', fontWeight: 600 }}>← Back to home</p>
      </div>
    </div>
  );
}

export default MyTrips;