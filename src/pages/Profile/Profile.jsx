import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Bell, Settings } from "lucide-react";
import { toast } from 'react-toastify';
import api from '../../utils/axios'; // Import the Axios instance

const Profile = ({ isOpen, onClose }) => {
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

  const [logoImage, setLogoImage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const agent_id = localStorage.getItem('agent_id');

      try {
        const response = await api.get(`/commonauth/user/${agent_id}`);
        const data = response.data;
        
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
        setLogoImage(data.data.logo_url || ''); // Set logo image URL
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

    try {
      const response = await api.put(`/commonauth/user/${agent_id}`, formData);

      if (response.status === 200) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-8 max-w-4xl mx-auto rounded shadow-lg z-50">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          &times;
        </button>
        {/* Profile Header */}
        <div className="bg-white shadow rounded p-6 mb-6">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0">
              {logoImage && <img src={logoImage} alt="Logo" className="w-full h-full rounded-full" />}
            </div>
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
              <p className="text-gray-700">{formData.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Phone Number</label>
              <p className="text-gray-700">{formData.phone_number}</p>
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
