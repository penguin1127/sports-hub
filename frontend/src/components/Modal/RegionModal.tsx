// src/components/Modal/RegionModal.tsx

import { Dispatch, SetStateAction } from "react";

const regions = [
  "전체", "서울", "경기", "인천", "부산", "대구", "대전", "광주",
  "울산", "세종", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"
];

interface RegionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (region: string) => void;
}

const RegionModal = ({ isOpen, onClose, onSelect }: RegionModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white w-full max-w-md mx-auto p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">지역 선택</h3>
        <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => {
                onSelect(region);
                onClose();
              }}
              className="px-3 py-2 bg-gray-100 hover:bg-blue-100 rounded text-sm"
            >
              {region}
            </button>
          ))}
        </div>
        <div className="text-right mt-4">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:underline"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegionModal;
