// src/features/mercenary/components/MercenaryFilterGroupWrapper.tsx

import FilterGroup from "@/components/Filter/FilterGroup";

interface Props {
  searchValue: string;
  selectedRegion: string;
  onSearchChange: (v: string) => void;
  onRegionChange: (v: string) => void;
  onReset: () => void;
}

const MercenaryFilterGroupWrapper = ({
  searchValue,
  selectedRegion,
  onSearchChange,
  onRegionChange,
  onReset,
}: Props) => {
  return (
    <FilterGroup
      searchValue={searchValue}
      selectedRegion={selectedRegion}
      onSearchChange={onSearchChange}
      onRegionChange={onRegionChange}
      onReset={onReset}
    />
  );
};

export default MercenaryFilterGroupWrapper;