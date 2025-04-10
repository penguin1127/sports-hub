// ✅ src/features/match/components/MatchFilterGroupWrapper.tsx
import FilterGroup from "@/components/Filter/FilterGroup";

interface Props {
  searchValue: string;
  selectedRegion: string;
  onSearchChange: (value: string) => void;
  onRegionChange: (region: string) => void;
  onReset: () => void;
}

const MatchFilterGroupWrapper = ({
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

export default MatchFilterGroupWrapper;