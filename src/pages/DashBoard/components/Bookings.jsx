import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import { CircleArrowDown } from 'lucide-react'
import TravelBookingModal from './VoucherModal';
import BookingModal from './AddBookings';

function Bookings({ IsModelOpen2, SetIsModelOpen2 }) {
  const [dummyData, setDummyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    sortBy: 'amt_earned'
  });

  useEffect(() => {
    fetch('https://fourtrip-server.onrender.com/api/bookings')
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setDummyData(data);
      setFilteredData(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...dummyData];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(booking => 
        booking.name.toLowerCase().includes(query) ||
        booking._id.toLowerCase().includes(query) ||
        booking.amt_earned.toString().includes(query)
      );
    }

    // Date filter
    if (filters.startDate) {
      filtered = filtered.filter(booking => 
        new Date(booking.start_date) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      filtered = filtered.filter(booking => 
        new Date(booking.end_date) <= new Date(filters.endDate)
      );
    }

    // Sort by amount
    if (filters.sortBy === 'amt_earned') {
      filtered.sort((a, b) => b.amt_earned - a.amt_earned);
    }

    setFilteredData(filtered);
  }, [filters, dummyData, searchQuery]);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle filter changes
  const handleDateChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  // Handle sorting
  const handleSortChange = (e) => {
    setFilters({
      ...filters,
      sortBy: e.target.value
    });
  };

  // Download PDF function
  const downloadPDF = () => {
    // Create table content
    let tableContent = `Booking Report\n\n`;
    tableContent += `ID,Client Name,Travel Dates,Amount Earned\n`;
    
    filteredData.forEach(booking => {
      tableContent += `${booking._id},${booking.name},${new Date(booking.start_date).toLocaleDateString()} - ${new Date(booking.end_date).toLocaleDateString()},${booking.amt_earned}\n`;
    });

    // Create blob and download
    const blob = new Blob([tableContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookings-report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className='w-[80%] h-[80vh] max-h-[75vh] overflow-scroll m-auto flex flex-col gap-8 bg-white p-6 px-10 shadow-lg rounded-2xl'>
        {IsModelOpen2 && <BookingModal onClose={() => SetIsModelOpen2(false)} />}
        
        <div className="w-full flex items-center justify-between">
          <SearchBar onSearch={handleSearch} />
          <div className="flex items-center gap-4">
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleDateChange}
              className="border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-200"
            />
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleDateChange}
              className="border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-200"
            />
            <select 
              value={filters.sortBy}
              onChange={handleSortChange}
              className="border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-200"
            >
              <option value="amt_earned">Amount (High to Low)</option>
              <option value="date">Date</option>
            </select>
            <button 
              onClick={downloadPDF}
              className="border border-gray-300 rounded px-3 py-2 flex items-center gap-2 hover:bg-gray-50"
            >
              <CircleArrowDown className="w-5 h-5 text-gray-600" />
              CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-md">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-200 border-b-2 border-gray-300">
              <tr>
                <th className="px-4 py-2 text-left">Booking ID</th>
                <th className="px-4 py-2 text-left">Client Name</th>
                <th className="px-4 py-2 text-left">Travel Dates</th>
                <th className="px-4 py-2 text-left">Amount Earned</th>
                <th className="px-4 py-2 text-left">Voucher Link</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((booking, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-100">
                  <td className="px-4 py-2">{booking._id}</td>
                  <td className="px-4 py-2 font-medium">{booking.name}</td>
                  <td className="px-4 py-2">
                    {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <span className="font-medium">₹{booking.amt_earned}</span>
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href={booking?.voucherLink || '#'}
                      className="text-blue-500 hover:text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Voucher
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Bookings
