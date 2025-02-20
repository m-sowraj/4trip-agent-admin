import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/DashBoard/DashBoard';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Home from './pages/DashBoard/components/Home';
import Forex from './pages/DashBoard/components/Forex';
import Bookings from './pages/DashBoard/components/Bookings';
import Voucher from './pages/DashBoard/components/Voucher';

const ErrorFallback = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600">Please try again later or contact support if the problem persists.</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} errorElement={<ErrorFallback />}>
          <Route index element={<Home />} errorElement={<ErrorFallback />} />
          <Route path="forex" element={<Forex />} errorElement={<ErrorFallback />} />
          <Route path="bookings" element={<Bookings />} errorElement={<ErrorFallback />} />
          {/* <Route path="voucher" element={<Voucher />} errorElement={<ErrorFallback />} /> */}
        </Route>
        <Route path="/login" element={<Login />} errorElement={<ErrorFallback />} />
        <Route path="/profile" element={<Profile />} errorElement={<ErrorFallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 