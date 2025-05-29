// src/features/mercenary/components/MercenaryDetailCard.tsx

import type { PostType } from "@/types/recruitPost";
// Enum을 값으로 사용하므로 일반 import
import { RecruitCategory, RecruitTargetType, RecruitStatus } from "@/types/recruitPost";
import { JSX } from "react";

// Props 타입 정의
interface MercenaryDetailCardProps {
  post: PostType;
  isExpanded: boolean;
  onClose?: () => void;
  onExpand?: () => void;
  onDelete?: () => void;
}

// 상태에 따른 텍스트 및 스타일 반환 헬퍼 함수 (SummaryCard와 중복되므로 utils로 분리 권장)
const getStatusDisplayForDetail = (status: PostType["status"]): JSX.Element => {
  let styleClass = "font-semibold ";
  let statusText = status as string; // PostType.status가 string인 경우

  // PostType.status가 RecruitStatus Enum 타입이라면 RecruitStatus.RECRUITING 등으로 직접 비교
  // 현재 recruitPost.ts의 PostType.status는 string이므로, Enum의 문자열 값과 비교
  if (status === RecruitStatus.RECRUITING) {
    styleClass += "text-green-600";
    statusText = "모집중";
  } else if (status === RecruitStatus.COMPLETED) {
    styleClass += "text-blue-600";
    statusText = "모집완료";
  } else if (status === RecruitStatus.IN_PROGRESS) {
    styleClass += "text-yellow-600";
    statusText = "진행/경기중";
  } else if (status === RecruitStatus.CANCELLED) {
     styleClass += "text-red-600";
     statusText = "모집취소";
  } else if (status === RecruitStatus.FINISHED) {
     styleClass += "text-gray-600";
     statusText = "종료";
  } else {
    styleClass += "text-gray-700";
  }
  return <span className={styleClass}>{statusText}</span>;
};


const MercenaryDetailCard = ({ post, isExpanded, onClose, onExpand, onDelete }: MercenaryDetailCardProps) => {
  const {
    title,
    category,
    targetType,
    region,
    subRegion,
    gameDate,
    gameTime,
    thumbnailUrl,
    authorName,
    status,
    content, // 상세 내용
    // PostType에서 필요한 다른 필드들 (예: requiredPersonnel, ageGroup 등)
    requiredPersonnel,
    ageGroup,
    preferredPositions,
    matchRules,
  } = post;

  const formattedDate = gameDate ? gameDate.toString().split("T")[0] : "날짜 미정";
  const formattedTime = gameTime || "시간 미정";

  let recruitmentLabel: string | null = null;
  if (category !== RecruitCategory.MATCH) {
    if (targetType === RecruitTargetType.USER) {
      recruitmentLabel = category === RecruitCategory.MERCENARY ? "팀 → 용병(개인)" : "팀 → 팀원";
    } else if (targetType === RecruitTargetType.TEAM) {
      recruitmentLabel = category === RecruitCategory.MERCENARY ? "용병(개인) → 팀" : "개인 → 팀 합류";
    }
  }

  if (!isExpanded) {
    return (
      <div
        className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200 ease-in-out h-full flex flex-col"
        onClick={onExpand} // onExpand prop이 있다면 호출
      >
        <div className="relative w-full h-32">
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.158 0a.075.075 0 0 1 .15 0A.075.075 0 0 1 12.908 8.25h.008a.075.075 0 0 1 0 .15A.075.075 0 0 1 12.908 8.4h-.008a.075.075 0 0 1-.15 0A.075.075 0 0 1 12.75 8.25h.008Z" /></svg>
            </div>
          )}
          {recruitmentLabel && (
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 shadow">
              {recruitmentLabel}
            </div>
          )}
        </div>
        <div className="p-3 flex flex-col flex-grow">
          <h3 className="text-sm font-semibold mt-1 mb-1 text-gray-800 truncate">{title}</h3>
          <div className="text-xs text-gray-500 mt-auto space-y-0.5">
            <p>지역: {region}{subRegion ? ` ${subRegion}` : ''}</p>
            <p>일시: {formattedDate} {formattedTime}</p>
            {authorName && <p>작성자: {authorName}</p>}
            {status && <p>상태: {getStatusDisplayForDetail(status)}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl rounded-lg p-6 col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4"> {/* 상세 보기 시 더 넓게 표시 */}
      <div className="flex justify-between items-start mb-4">
        <div>
          {recruitmentLabel && (
            <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full mr-2">
              {recruitmentLabel}
            </span>
          )}
          <h2 className="text-2xl font-bold text-gray-800 inline">{title}</h2>
        </div>
        {onClose && <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl leading-none">&times;</button>}
      </div>
      
      {thumbnailUrl && (
          <img src={thumbnailUrl} alt={title} className="w-full h-64 object-cover rounded-md mb-4" />
      )}
      
      <div className="text-sm text-gray-700 space-y-2">
        <p><strong>지역:</strong> {region}{subRegion ? `, ${subRegion}` : ''}</p>
        <p><strong>일시:</strong> {formattedDate} {formattedTime}</p>
        {authorName && <p><strong>작성자:</strong> <span className="text-blue-600 hover:underline cursor-pointer" onClick={() => alert(`'${authorName}' 프로필 보기`)}>{authorName}</span></p>}
        {status && <p><strong>상태:</strong> {getStatusDisplayForDetail(status)}</p>}
        {requiredPersonnel && <p><strong>필요인원:</strong> {requiredPersonnel}명</p>}
        {ageGroup && <p><strong>연령대:</strong> {ageGroup}</p>}
        {preferredPositions && <p><strong>선호 포지션:</strong> {preferredPositions}</p>}
        {matchRules && <p className="mt-1 whitespace-pre-wrap"><strong>경기 규칙:</strong><br/>{matchRules}</p>}
        <p className="mt-2 whitespace-pre-wrap"><strong>상세 내용:</strong><br/>{content}</p>
      </div>

      {onDelete && (
        <div className="mt-6 text-right">
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default MercenaryDetailCard;