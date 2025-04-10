// src/components/Card/SummaryCard.tsx
import { cn } from "@/lib/utils";
import { SummaryCardData } from "@/mock/mockData";

const colorMap: Record<SummaryCardData["type"], string> = {
  team: "border-blue-500",
  team_team: "border-blue-400",
  mercenary: "border-green-500",
  mercenary_team: "border-green-400",
  match: "border-purple-500",
};

const SummaryCard = ({ type, title, date, region, description, thumbnail }: SummaryCardData) => {
  return (
    <div
      className={cn(
        "bg-white w-72 flex-shrink-0 p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer snap-start",
        "border-l-4",
        colorMap[type]
      )}
    >
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <div className="text-sm text-gray-500 mb-2">{`${date} · ${region}`}</div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default SummaryCard;
