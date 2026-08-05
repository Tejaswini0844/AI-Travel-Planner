import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Landing from './pages/Landing';
import PlanForm from './pages/PlanForm';
import Itinerary from './pages/Itinerary';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MyTrips from './pages/MyTrips';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/plan" element={<PlanForm />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/my-trips" element={<MyTrips />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;