import { Bell, Bookmark, CircleArrowDown, Download, FileDown, IndianRupee, LayoutDashboard, Search, Settings, TicketPercent, TicketSlash } from 'lucide-react'
import React, { useEffect, useState } from 'react';
import Forex from './components/Forex';
import Voucher from './components/Voucher';
import Bookings from './components/Bookings';
import Home from './components/Home';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const navi = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('agent_id') === null) {
      navi('/login');
      return;
    }

    const fetchUserData = async () => {
      const agent_id = localStorage.getItem('agent_id');
      const token = localStorage.getItem('token_agents');

      try {
        const response = await fetch(`https://fourtrip-server.onrender.com/api/commonauth/user/${agent_id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const [activeTab, setActiveTab] = useState('home'); 
  const [forexformOpen, SetforexformOpen] = useState(false);
  const [IsModelOpen, SetIsModelOpen] = useState(false);
  const [IsModelOpen2, SetIsModelOpen2] = useState(false);

  const tabs = [
    { id: 'forexOrder', label: 'Forex Order', buttonText: '+  Order Now' },
    { id: 'voucher', label: 'Voucher', buttonText: 'Create new voucher' },
    { id: 'bookings', label: 'Bookings', buttonText: 'Create new booking' },
  ];

  return (

    <div className="min-h-screen bg-[#F5F6FA]">

        <div className="bg-[#F5F6FA]">
          <div className="flex-1 py-3 px-4 bg-[#FCB000] ">
            <div className="flex justify-end items-center">
              <div className="flex items-center space-x-4">
                <Bell className="w-4 h-4 text-white" />
                <Settings className="w-4 h-4 text-white" />
                <div onClick={()=>navi('/profile')} className="cursor-pointer flex items-center space-x-2 px-2 py-1 text-md bg-white rounded-md">
                  <span>{userData?.owner_name || 'Loading...'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navs */}
        <div className="flex items-center justify-center w-full m-auto gap-10 bg-[#F5F6FA] rounded p-4 mb-3">
          <div className="flex gap-4">

            <button
              className={`flex bg-white items-center gap-2 px-4 py-2 rounded-full ${
                activeTab === 'home' ? 'border-yellow-200 border-2' : 'border-none'
              }`}
              onClick={() => setActiveTab('home')}
            >
              <div className={`bg-white rounded-full p-1 
                ${
                  activeTab === 'home' ? 'bg-yellow-400 text-white' : 'text-black'
                }
                `}>
                <LayoutDashboard className='w-4 h-4 flex items-center justify-center'/>
              </div>
              Home
            </button>

            <button
              className={`flex bg-white items-center gap-2 px-4 py-2 rounded-full ${
                activeTab === 'bookings' ? 'border-yellow-200 border-2' : 'border-none'
              }`}
              onClick={() => setActiveTab('bookings')}
            >
              <div className={`bg-white rounded-full p-1 
                ${
                  activeTab === 'bookings' ? 'bg-yellow-400 text-white' : 'text-black'
                }
                `}>
                <Bookmark className='w-4 h-4 flex items-center justify-center'/>
              </div>
              Bookings & Earnings
            </button>
            
            <button
              className={`flex bg-white items-center gap-2 px-4 py-2 rounded-full ${
                activeTab === 'voucher' ? 'border-yellow-200 border-2' : 'border-none'
              }`}
              onClick={() => setActiveTab('voucher')}
            >
              <div className={`bg-white rounded-full p-1 
                ${
                  activeTab === 'voucher' ? 'bg-yellow-400 text-white' : 'text-black'
                }
                `}>
                <IndianRupee className='w-4 h-4 flex items-center justify-center'/>
              </div>
              Voucher
            </button>

            <button
              className={`flex bg-white items-center gap-2 px-4 py-2 rounded-full ${
                activeTab === 'forexOrder' ? 'border-yellow-200 border-2' : 'border-none'
              }`}
              onClick={() => setActiveTab('forexOrder')}
            >
              <div className={`bg-white rounded-full p-1 
                ${
                  activeTab === 'forexOrder' ? 'bg-yellow-400 text-white' : 'text-black'
                }
                `}>
                <TicketSlash className='w-4 h-4 flex items-center justify-center'/>
              </div>
              Forex Order
            </button>
            
            {
              activeTab !== 'home' &&
              <button 
                onClick={
                  () => {
                    if (activeTab === 'forexOrder') { console.log("Forex");SetforexformOpen(true) }
                    if (activeTab === 'voucher') { console.log("Voucher");SetIsModelOpen(true) }
                    if (activeTab === 'bookings') { console.log("Bookings");SetIsModelOpen2(true)}
                  }
                } 
                className="bg-green-500 ml-20 text-white font-medium px-4 py-2 rounded hover:bg-green-600">
                {tabs.find((tab) => tab.id === activeTab)?.buttonText}
              </button>
            }

          </div>

        </div>

        {activeTab === 'forexOrder' && <Forex forexformOpen={forexformOpen} SetforexformOpen={SetforexformOpen}/>}
        {activeTab === 'voucher' && <Voucher IsModelOpen={IsModelOpen} SetIsModelOpen={SetIsModelOpen}/>}
        {activeTab === 'bookings' && <Bookings IsModelOpen2={IsModelOpen2} SetIsModelOpen2={SetIsModelOpen2}  />}
        {activeTab === 'home' && <Home />}
      
    </div>
  );
};

export default Dashboard;
