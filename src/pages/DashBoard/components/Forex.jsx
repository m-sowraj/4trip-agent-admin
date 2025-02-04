import React, { useState } from 'react'
import SearchBar from './SearchBar'
import { CircleArrowDown } from 'lucide-react'
import ForexOrderForm from './ForexOrder';

function Forex({forexformOpen, SetforexformOpen}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [Data, setData] = useState([
      {
        orderID: "O12345",
        currencyType: "USD",
        amount: "$100.00",
        status: "Delivered",
        deliveryAddress: "123 Main St, Springfield, USA",
      },
      {
        orderID: "O67890",
        currencyType: "EUR",
        amount: "€200.50",
        status: "In Transit",
        deliveryAddress: "456 High St, Berlin, Germany",
      },
      {
        orderID: "O54321",
        currencyType: "INR",
        amount: "₹1500.75",
        status: "Pending",
        deliveryAddress: "789 MG Road, Bengaluru, India",
      },
    ]);

    const [isConfirmationOpen, setConfirmationOpen] = useState(false);

    // Filter and search data
    const getFilteredData = () => {
      return Data.filter(item => {
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

    // Download CSV function
    const downloadCSV = () => {
      const filteredData = getFilteredData();
      let csvContent = "Order ID,Currency Type,Amount,Status,Delivery Address\n";
      
      filteredData.forEach(item => {
        csvContent += `"${item.orderID}","${item.currencyType}","${item.amount}","${item.status}","${item.deliveryAddress}"\n`;
      });

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'forex-orders.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const handleAddOrder = (newOrder) => {
      console.log(newOrder);
      setData((prev) => [...prev, {
        ...newOrder,
        orderID: `O${Math.floor(Math.random() * 100000)}`,
        status: 'Pending'
      }]);
      setConfirmationOpen(true);
      setTimeout(() => setConfirmationOpen(false), 2000);
    };

    const filteredData = getFilteredData();

    return (
        <div className='w-[80%] h-[80vh] max-h-[75vh] overflow-scroll m-auto flex flex-col gap-8 bg-white p-6 px-10 shadow-lg rounded-2xl'>
            <div className="w-full flex items-center justify-between">
              <SearchBar onSearch={handleSearch} />
              <div className="flex items-center gap-4">
                <select 
                  value={statusFilter}
                  onChange={handleStatusChange}
                  className="border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-200"
                >
                  <option value="all">All Status</option>
                  <option value="Delivered">Delivered</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Pending">Pending</option>
                </select>
                <button 
                  onClick={downloadCSV}
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
                    <th className="px-4 py-2 text-left">Order ID</th>
                    <th className="px-4 py-2 text-left">Currency Type</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Delivery Address</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((order, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-100">
                      <td className="px-4 py-2">{order.orderID}</td>
                      <td className="px-4 py-2">{order.currencyType}</td>
                      <td className="px-4 py-2">{order.amount}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "In Transit"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">{order.deliveryAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ForexOrderForm
              isOpen={forexformOpen}
              onClose={() => SetforexformOpen(false)}
              onAddOrder={handleAddOrder}
            />
            <ConfirmationModal isOpen={isConfirmationOpen} />
        </div>
    )
}

function ConfirmationModal({ isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-4 w-[300px] rounded shadow-lg">
        <p className="text-center text-green-500 font-semibold">Order Added Successfully!</p>
      </div>
    </div>
  );
}

export default Forex
