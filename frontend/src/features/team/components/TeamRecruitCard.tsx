// src/features/team/components/TeamRecruitCard.tsx
import { SummaryCardData } from "@/mock/mockData";
import { cn } from "@/lib/utils";

interface Props {
  data: SummaryCardData;
  isSelected: boolean;
  onClick: () => void;
}

const TeamRecruitCard = ({ data, isSelected, onClick }: Props) => {
  return (
    <div
      className={cn(
        "bg-white p-4 rounded-xl border-l-4 transition-all duration-300 shadow cursor-pointer",
        isSelected ? "scale-105 col-span-full" : "",
        data.type === "team" ? "border-blue-500" : "border-blue-400"
      )}
      onClick={onClick}
    >
      <img
        src={data.thumbnail}
        alt={data.title}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold">{data.title}</h3>
      <p className="text-sm text-gray-500 mb-1">{`${data.date} · ${data.region}`}</p>
      <p className="text-sm text-gray-700">{data.description}</p>
    </div>
  );
};

export default TeamRecruitCard;
