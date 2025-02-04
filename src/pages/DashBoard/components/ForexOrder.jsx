import { X } from "lucide-react";
import React, { useState } from "react";

function AddOrderModal({ isOpen, onClose, onAddOrder }) {
  const initialFormData = {
    currencyType: "",
    amount: "",
    deliveryAddress: "",
    pnrNumber1: "",
    destination1: "",
    pnrNumber2: "",
    destination2: "",
    city: "",
    code: "",
    paymentMethod: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.currencyType) newErrors.currencyType = "Currency type is required";
    if (!formData.amount) newErrors.amount = "Amount is required";
    if (!formData.deliveryAddress) newErrors.deliveryAddress = "Delivery address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.code) newErrors.code = "Postal code is required";
    if (!formData.paymentMethod) newErrors.paymentMethod = "Payment method is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formattedAmount = formatAmount(formData.amount, formData.currencyType);
      const orderData = {
        ...formData,
        amount: formattedAmount,
        deliveryAddress: `${formData.deliveryAddress}, ${formData.city}, ${formData.code}`
      };
      onAddOrder(orderData);
      setFormData(initialFormData);
    }
  };

  const formatAmount = (amount, currency) => {
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      INR: '₹'
    };
    return `${symbols[currency]}${amount}`;
  };

  const ClearForm = () => {
    setFormData(initialFormData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 min-w-fit rounded shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-4">
          <div className="text-lg font-medium">Forex Order Form </div>
          <button onClick={ClearForm} className="text-red-500">
            <X className="text-red-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-6">
            {/* Currency */}
            <div className="flex-1">
              <label htmlFor="currency" className="">
                Select Currency
              </label>
              <div className="border-2 mt-2">
                <select
                  name="currencyType"
                  value={formData.currencyType}
                  onChange={handleInputChange}
                  className="outline-none w-[97%] px-3 py-2 rounded"
                  required
                >
                  <option value="">Select Currency</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
              {errors.currencyType && (
                <span className="text-red-500 text-sm">{errors.currencyType}</span>
              )}
            </div>
            {/* Amount */}
            <div className="flex flex-1 flex-col">
              <label htmlFor="amount" className="">
                Enter Amount
              </label>
              <input
                type="text"
                name="amount"
                placeholder="Enter Amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="border border-gray-300 px-3 py-2 rounded mt-2"
                required
              />
              {errors.amount && (
                <span className="text-red-500 text-sm">{errors.amount}</span>
              )}
            </div>
          </div>

          <div>Conversation Rate -</div>

          <div className="text-xl font-medium">Travel Information</div>

          {/* PNR NUMBER */}
          <div className="w-full flex gap-6">
            <div className="flex gap-2">
              <div className="flex flex-col">
                <label htmlFor="pnrNumber" className="">
                  PNR Number
                </label>
                <input
                  type="text"
                  name="pnrNumber1"
                  placeholder="PNR Number"
                  value={formData.pnrNumber1}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 rounded mt-2"
                  required
                />
              </div>

              {/* Destination */}
              <div className="flex-1 flex flex-col">
                <label htmlFor="destination" className="">
                  Destination
                </label>
                <input
                  type="text"
                  name="destination1"
                  placeholder="Enter Destination"
                  value={formData.destination1}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 rounded mt-2"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col flex-1">
                <label htmlFor="pnrNumber" className="">
                  PNR Number
                </label>
                <input
                  type="text"
                  name="pnrNumber2"
                  placeholder="Enter PNR Number"
                  value={formData.pnrNumber2}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 rounded mt-2"
                  required
                />
              </div>

              {/* Destination */}
              <div className="flex-1 flex flex-col">
                <label htmlFor="destination" className="">
                  Destination
                </label>
                <input
                  type="text"
                  name="destination2"
                  placeholder="Enter Destination"
                  value={formData.destination2}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 rounded mt-2"
                  required
                />
              </div>
            </div>
          </div>

          <div className="text-xl font-medium">Delivery Address</div>
          <div className="flex gap-10">
            <div>
              {/* Delivery Address */}
              <div className="flex flex-col">
                <label htmlFor="deliveryAddress">Address</label>
                <input
                  type="text"
                  name="deliveryAddress"
                  placeholder="Delivery Address"
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 rounded mt-2"
                  required
                />
              </div>

              <div className="flex gap-4 pt-2">
                <div className="flex flex-col flex-1">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-3 py-2 rounded mt-2"
                    required
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label htmlFor="city">Postal Code</label>
                  <input
                    type="text"
                    name="code"
                    placeholder="Enter Postal Code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-3 py-2 rounded mt-2"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="flex flex-1 flex-col">
                <label htmlFor="paymentMethod">Payment Method</label>
                {/* Chose Payment Method */}
                <div className="border-2 mt-[7px] rounded-sm">
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="outline-none w-[97%] px-3 py-2 rounded-md"
                    required
                  >
                    <option value="">Select Payment Method</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-8">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-3 text-lg w-full rounded-xl"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddOrderModal;
