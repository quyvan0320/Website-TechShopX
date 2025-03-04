import React from "react";

const InputField = ({ label, value, placeholder, onChange, type = "text" }) => {
  return (
    <div>
      <label className="block text-primary-dark font-medium mb-2">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
          rows="4"
        ></textarea>
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      )}
    </div>
  );
};

export default InputField;
