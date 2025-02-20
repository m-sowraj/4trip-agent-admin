import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import { CircleArrowDown, Download } from 'lucide-react'
import TravelBookingModal from './VoucherModal';
import BookingModal from './AddBookings';
import { toast } from 'react-hot-toast';

const VoucherModal = ({ booking, onClose, locations }) => {
  console.log('booking', booking)
  console.log('locations', locations)
  const locationName = locations.find(loc => loc._id === booking.Destination_id)?.name || 'Unknown Location';
  const downloadVoucher = () => {
    const voucherElement = document.getElementById('voucher-content');
    
    // Use html2canvas and jsPDF (you'll need to install these packages)
    import('html2canvas').then(html2canvas => {
      html2canvas.default(voucherElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        import('jspdf').then(({ jsPDF }) => {
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
          });
          
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`travel-voucher-${booking._id}.pdf`);
        });
      });
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Travel Voucher</h2>
          <div className="flex gap-2">
            <button
              onClick={downloadVoucher}
              className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-yellow-100 transition-all"
            >
              <Download className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-700">Download</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div id="voucher-content" className="bg-white p-6 rounded-lg border-2 border-yellow-200">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-yellow-600 mb-2">FourTrip</h1>
              <p className="text-gray-500">Travel Booking Voucher</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Booking ID:</p>
              <p className="font-mono">{booking._id}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Client Details</h3>
              <p className="text-gray-700">Name: {booking.name}</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Travel Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Destination</p>
                  <p className="font-medium">{locationName}</p>
                </div>
                <div>
                  <p className="text-gray-500">Travel Period</p>
                  <p className="font-medium">
                    {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Details</h3>
              <p className="text-2xl font-bold text-yellow-600">₹{booking.amt_earned.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Thank you for choosing FourTrip for your travel needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function Bookings({ IsModelOpen2, SetIsModelOpen2 }) {
  const [dummyData, setDummyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    sortBy: 'amt_earned'
  });
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('https://fourtrip-server.onrender.com/api/locations');
        if (!response.ok) throw new Error('Failed to fetch locations');
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
        toast.error('Error loading locations');
      } finally {
        setIsLoadingLocations(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    fetch('https://fourtrip-server.onrender.com/api/bookings')
    .then(response => response.json())
    .then(data => {
      const bookingsWithLocationNames = data.map(booking => ({
        ...booking,
        destination_name: locations.find(loc => loc._id === booking.Destination_id)?.name || 'Unknown Location'
      }));
      setDummyData(bookingsWithLocationNames);
      setFilteredData(bookingsWithLocationNames);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [locations]);

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
    let tableContent = `Booking Report\n\n`;
    tableContent += `ID,Client Name,Destination,Travel Dates,Amount Earned\n`;
    
    filteredData.forEach(booking => {
      const locationName = locations.find(loc => loc._id === booking.Destination_id)?.name || 'Unknown Location';
      tableContent += `${booking._id},${booking.name},${locationName},${new Date(booking.start_date).toLocaleDateString()} - ${new Date(booking.end_date).toLocaleDateString()},${booking.amt_earned}\n`;
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

  // Modify the table's voucher link cell to show the modal
  const handleVoucherClick = (booking, e) => {
    e.preventDefault();
    setSelectedBooking(booking);
  };

  return (
    <div className='w-[90%] h-[85vh] max-h-[85vh] overflow-hidden m-auto flex flex-col gap-6 bg-white p-8 shadow-xl rounded-2xl'>
        {IsModelOpen2 && <BookingModal onClose={() => SetIsModelOpen2(false)} />}
        {selectedBooking && (
          <VoucherModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
            locations={locations}
          />
        )}
        
        <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="w-full md:w-1/3">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleDateChange}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-200 transition-all"
              />
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleDateChange}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-200 transition-all"
              />
            </div>
            <select 
              value={filters.sortBy}
              onChange={handleSortChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-200 transition-all"
            >
              <option value="amt_earned">Amount (High to Low)</option>
              <option value="date">Date</option>
            </select>
            <button 
              onClick={downloadPDF}
              className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-yellow-100 transition-all"
            >
              <CircleArrowDown className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-700">Export CSV</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto rounded-xl border border-gray-200">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Booking ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Client Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Destination</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Travel Dates</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Amount Earned</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Voucher Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-500">{booking._id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{booking.destination_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900">₹{booking.amt_earned.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => handleVoucherClick(booking, e)}
                      className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                    >
                      View Voucher
                    </button>
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
