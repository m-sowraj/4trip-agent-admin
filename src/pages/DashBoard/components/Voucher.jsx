import React, { useState } from 'react'
import SearchBar from './SearchBar'
import { CircleArrowDown } from 'lucide-react'
import TravelBookingModal from './VoucherModal'

function Voucher({IsModelOpen, SetIsModelOpen}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [Datas, SetDatas] = useState([
      {
        clientName: "John Doe",
        bookingID: "B12345",
        phoneNumber: "+1 234 567 890",
        personalMessage: "Looking forward to the trip!",
        itineraryLink: "https://example.com/itinerary1",
        status: "Completed"
      },
      {
        clientName: "Jane Smith",
        bookingID: "B67890",
        phoneNumber: "+1 987 654 321",
        personalMessage: "Please include my dietary preferences.",
        itineraryLink: "https://example.com/itinerary2",
        status: "Pending"
      },
      {
        clientName: "Alex Johnson",
        bookingID: "B54321",
        phoneNumber: "+1 123 456 789",
        personalMessage: "Excited for the adventure!",
        itineraryLink: "https://example.com/itinerary3",
        status: "Cancelled"
      },
    ]);

    // Filter and search data
    const getFilteredData = () => {
      return Datas.filter(item => {
        const matchesSearch = searchQuery.trim() === '' || 
          Object.values(item).some(value => 
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
          );
        
        const matchesStatus = statusFilter === 'all' || 
          item.status === statusFilter;

        return matchesSearch && matchesStatus;
      });
    };

    // Handle search
    const handleSearch = (query) => {
      setSearchQuery(query);
    };

    // Handle status filter change
    const handleStatusChange = (e) => {
      setStatusFilter(e.target.value);
    };

    // Download PDF function
    const downloadPDF = () => {
      const filteredData = getFilteredData();
      let csvContent = "Client Name,Booking ID,Phone Number,Personal Message,Status\n";
      
      filteredData.forEach(item => {
        csvContent += `"${item.clientName}","${item.bookingID}","${item.phoneNumber}","${item.personalMessage}","${item.status}"\n`;
      });

      // Create and download CSV file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'vouchers.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const filteredData = getFilteredData();

    return (
      <div>
        {IsModelOpen && (
          <TravelBookingModal
            IsModelOpen={IsModelOpen}
            SetIsModelOpen={SetIsModelOpen}
          />
        )}
        {!IsModelOpen && (
          <div className='w-[80%] h-[80vh] max-h-[75vh] overflow-scroll m-auto flex flex-col gap-8 bg-white p-6 px-10 shadow-lg rounded-2xl'>
            <div className="w-full flex items-center justify-between">
              <SearchBar onSearch={handleSearch} />
              <div className="flex items-center gap-4">
                <select 
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-200"
                  value={statusFilter}
                  onChange={handleStatusChange}
                >
                  <option value="all">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
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
                <thead className="bg-gray-200 border-gray-300">
                  <tr>
                    <th className="px-4 py-2 text-left">Client Name</th>
                    <th className="px-4 py-2 text-left">Booking ID</th>
                    <th className="px-4 py-2 text-left">Phone Number</th>
                    <th className="px-4 py-2 text-left">Personal Message</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Itinerary Link</th>
                  </tr>
                </thead>
                <tbody className='pt-2'>
                  {filteredData.map((client, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-100">
                      <td className="px-4 py-2">{client.clientName}</td>
                      <td className="px-4 py-2">{client.bookingID}</td>
                      <td className="px-4 py-2">{client.phoneNumber}</td>
                      <td className="px-4 py-2">{client.personalMessage}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          client.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          client.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <a
                          href={client.itineraryLink}
                          className="text-blue-500 hover:text-blue-600 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Itinerary
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    )
}

export default Voucher
