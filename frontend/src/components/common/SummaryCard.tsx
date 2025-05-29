// src/components/common/SummaryCard.tsx

import { useNavigate } from "react-router-dom"; // Link 대신 navigate를 사용하고 있다면 유지
import type { PostType } from "@/types/recruitPost"; // PostType 경로는 실제 프로젝트에 맞게

// CardProps 타입을 PostType 전체를 받도록 하거나, 필요한 필드만 명시할 수 있습니다.
// 여기서는 PostType 전체를 받는다고 가정하고, 필요한 필드만 구조 분해 할당합니다.
// type CardProps = PostType; // 이렇게 해도 동일합니다.

const getLabel = (category: PostType["category"], targetType: PostType["targetType"]): string => {
  if (category === "MATCH") return "[경기 모집]"; // PostType.category는 대문자 Enum 값의 문자열 리터럴 유니온
  if (category === "TEAM") return "[팀원 모집]"; // PostType.category는 대문자 Enum 값의 문자열 리터럴 유니온
  if (targetType === "USER") return "[용병(개인) 모집]"; // PostType.targetType은 대문자 Enum 값의 문자열 리터럴 유니온
  if (targetType === "TEAM") return "[용병(팀) 모집]"; // PostType.targetType은 대문자 Enum 값의 문자열 리터럴 유니온
  return "[모집]"; // 기본값
};

const SummaryCard = (props: PostType) => { // props 전체를 PostType으로 받음
  const {
    id,
    title,
    category,
    targetType, // PostType의 targetType 필드 사용 (대문자 T)
    region,
    // subRegion, // 필요하다면 subRegion도 표시
    gameDate,    // PostType의 gameDate 필드 사용
    gameTime,    // PostType의 gameTime 필드 사용
    thumbnailUrl,// PostType의 thumbnailUrl 필드 사용 (대문자 U)
    authorName,  // PostType의 authorName 필드 사용 (또는 authorId를 사용해 작성자 정보를 가져올 수도 있음)
    status,      // PostType의 status 필드 사용
    // ... PostType에서 SummaryCard에 표시할 다른 필드들
  } = props;

  // const navigate = useNavigate(); // 카드를 Link로 감싸면 navigate는 여기서 불필요할 수 있음
  const label = getLabel(category, targetType);

  // const handleClick = () => { // 카드를 Link로 감싸면 이 핸들러는 불필요
  //   // 상세 페이지로 이동하는 로직은 HomeSectionSlider 등 상위 컴포넌트의 Link로 처리
  // };

  // 날짜와 시간 형식 변환 (예시 - 필요에 따라 라이브러리 사용 또는 형식 변경)
  const formattedGameDate = gameDate ? new Date(gameDate).toLocaleDateString('ko-KR') : '날짜 미정';
  const formattedGameTime = gameTime || '시간 미정';


  return (
    // 이 카드를 Link로 감싸서 클릭 가능하게 만드는 것은 상위 컴포넌트(예: HomeSectionSlider)의 역할
    <div className="bg-white shadow-md rounded-lg overflow-hidden h-full flex flex-col cursor-pointer transform hover:scale-105 transition-transform duration-200 ease-in-out">
      {thumbnailUrl ? (
        <img src={thumbnailUrl} alt={title} className="w-full h-32 object-cover" />
      ) : (
        <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.158 0a.075.075 0 0 1 .15 0A.075.075 0 0 1 12.908 8.25h.008a.075.075 0 0 1 0 .15A.075.075 0 0 1 12.908 8.4h-.008a.075.075 0 0 1-.15 0A.075.075 0 0 1 12.75 8.25h.008Z" />
          </svg>
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-blue-600 font-semibold">{label}</p>
        <h3 className="text-md font-bold mt-1 mb-2 text-gray-800 truncate group-hover:text-blue-700 transition-colors">
          {title}
        </h3>
        <div className="text-xs text-gray-500 mt-auto">
          <p>지역: {region}{props.subRegion ? ` ${props.subRegion}` : ''}</p>
          <p>일시: {formattedGameDate} {formattedGameTime}</p>
          {authorName && <p>작성자: {authorName}</p>}
          <p>상태: <span className={`font-semibold ${status === 'RECRUITING' ? 'text-green-600' : 'text-gray-600'}`}>{status}</span></p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;