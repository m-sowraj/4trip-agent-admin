import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Bell, Settings } from "lucide-react";
import { toast } from 'react-toastify';

const Profile = () => {
  const [isEditing, setIsEditing] = useState({
    personalInfo: false,
    companyDetails: false,
    changePassword: false,
  });

  const [formData, setFormData] = useState({
    owner_name: "",
    business_name: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
    pincode: "",
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
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
        
        setFormData({
          owner_name: data.data.owner_name || '',
          business_name: data.data.business_name || '',
          email: data.data.email || '',
          phone_number: data.data.phone_number || '',
          address: data.data.address || '',
          city: data.data.city || '',
          pincode: data.data.pincode || '',
          currentPassword: '',
          newPassword: '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load profile data');
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = (section) => {
    setIsEditing(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (section) => {
    const agent_id = localStorage.getItem('agent_id');
    const token = localStorage.getItem('token_agents');

    try {
      const response = await fetch(`http://localhost:3000/api/commonauth/user/${agent_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Profile updated successfully');
        setIsEditing(prev => ({
          ...prev,
          [section]: false
        }));
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="bg-[#F5F6FA]">
      <div className="bg-[#F5F6FA]">
          <div className="flex-1 py-3 px-4 bg-[#FCB000] ">
            <div className="flex justify-end items-center">
              <div className="flex items-center space-x-4">
                <Bell className="w-4 h-4 text-white" />
                <Settings className="w-4 h-4 text-white" />
                <div className="flex items-center space-x-2 px-2 py-1 text-md bg-white rounded-md">
                  <span>Pawan kumar</span>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div className="p-8 max-w-4xl mx-auto bg-white">
        {/* Profile Header */}
        <div className="bg-white shadow rounded p-6 mb-6">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
            <div className="ml-4">
              <h1 className="text-xl font-semibold">{formData.owner_name}</h1>
              <p className="text-sm text-gray-500">{formData.business_name}</p>
              <p className="text-sm text-gray-500">
                {formData.address}, {formData.city} - {formData.pincode}
              </p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white shadow rounded p-6 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Personal Information</h2>
            <button
              className="text-sm text-blue-500 hover:underline"
              onClick={() => isEditing.personalInfo ? handleSave('personalInfo') : handleEditClick('personalInfo')}
            >
              {isEditing.personalInfo ? "Save" : "Edit"}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              {isEditing.personalInfo ? (
                <input
                  type="text"
                  name="owner_name"
                  value={formData.owner_name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              ) : (
                <p className="text-gray-700">{formData.owner_name}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-500">Email</label>
              {isEditing.personalInfo ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              ) : (
                <p className="text-gray-700">{formData.email}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-500">Phone Number</label>
              {isEditing.personalInfo ? (
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              ) : (
                <p className="text-gray-700">{formData.phone_number}</p>
              )}
            </div>
            <div className="col-span-2">
              <label className="text-sm text-gray-500">Address</label>
              {isEditing.personalInfo ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              ) : (
                <p className="text-gray-700">{formData.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Company Details */}
        <div className="bg-white shadow rounded p-6 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Company Details</h2>
            <button
              className="text-sm text-blue-500 hover:underline"
              onClick={() => handleEditClick("companyDetails")}
            >
              {isEditing.companyDetails ? "Save" : "Edit"}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm text-gray-500">Company Name</label>
              {isEditing.companyDetails ? (
                <input
                  type="text"
                  name="business_name"
                  value={formData.business_name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              ) : (
                <p className="text-gray-700">{formData.business_name}</p>
              )}
            </div>
            <div className="col-span-2">
              <label className="text-sm text-gray-500">City</label>
              {isEditing.companyDetails ? (
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              ) : (
                <p className="text-gray-700">{formData.city}</p>
              )}
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-lg font-medium">Change Password</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm text-gray-500">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
