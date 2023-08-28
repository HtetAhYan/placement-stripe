import React from 'react';

function CustomDropdown({ value, onChange, selectedOptions }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
          data-te-select-init
          className='max-w-[80]'
    >
      <option value=''>Select an option</option>
      {selectedOptions.map((item) => (
        <option key={item.label} value={item.label}>
          {item.label}
        </option>
      ))}
    </select>
  );
}

export default CustomDropdown;
