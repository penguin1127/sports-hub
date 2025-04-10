// ✅ src/features/mercenary/components/MercenaryToggle.tsx
import ToggleSwitch from "@/components/Toggle/ToggleSwitch";

interface Props {
  isLeft: boolean;
  onToggle: () => void;
}

const MercenaryToggle = ({ isLeft, onToggle }: Props) => {
  return (
    <ToggleSwitch
      leftLabel="개인"
      rightLabel="팀"
      isLeft={isLeft}
      onToggle={onToggle}
    />
  );
};

export default MercenaryToggle;
