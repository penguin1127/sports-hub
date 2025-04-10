// src/components/cards/MercenaryCard.tsx
import React from "react";

type MercenaryCardProps = {
  name: string;
  age: number;
  position: string;
  region: string;
  availableDates: string[];
};

const MercenaryCard: React.FC<MercenaryCardProps> = ({ name, age, position, region, availableDates }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-md mx-auto">
      <div className="text-xl font-semibold mb-2">{name} ({age})</div>
      <div className="text-sm text-gray-600 mb-1">Position: {position}</div>
      <div className="text-sm text-gray-600 mb-1">Region: {region}</div>
      <div className="text-sm text-gray-600">Available: {availableDates.join(", ")}</div>
    </div>
  );
};

export default MercenaryCard;
