import React from 'react';
import { Plus } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
  } from "recharts";

const HomeDashboard = () => {

  const data = [
    { month: "Jan", orders: 20, earnings: 50 },
    { month: "Feb", orders: 40, earnings: 70 },
    { month: "Mar", orders: 60, earnings: 80 },
    { month: "Apr", orders: 80, earnings: 60 },
    { month: "May", orders: 100, earnings: 40 },
    { month: "June", orders: 50, earnings: 90 },
    { month: "July", orders: 70, earnings: 100 },
  ];


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="">

        <div className='flex w-full gap-6'>
            <div className="w-[35%]">
            <div className="relative bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-3 mb-4">
                <div className="absolute top-3 right-0 p-2 rounded-lg">
                    <img src="/assets/voucher.svg" alt="" className='w-[2.5em]' />
                </div>
                <h2 className="text-xl font-semibold">Create <br />Voucher</h2>
                </div>
                <button className="w-full text-[13px] min-w-fit flex items-center justify-center gap-2 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                <Plus size={20} />
                Create new voucher
                </button>
            </div>
            </div>

            {/* Advertisement Section */}
            <div className="w-[60%] flex flex-1">
            <div className="bg-white py-8 px-5 rounded-xl shadow-md flex-1">
                <h2 className="text-xl font-semibold mb-4">Advertisements</h2>
                <div className="flex justify-center gap-1 mt-8">
                {[...Array(5)].map((_, i) => (
                    <div 
                    key={i} 
                    className={`h-2 w-2 rounded-full ${i === 1 ? 'bg-blue-500' : 'bg-gray-200'}`}
                    />
                ))}
                </div>
            </div>
            </div>
        </div>


        <div className='w-full flex'> 
            <div className="flex gap-4 py-8 w-full">
                {/* Orders Fulfilled */}
                <div className="bg-white p-6 rounded shadow-md flex-1">
                    <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Orders Fulfilled</h2>
                    <select className="border rounded px-2 py-1">
                        <option>October</option>
                        <option>September</option>
                    </select>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="orders" fill="#8884d8" />
                    </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded shadow-md flex-1">
                    <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Total Earnings</h2>
                    <select className="border rounded px-2 py-1">
                        <option>October</option>
                        <option>September</option>
                    </select>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="earnings" stroke="#8884d8" strokeWidth={3} />
                    </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Agent Tutorials Section */}
        <div className="col-span-12">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Agent Tutorials</h2>
            <div className="grid grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={`/assets/agentsample.svg`}
                    alt={`Tutorial ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;