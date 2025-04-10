import { ReactNode } from "react";
import ToggleSwitch from "@/components/Toggle/ToggleSwitch";

interface SectionWithToggleProps {
  title: string;
  toggleState: boolean;
  onToggle: () => void;
  link: string;
  children: ReactNode;
}

const SectionWithToggle = ({
  title,
  toggleState,
  onToggle,
  link,
  children,
}: SectionWithToggleProps) => {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <ToggleSwitch
            leftLabel="개인"
            rightLabel="팀"
            isLeft={toggleState}
            onToggle={onToggle}
          />
        </div>
        <a href={link} className="text-blue-500 hover:underline">
          더보기 →
        </a>
      </div>
      {children}
    </section>
  );
};

export default SectionWithToggle;
