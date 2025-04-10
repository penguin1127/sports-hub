// src/components/Filter/FilterGroup.tsx

import { useState } from "react";
import SearchInput from "@/components/Search/SearchInput";
import ResetButton from "@/components/Filter/ResetButton";
import RegionModal from "@/components/Modal/RegionModal";

interface FilterGroupProps {
  onSearchChange: (keyword: string) => void;
  onRegionChange: (region: string) => void;
  onReset: () => void;
  searchValue: string;
  selectedRegion: string;
}

const FilterGroup = ({
  onSearchChange,
  onRegionChange,
  onReset,
  searchValue,
  selectedRegion,
}: FilterGroupProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between mb-4">
      <div className="flex flex-1 gap-2">
        <SearchInput value={searchValue} onChange={onSearchChange} />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 border rounded-lg bg-white text-sm hover:bg-gray-100"
        >
          지역 선택: {selectedRegion}
        </button>

        <RegionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelect={(region) => {
            onRegionChange(region);
            setIsModalOpen(false);
          }}
        />
      </div>
      <ResetButton onClick={onReset} />
    </div>
  );
};

export default FilterGroup;
