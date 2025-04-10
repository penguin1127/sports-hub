// src/features/mercenary/components/MercenaryRecruitCard.tsx
import { SummaryCardData } from "@/mock/mockData";

interface Props extends SummaryCardData {
  isExpanded: boolean;
  onClick: () => void;
}

const MercenaryRecruitCard = ({
  title,
  date,
  region,
  description,
  thumbnail,
  isExpanded,
  onClick,
}: Props) => {
  return (
    <div
      className={`bg-white p-4 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition-all
        ${isExpanded ? "md:col-span-2 scale-[1.02]" : ""}
      `}
      onClick={onClick}
    >
      <img src={thumbnail} alt={title} className="w-full h-40 object-cover rounded-lg mb-3" />
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <div className="text-sm text-gray-500 mb-2">{`${date} · ${region}`}</div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default MercenaryRecruitCard;
