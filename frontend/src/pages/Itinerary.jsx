import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import daybyday from '../assets/day by day.jpg';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';



function Itinerary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { itinerary, city } = location.state || {};
  const [currentDay, setCurrentDay] = useState(0);
  const pageRef = useRef();
  const { currentUser } = useAuth();

const saveTrip = async () => {
  try {
    await addDoc(collection(db, 'trips'), {
      userId: currentUser.uid,
      city,
      itinerary,
      createdAt: serverTimestamp()
    });
    alert('Trip saved!');
  } catch (err) {
    console.error(err);
    alert('Failed to save trip.');
  }
};




  if (!itinerary || !itinerary.days) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>
        <p>No itinerary found. Please plan a trip first.</p>
        <button onClick={() => navigate('/plan')}>Go back</button>
      </div>
    );
  }



  const day = itinerary.days[currentDay];
  const totalDays = itinerary.days.length;

  const goNext = () => {
    if (currentDay < totalDays - 1) setCurrentDay(currentDay + 1);
  };
  const goPrevious = () => {
    if (currentDay > 0) setCurrentDay(currentDay - 1);
  };

  const downloadPDF = async () => {
    const canvas = await html2canvas(pageRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${city}-Day${day.day}-Itinerary.pdf`);
  };


  return (
    <div style={{
      background: '#f3e0cf',
      fontFamily: 'Poppins, sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div ref={pageRef} style={{
        width: '1100px',
        maxWidth: '95vw',
        minHeight: '650px',
        background: `linear-gradient(rgba(255,247,239,0.65), rgba(255,247,239,0.65)), url(${daybyday})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '28px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 18px 40px rgba(0,0,0,.08)'
      }}>

        <div style={{ position: 'relative', zIndex: 5, padding: '50px 60px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '13px', color: '#8f1d1d', fontWeight: 700, letterSpacing: '2px' }}>
              DAY {day.day} OF {totalDays}
            </span>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ background: '#f7d9d0', color: '#8f1d1d', fontSize: '13px', fontWeight: 700, padding: '6px 16px', borderRadius: '20px' }}>
                Day total: ₹{day.dayTotal}
              </span>
              <button
                onClick={downloadPDF}
                style={{
                  background: 'transparent', border: '1px solid #8f1d1d', color: '#8f1d1d',
                  padding: '6px 14px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, cursor: 'pointer'
                }}
              >
                ⬇ Download PDF
              </button>
              {currentUser && (
  <button onClick={saveTrip} style={{ background: 'transparent', border: '1px solid #8f1d1d', color: '#8f1d1d', padding: '6px 14px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
    💾 Save trip
  </button>
)}
            </div>
          </div>

          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '42px', color: '#3d2619', margin: '10px 0 4px', textAlign: 'center' }}>
            {city}
          </h1>
          {day.title && (
            <p style={{ textAlign: 'center', fontSize: '15px', color: '#8f1d1d', fontStyle: 'italic', margin: '0 0 30px' }}>
              {day.title}
            </p>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '18px', marginBottom: '20px' }}>
            <div style={{ background: '#fffaf3', borderRadius: '16px', padding: '20px 18px', borderTop: '4px solid #8f1d1d' }}>
              <p style={cardLabel('#8f1d1d')}>MORNING</p>
              <p style={cardText}>{day.morning}</p>
            </div>
            <div style={{ background: '#fffaf3', borderRadius: '16px', padding: '20px 18px', borderTop: '4px solid #b5701f' }}>
              <p style={cardLabel('#b5701f')}>AFTERNOON</p>
              <p style={cardText}>{day.afternoon}</p>
            </div>
            <div style={{ background: '#fffaf3', borderRadius: '16px', padding: '20px 18px', borderTop: '4px solid #5c4a8a' }}>
              <p style={cardLabel('#5c4a8a')}>EVENING</p>
              <p style={cardText}>{day.evening}</p>
            </div>
          </div>

          <div style={{ background: '#fffaf3', borderRadius: '16px', padding: '18px 20px', marginBottom: '18px' }}>
            <p style={cardLabel('#8f1d1d')}>🍽 LOCAL FOOD</p>
            <p style={cardText}>{day.food}</p>
          </div>

          {day.costBreakdown && (
            <div style={{ background: '#fffaf3', borderRadius: '16px', padding: '18px 20px' }}>
              <p style={cardLabel('#5d4433')}>COST BREAKDOWN</p>
              {Object.entries(day.costBreakdown).map(([key, value]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#3d2619', marginBottom: '4px' }}>
                  <span style={{ textTransform: 'capitalize' }}>{key}</span>
                  <span>₹{value}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#8f1d1d', fontWeight: 700, borderTop: '1px solid #e0c4a8', paddingTop: '8px', marginTop: '8px' }}>
                <span>Total</span>
                <span>₹{day.dayTotal}</span>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px' }}>
            <button
              onClick={goPrevious}
              disabled={currentDay === 0}
              style={{
                background: 'transparent', color: '#8f1d1d', border: '1.5px solid #8f1d1d',
                padding: '12px 24px', borderRadius: '24px', fontSize: '14px', fontWeight: 600,
                cursor: currentDay === 0 ? 'not-allowed' : 'pointer', opacity: currentDay === 0 ? 0.4 : 1
              }}
            >
              ← Previous
            </button>

            {currentDay === totalDays - 1 ? (
              <button
                onClick={() => navigate('/')}
                style={{
                  background: '#8f1d1d', color: '#fff', border: 'none',
                  padding: '12px 26px', borderRadius: '24px', fontSize: '14px', fontWeight: 600, cursor: 'pointer'
                }}
              >
                Back to Home
              </button>
            ) : (
              <button
                onClick={goNext}
                style={{
                  background: '#8f1d1d', color: '#fff', border: 'none',
                  padding: '12px 26px', borderRadius: '24px', fontSize: '14px', fontWeight: 600, cursor: 'pointer'
                }}
              >
                Next day →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const cardLabel = (color) => ({
  fontSize: '11px', letterSpacing: '1.5px', color, fontWeight: 700, marginBottom: '10px', textAlign: 'center'
});
const cardText = { fontSize: '13px', color: '#3d2619', margin: 0, lineHeight: 1.6 };

export default Itinerary;
