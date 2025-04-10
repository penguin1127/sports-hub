// ✅ src/features/team/components/TeamToggle.tsx
import ToggleSwitch from "@/components/Toggle/ToggleSwitch";

interface Props {
  isLeft: boolean;
  onToggle: () => void;
}

const TeamToggle = ({ isLeft, onToggle }: Props) => {
  return (
    <ToggleSwitch
      leftLabel="개인"
      rightLabel="팀"
      isLeft={isLeft}
      onToggle={onToggle}
    />
  );
};

export default TeamToggle;
