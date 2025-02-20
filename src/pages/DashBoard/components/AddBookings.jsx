import React, { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';

const BookingModal = ({ onClose, onAddBooking }) => {
  const [formData, setFormData] = useState({
    destination: '',
    clientName: '',
    startDate: '',
    endDate: '',
    amountEarned: ''
  });
  
  const [locations, setLocations] = useState([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);

  // Add useEffect to fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('https://fourtrip-server.onrender.com/api/locations');
        if (!response.ok) throw new Error('Failed to fetch locations');
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        toast.error('Error loading locations');
        console.error('Error:', error);
      } finally {
        setIsLoadingLocations(false);
      }
    };

    fetchLocations();
  }, []);

  // Add validation for the form
  const validateForm = () => {
    if (!formData.clientName.trim()) {
      toast.error('Client name is required');
      return false;
    }
    if (!formData.destination.trim()) {
      toast.error('Destination is required');
      return false;
    }
    if (!formData.startDate) {
      toast.error('Start date is required');
      return false;
    }
    if (!formData.endDate) {
      toast.error('End date is required');
      return false;
    }
    if (!formData.amountEarned || formData.amountEarned <= 0) {
      toast.error('Please enter a valid amount');
      return false;
    }
    
    // Validate dates
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    if (end < start) {
      toast.error('End date cannot be before start date');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Get the selected location name
    const selectedLocation = locations.find(loc => loc._id === formData.destination);
    if (!selectedLocation) {
      toast.error('Please select a valid destination');
      return;
    }

    // POST METHOD
    fetch('https://fourtrip-server.onrender.com/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        agent_id: "60d5ec49f1a2c8b1f8e4e1a1",
        email: "cm",
        name: formData.clientName,
        phone_number: "0",
        destination: selectedLocation.name,
        Destination_id: selectedLocation._id,
        client_name: formData.clientName,
        start_date: formData.startDate,
        end_date: formData.endDate,
        amt_earned: Number(formData.amountEarned)
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      toast.success('Booking added successfully');
      if (onAddBooking) onAddBooking(data); // Notify parent component
      handleClear();
      onClose();
    })
    .catch((error) => {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to add booking');
    });
  };

  const handleClear = () => {
    setFormData({
      destination: '',
      clientName: '',
      startDate: '',
      endDate: '',
      amountEarned: ''
    });
  };

  // Update the destination field to store the ID directly
  const destinationField = (
    <div>
      <label className="block text-sm text-gray-600 mb-1">Destination</label>
      {isLoadingLocations ? (
        <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
          Loading locations...
        </div>
      ) : (
        <select
          value={formData.destination}
          onChange={(e) => setFormData({...formData, destination: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
          required
        >
          <option value="">Select a destination</option>
          {locations.map((location) => (
            <option key={location._id} value={location._id}>
              {location.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0  bg-black/50 flex z-50 items-center justify-center">
      <div className="min-w-fit bg-white rounded-lg p-6 relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 hover:bg-gray-100 p-1 rounded-full"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="text-lg mb-6">Add booking</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Client name</label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData({...formData, clientName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {destinationField}

          <div>
            <label className="block text-sm text-gray-600 mb-1">Travel dates</label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 "
                />
                {/* <Calendar className="absolute right-2 top-2 h-5 w-5 text-gray-400 pointer-events-none" /> */}
              </div>
              <span className="text-gray-600">To</span>
              <div className="relative flex-1">
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 "
                />
                {/* <Calendar className="absolute right-2 top-2 h-5 w-5 text-gray-400 pointer-events-none" /> */}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Amount Earned</label>
            <input
              type="number"
              value={formData.amountEarned}
              onChange={(e) => setFormData({...formData, amountEarned: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="flex gap-2 mt-6">
            <button 
              type="submit"
              className="flex-1 px-4 py-2 bg-emerald-400 hover:bg-emerald-500 text-white rounded-md transition-colors"
            >
              Add new booking
            </button>
            <button 
              type="button"
              onClick={handleClear}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;