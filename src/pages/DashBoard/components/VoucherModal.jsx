import React, { useState } from 'react';
import { X, Upload, Info, Share2 } from 'lucide-react';

const TravelBookingModal = ({IsModelOpen, SetIsModelOpen}) => {
  
    // Form state
  const [formData, setFormData] = useState({
    clientName: '',
    bookingId: '',
    phoneNumber: '',
    emailAddress: '',
    personalMessage: '',
    tourType: 'Adventure',
    transportType: 'train',
    travels: [
      {
        pnrNumber: '',
        name: '',
        destination: '',
        departure: '',
        return: ''
      },
      {
        pnrNumber: '',
        name: '',
        destination: '',
        departure: '',
        return: ''
      }
    ],
    hotel: {
      name: '',
      bookingNumber: '',
      checkIn: '',
      checkOut: ''
    }
  });

  // Handle input changes for basic fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTravelChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      travels: prev.travels.map((travel, i) => 
        i === index ? { ...travel, [field]: value } : travel
      )
    }));
  };

  const handleHotelChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      hotel: {
        ...prev.hotel,
        [field]: value
      }
    }));
  };

  const handleTransportType = (type) => {
    setFormData(prev => ({
      ...prev,
      transportType: type
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    HandleClose();
  };

  const HandleClose = () => {
    setFormData({
        clientName: '',
        bookingId: '',
        phoneNumber: '',
        emailAddress: '',
        personalMessage: '',
        tourType: 'Adventure',
        transportType: 'train',
        travels: [
          {
            pnrNumber: '',
            name: '',
            destination: '',
            departure: '',
            return: ''
          },
          {
            pnrNumber: '',
            name: '',
            destination: '',
            departure: '',
            return: ''
          }
        ],
        hotel: {
          name: '',
          bookingNumber: '',
          checkIn: '',
          checkOut: ''
        }
      });
      SetIsModelOpen(false);
    };   

    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] overflow-y-auto">
        <div className="flex p-6 gap-6">
          <div className="w-full">
            <div className='w-full flex items-center justify-between'>
                <div>Create a Voucher</div>
                <div onClick={HandleClose} className='cursor-pointer'><X className='w-5 font-bold text-red-600'/></div>
            </div>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className='flex gap-6 flex-1'>
                <div className='flex-1'>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Select a template</h3>
                    <div className="flex gap-3">
                      <div className="w-16 h-24 border-2 border-emerald-500 rounded-lg"></div>
                      <div className="w-16 h-24 bg-gray-100 rounded-lg"></div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Client Name</label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      placeholder="Please enter client name"
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Booking ID</label>
                    <input
                      type="text"
                      name="bookingId"
                      value={formData.bookingId}
                      onChange={handleInputChange}
                      placeholder="Please enter the booking ID"
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Enter the client phone number"
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Email Address</label>
                    <input
                      type="email"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleInputChange}
                      placeholder="Please enter client email"
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Personal Message</label>
                    <textarea
                      name="personalMessage"
                      value={formData.personalMessage}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="flex-1">
                      <label className="block text-sm mb-1">Upload Itinerary</label>
                      <button className="w-full p-2 border rounded-lg flex items-center justify-center gap-2">
                        <Upload size={16} />
                        Upload PDF
                      </button>
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm mb-1">Select the type of tour</label>
                      <select 
                        name="tourType"
                        value={formData.tourType}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg appearance-none"
                      >
                        <option>Adventure</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-4 h-[calc(100vh-200px)]">
                    <h3 className="text-center text-gray-500">Preview</h3>
                  </div>
                  <div className="mt-4 space-y-2">
                    <button className="w-full bg-emerald-500 text-white py-3 rounded-lg">
                      Save & Download
                    </button>
                    <button className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2">
                      <Share2 size={16} />
                      Share
                    </button>
                  </div>
                </div>
              </div>

              <div className='mt-10'>
                <h3 className="font-medium mb-4">Travel Information</h3>
                <div className="flex gap-4 mb-2">
                  <button 
                    type="button"
                    onClick={() => handleTransportType('train')}
                    className="flex items-center gap-1"
                  >
                    <div className={`w-4 h-4 rounded-full border-2 ${formData.transportType === 'train' ? 'border-emerald-500' : 'border-gray-300'}`}></div>
                    Train
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleTransportType('airplane')}
                    className="flex items-center gap-1"
                  >
                    <div className={`w-4 h-4 rounded-full border-2 ${formData.transportType === 'airplane' ? 'border-emerald-500' : 'border-gray-300'}`}></div>
                    Airplane
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleTransportType('road')}
                    className="flex items-center gap-1"
                  >
                    <div className={`w-4 h-4 rounded-full border-2 ${formData.transportType === 'road' ? 'border-emerald-500' : 'border-gray-300'}`}></div>
                    By road
                  </button>
                </div>

                {[0, 1].map((index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <input
                        placeholder="PNR Number"
                        value={formData.travels[index].pnrNumber}
                        onChange={(e) => handleTravelChange(index, 'pnrNumber', e.target.value)}
                        className="p-2 border rounded-lg"
                      />
                      <input
                        placeholder="Name"
                        value={formData.travels[index].name}
                        onChange={(e) => handleTravelChange(index, 'name', e.target.value)}
                        className="p-2 border rounded-lg"
                      />
                      <input
                        placeholder="Destination"
                        value={formData.travels[index].destination}
                        onChange={(e) => handleTravelChange(index, 'destination', e.target.value)}
                        className="p-2 border rounded-lg"
                      />
                      <button type="button" className="p-2 border rounded-lg">
                        <Upload size={16} />
                      </button>
                    </div>
                    <div className="flex gap-4">
                      <div className='flex flex-col gap-1'> 
                        <label>Departure</label>
                        <input
                          type="date"
                          value={formData.travels[index].departure}
                          onChange={(e) => handleTravelChange(index, 'departure', e.target.value)}
                          className="p-2 border rounded-lg flex-1"
                        />
                      </div>
                      <div className='flex flex-col gap-1'>
                        <label>Return</label>
                        <input
                          type="date"
                          value={formData.travels[index].return}
                          onChange={(e) => handleTravelChange(index, 'return', e.target.value)}
                          className="p-2 border rounded-lg flex-1"
                        />                      
                      </div>
                    </div>
                  </div>
                ))}

                <h3 className="font-medium mb-4">Hotel Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-5 gap-4 mb-4">
                    <div className='flex flex-col gap-1'> 
                      <label>Hotel Name</label>
                      <input
                        placeholder="Hotel Name"
                        value={formData.hotel.name}
                        onChange={(e) => handleHotelChange('name', e.target.value)}
                        className="p-2 border rounded-lg"
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <label>Booking Number</label>
                      <input
                        placeholder="Booking Number"
                        value={formData.hotel.bookingNumber}
                        onChange={(e) => handleHotelChange('bookingNumber', e.target.value)}
                        className="p-2 border rounded-lg"
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <label>Check-in</label>
                      <input
                        type="date"
                        value={formData.hotel.checkIn}
                        onChange={(e) => handleHotelChange('checkIn', e.target.value)}
                        className="p-2 border rounded-lg flex-1"
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <label>Check-out</label>
                      <input
                        type="date"
                        value={formData.hotel.checkOut}
                        onChange={(e) => handleHotelChange('checkOut', e.target.value)}
                        className="p-2 border rounded-lg flex-1"
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <div>Upload PDF</div>
                      <button type="button" className="p-2 border rounded-lg w-full">
                        <Upload size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-emerald-500 text-white py-3 rounded-lg mt-4">
                Apply Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelBookingModal;