// src/components/Filter/FilterDropdown.tsx

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FilterDropdownProps {
  label: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

const FilterDropdown = ({ label, options, selected, onChange }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white text-sm hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span>{label}: {selected}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-md max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;