// src/features/mercenary/components/MercenaryDetailCard.tsx

import React from 'react'; // React 임포트
import type { PostType } from "@/types/recruitPost"; // PostType은 타입으로만 사용될 수 있음
// Enum을 값으로 사용하므로 일반 import로 변경
import { RecruitCategory, RecruitTargetType, RecruitStatus } from "@/types/recruitPost";

// Props 타입 정의
interface MercenaryDetailCardProps {
  post: PostType;
  isExpanded: boolean;
  onClose?: () => void;
  onExpand?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onAuthorNameClick?: () => void; // 작성자 이름 클릭 핸들러 prop 추가
}

// 상태에 따른 텍스트 및 스타일 반환 헬퍼 함수
const getStatusDisplayForDetail = (statusValue: PostType["status"]): React.ReactNode => {
  let styleClass = "font-semibold ";
  let statusText = statusValue as string; // PostType.status가 string이라고 가정

  // RecruitStatus Enum 값과 직접 비교
  if (statusValue === RecruitStatus.RECRUITING) {
    styleClass += "text-green-600";
    statusText = "모집중";
  } else if (statusValue === RecruitStatus.COMPLETED) {
    styleClass += "text-blue-600";
    statusText = "모집완료";
  } else if (statusValue === RecruitStatus.IN_PROGRESS) {
    styleClass += "text-yellow-600";
    statusText = "진행/경기중";
  } else if (statusValue === RecruitStatus.CANCELLED) {
     styleClass += "text-red-600";
     statusText = "모집취소";
  } else if (statusValue === RecruitStatus.FINISHED) {
     styleClass += "text-gray-600";
     statusText = "종료";
  } else {
    styleClass += "text-gray-700"; // 알 수 없는 상태 또는 기본 상태
  }
  return <span className={styleClass}>{statusText}</span>;
};

const MercenaryDetailCard = ({ post, isExpanded, onClose, onExpand, onEdit, onDelete, onAuthorNameClick }: MercenaryDetailCardProps) => {
  
  // ▼▼▼ 1. 'fromParticipant'를 기준으로 모집 유형을 파악합니다. ▼▼▼
  const isTeamToIndividual = post.fromParticipant === 'TEAM';

  // ▼▼▼ 2. 파악된 유형에 따라 라벨 텍스트를 동적으로 생성합니다. ▼▼▼
  const flowLabel = isTeamToIndividual ? "팀 → 개인" : "개인 → 팀";
  const dateLabel = isTeamToIndividual ? '경기 날짜' : '활동 가능 날짜';
  const timeLabel = isTeamToIndividual ? '경기 시간' : '활동 가능 시간';
  const positionLabel = isTeamToIndividual ? '모집 포지션' : '선호 포지션';

  const formattedDate = post.gameDate ? post.gameDate.toString().split("T")[0] : "날짜 미정";
  const formattedTime = post.gameTime || "시간 미정";

  // 요약 카드 (펼치기 전)
  if (!isExpanded) {
    return (
      <div
        className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200 ease-in-out h-full flex flex-col"
        onClick={onExpand}
      >
        <div className="relative w-full h-32">
          {post.thumbnailUrl ? (
            <img src={post.thumbnailUrl} alt={post.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.158 0a.075.075 0 0 1 .15 0A.075.075 0 0 1 12.908 8.25h.008a.075.075 0 0 1 0 .15A.075.075 0 0 1 12.908 8.4h-.008a.075.075 0 0 1-.15 0A.075.075 0 0 1 12.75 8.25h.008Z" /></svg>
            </div>
          )}
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 shadow">
            {flowLabel}
          </div>
        </div>
        <div className="p-3 flex flex-col flex-grow">
          <h3 className="text-sm font-semibold mt-1 mb-1 text-gray-800 truncate">{post.title}</h3>
          <div className="text-xs text-gray-500 mt-auto space-y-0.5">
            <p>지역: {post.region}{post.subRegion ? ` ${post.subRegion}` : ''}</p>
            <p>일시: {formattedDate}</p>
            {post.authorName && <p>작성자: {post.authorName}</p>}
            {post.status && <p>상태: {getStatusDisplayForDetail(post.status)}</p>}
          </div>
        </div>
      </div>
    );
  }

  // 상세 카드 (펼친 후)
  return (
    <div className="bg-white shadow-xl rounded-lg p-6 col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full mr-2">
            {flowLabel}
          </span>
          <h2 className="text-2xl font-bold text-gray-800 inline">{post.title}</h2>
        </div>
        {onClose && <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl leading-none">&times;</button>}
      </div>
      
      {post.thumbnailUrl && (
          <img src={post.thumbnailUrl} alt={post.title} className="w-full h-64 object-cover rounded-md mb-4" />
      )}
      
      <div className="text-sm text-gray-700 space-y-2">
        <p><strong>지역:</strong> {post.region}{post.subRegion ? `, ${post.subRegion}` : ''}</p>
        <p><strong>{dateLabel}:</strong> {formattedDate}</p>
        <p><strong>{timeLabel}:</strong> {formattedTime}</p>
        
        {isTeamToIndividual && (
          <>
            {post.requiredPersonnel != null && <p><strong>필요 인원:</strong> {post.requiredPersonnel}명</p>}
            {post.ageGroup && <p><strong>모집 연령대:</strong> {post.ageGroup}</p>}
          </>
        )}
        
        {post.preferredPositions && <p><strong>{positionLabel}:</strong> {post.preferredPositions}</p>}
        {post.authorName && (
          <p>
            <strong>작성자:</strong>{' '}
            <span 
              className={`text-blue-600 ${onAuthorNameClick ? 'hover:underline cursor-pointer' : ''}`}
              onClick={(e) => { if (onAuthorNameClick) { e.stopPropagation(); onAuthorNameClick(); } }}
            >
              {post.authorName}
            </span>
          </p>
        )}
        {post.status && <p><strong>상태:</strong> {getStatusDisplayForDetail(post.status)}</p>}
        <p className="mt-2 whitespace-pre-wrap"><strong>상세 내용:</strong><br/>{post.content}</p>
      </div>

      {/* ▼▼▼ 수정 및 삭제 버튼 영역 ▼▼▼ */}
      <div className="mt-6 text-right space-x-2">
        {/* 'onEdit' prop이 있을 때만 수정 버튼을 보여줍니다. */}
        {onEdit && (
            <button 
                onClick={(e) => { e.stopPropagation(); onEdit(); }} 
                className="bg-gray-500 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded"
            >
                수정
            </button>
        )}
        {/* 'onDelete' prop이 있을 때만 삭제 버튼을 보여줍니다. */}
        {onDelete && (
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(); }} 
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded"
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
};

export default MercenaryDetailCard;