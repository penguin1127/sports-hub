// src/components/Filter/ResetButton.tsx
interface ResetButtonProps {
    onClick: () => void;
  }
  
  const ResetButton = ({ onClick }: ResetButtonProps) => {
    return (
      <button
        onClick={onClick}
        className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition"
      >
        초기화
      </button>
    );
  };
  
  export default ResetButton;
  