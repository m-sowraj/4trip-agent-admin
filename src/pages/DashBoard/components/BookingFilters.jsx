import React from 'react';

const BookingFilters = ({ filters, onFilterChange }) => {
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm text-gray-600 mb-1">Date Range</label>
        <div className="flex gap-2 items-center">
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => onFilterChange('startDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <span>to</span>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => onFilterChange('endDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Amount Range</label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            value={filters.minAmount}
            onChange={(e) => onFilterChange('minAmount', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxAmount}
            onChange={(e) => onFilterChange('maxAmount', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Client Name</label>
        <input
          type="text"
          value={filters.clientName}
          onChange={(e) => onFilterChange('clientName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder="Search by client name"
        />
      </div>

      <div className="flex items-end">
        <button
          onClick={() => onFilterChange('clear')}
          className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default BookingFilters; 