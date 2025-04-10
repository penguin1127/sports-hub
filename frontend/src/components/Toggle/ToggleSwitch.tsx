// src/components/Toggle/ToggleSwitch.tsx

type ToggleSwitchProps = {
    leftLabel: string;
    rightLabel: string;
    isLeft: boolean;
    onToggle: () => void;
  };
  
  const ToggleSwitch = ({ leftLabel, rightLabel, isLeft, onToggle }: ToggleSwitchProps) => {
    return (
      <div className="flex items-center bg-gray-200 rounded-full w-max p-1">
        <button
          onClick={onToggle}
          className={`px-4 py-1 rounded-full transition ${
            isLeft ? "bg-white text-black shadow" : "text-gray-500"
          }`}
        >
          {leftLabel}
        </button>
        <button
          onClick={onToggle}
          className={`px-4 py-1 rounded-full transition ${
            !isLeft ? "bg-white text-black shadow" : "text-gray-500"
          }`}
        >
          {rightLabel}
        </button>
      </div>
    );
  };
  
  export default ToggleSwitch;
  