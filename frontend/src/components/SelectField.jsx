import React from 'react'

const SelectField = ({ label, value, options, onChange }) => {
  return (
    <div>
    <label className="block text-primary-dark font-medium mb-2">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-md p-2"
    >
      <option value="">-- Chọn --</option>
      {options.map((option) => (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
  )
}

export default SelectField