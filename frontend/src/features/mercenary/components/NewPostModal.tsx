// src/features/mercenary/components/NewPostModal.tsx (또는 해당 기능 폴더 내)

import React, { useState, useEffect } from 'react';
import { useAuthStore } from "@/stores/useAuthStore";
import {
  RecruitCategory,
  RecruitTargetType,
  ParticipantType,
  RecruitStatus,
  RecruitPostCreationRequestDto // 생성 요청 DTO 타입 임포트
} from "@/types/recruitPost";
import { REGIONS } from '@/constants/regions'; // 지역 상수 (경로 확인 필요)

interface Props {
  category: RecruitCategory; // 부모로부터 현재 모달의 카테고리를 받음
  onClose: () => void;
  onSubmit: (postData: RecruitPostCreationRequestDto) => void; // API 요청 DTO 타입 사용
}

const NewPostModal: React.FC<Props> = ({ category, onClose, onSubmit }) => {
  const { user } = useAuthStore();

  // 폼 상태 초기화 (RecruitPostCreationRequestDto 필드 기반)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [region, setRegion] = useState("");
  const [subRegion, setSubRegion] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [targetType, setTargetType] = useState<RecruitTargetType>(RecruitTargetType.USER);
  const [fromParticipant, setFromParticipant] = useState<ParticipantType>(ParticipantType.INDIVIDUAL);
  const [toParticipant, setToParticipant] = useState<ParticipantType>(ParticipantType.TEAM);
  const [gameDate, setGameDate] = useState<string>(''); // YYYY-MM-DD
  const [gameTime, setGameTime] = useState<string>(''); // HH:MM
  const [status, setStatus] = useState<RecruitStatus>(RecruitStatus.RECRUITING);
  const [requiredPersonnel, setRequiredPersonnel] = useState<number | ''>('');
  const [ageGroup, setAgeGroup] = useState("");
  const [preferredPositions, setPreferredPositions] = useState("");
  const [matchRules, setMatchRules] = useState("");
  const [minPlayers, setMinPlayers] = useState<number | ''>('');
  const [maxPlayers, setMaxPlayers] = useState<number | ''>('');

  const [isLoading, setIsLoading] = useState(false); // 등록 중 로딩 상태 (선택적)
  const [formError, setFormError] = useState<string | null>(null); // 폼 유효성 오류 메시지

  // 카테고리가 변경될 때 관련 필드 기본값 설정 (선택적 UX 개선)
  useEffect(() => {
    setStatus(RecruitStatus.RECRUITING); // 새 글 작성 시 기본은 모집중
    if (category === RecruitCategory.MERCENARY) {
      // 용병 모집 시 기본값 설정 예시
      setTargetType(RecruitTargetType.USER); // 보통 개인이 팀을 찾거나, 팀이 개인을 찾음
    } else if (category === RecruitCategory.TEAM) {
      // 팀원 모집 시 기본값 설정 예시
      setTargetType(RecruitTargetType.USER); // 팀이 개인(팀원)을 구함
      setFromParticipant(ParticipantType.TEAM);
      setToParticipant(ParticipantType.INDIVIDUAL);
    } else if (category === RecruitCategory.MATCH) {
      // 경기 모집 시 기본값 설정 예시
      setTargetType(RecruitTargetType.TEAM); // 팀이 다른 팀과 경기
      setFromParticipant(ParticipantType.TEAM);
      setToParticipant(ParticipantType.TEAM);
    }
  }, [category]);

  const handleSubmit = () => {
    setFormError(null); // 이전 오류 초기화
    if (!user || !user.id) {
      setFormError("글을 작성하려면 로그인이 필요합니다.");
      return;
    }
    if (!title.trim() || !content.trim() || !region) {
      setFormError("제목, 내용, 지역은 필수 입력 항목입니다.");
      return;
    }
    // TODO: 각 필드별 상세 프론트엔드 유효성 검사 추가 (예: 글자 수, 숫자 범위 등)

    setIsLoading(true); // 로딩 시작

    const numRequiredPersonnel = requiredPersonnel === '' ? undefined : Number(requiredPersonnel);
    const numMinPlayers = minPlayers === '' ? undefined : Number(minPlayers);
    const numMaxPlayers = maxPlayers === '' ? undefined : Number(maxPlayers);

    const postData: RecruitPostCreationRequestDto = {
      authorId: user.id,
      title: title.trim(),
      content: content.trim(),
      category, // prop으로 받은 현재 카테고리
      region,
      subRegion: subRegion.trim() || undefined,
      gameDate: gameDate || undefined, // 빈 문자열이면 undefined
      gameTime: gameTime || undefined, // 빈 문자열이면 undefined
      matchRules: matchRules.trim() || undefined,
      minPlayers: numMinPlayers,
      maxPlayers: numMaxPlayers,
      ageGroup: ageGroup.trim() || undefined,
      preferredPositions: preferredPositions.trim() || undefined,
      thumbnailUrl: thumbnailUrl.trim() || undefined,
      requiredPersonnel: numRequiredPersonnel, // 백엔드 DTO가 Integer를 받는다고 가정
      targetType,
      fromParticipant,
      toParticipant,
      status,
    };

    // onSubmit은 Promise를 반환하도록 수정하는 것이 좋음 (상위에서 로딩 상태 제어)
    onSubmit(postData);
    // 성공/실패 여부에 따라 모달을 닫거나 오류를 표시하는 것은 부모 컴포넌트에서 결정
    // 여기서는 일단 호출만 하고, onClose는 부모가 호출하도록 함
    // onClose(); // 부모 컴포넌트에서 호출하도록 변경 가능
    // setIsLoading(false); // 부모 컴포넌트에서 호출하도록 변경 가능
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center p-4 animate-fadeIn">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scaleUp">
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-xl font-bold text-gray-800">✏️ {category.toString()} 모집 글 작성</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl p-1 rounded-full hover:bg-gray-100 transition-colors">&times;</button>
        </div>

        {formError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-600 text-sm rounded-md">
            {formError}
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">제목 <span className="text-red-500">*</span></label>
            <input id="title" name="title" type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">상세 내용 <span className="text-red-500">*</span></label>
            <textarea id="content" name="content" rows={5} required value={content} onChange={(e) => setContent(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">주요 지역 <span className="text-red-500">*</span></label>
              <select id="region" name="region" required value={region} onChange={(e) => setRegion(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option value="">지역 선택</option>
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="subRegion" className="block text-sm font-medium text-gray-700 mb-1">세부 지역</label>
              <input id="subRegion" name="subRegion" type="text" value={subRegion} onChange={(e) => setSubRegion(e.target.value)} placeholder="예: 강남구" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700 mb-1">대표 이미지 URL</label>
            <input id="thumbnailUrl" name="thumbnailUrl" type="url" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="https://example.com/image.jpg"/>
          </div>
         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
             <div>
                 <label htmlFor="targetType" className="block text-sm font-medium text-gray-700 mb-1">모집 대상 타입 <span className="text-red-500">*</span></label>
                 <select id="targetType" name="targetType" required value={targetType} onChange={(e) => setTargetType(e.target.value as RecruitTargetType)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                     <option value={RecruitTargetType.USER}>개인 대상</option>
                     <option value={RecruitTargetType.TEAM}>팀 대상</option>
                 </select>
             </div>
             <div>
                 <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">모집 상태 <span className="text-red-500">*</span></label>
                 <select id="status" name="status" required value={status} onChange={(e) => setStatus(e.target.value as RecruitStatus)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                     {Object.values(RecruitStatus).map(s => <option key={s} value={s}>{s}</option>)}
                 </select>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
             <div>
                 <label htmlFor="fromParticipant" className="block text-sm font-medium text-gray-700 mb-1">모집 주체 <span className="text-red-500">*</span></label>
                 <select id="fromParticipant" name="fromParticipant" required value={fromParticipant} onChange={(e) => setFromParticipant(e.target.value as ParticipantType)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                     <option value={ParticipantType.INDIVIDUAL}>개인</option>
                     <option value={ParticipantType.TEAM}>팀</option>
                 </select>
             </div>
             <div>
                 <label htmlFor="toParticipant" className="block text-sm font-medium text-gray-700 mb-1">모집되는 대상 <span className="text-red-500">*</span></label>
                 <select id="toParticipant" name="toParticipant" required value={toParticipant} onChange={(e) => setToParticipant(e.target.value as ParticipantType)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                     <option value={ParticipantType.INDIVIDUAL}>개인</option>
                     <option value={ParticipantType.TEAM}>팀</option>
                 </select>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
             <div>
                 <label htmlFor="gameDate" className="block text-sm font-medium text-gray-700 mb-1">경기/활동 날짜</label>
                 <input id="gameDate" name="gameDate" type="date" value={gameDate} onChange={(e) => setGameDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
             </div>
             <div>
                 <label htmlFor="gameTime" className="block text-sm font-medium text-gray-700 mb-1">경기/활동 시간</label>
                 <input id="gameTime" name="gameTime" type="time" value={gameTime} onChange={(e) => setGameTime(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
             </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5">
             <div>
                 <label htmlFor="requiredPersonnel" className="block text-sm font-medium text-gray-700 mb-1">필요 인원</label>
                 <input id="requiredPersonnel" name="requiredPersonnel" type="number" min="0" value={requiredPersonnel} onChange={(e) => setRequiredPersonnel(e.target.value === '' ? '' : Number(e.target.value))} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
             </div>
             <div>
                 <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700 mb-1">연령대</label>
                 <input id="ageGroup" name="ageGroup" type="text" value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="예: 20대, 30-40대"/>
             </div>
             <div>
                 <label htmlFor="preferredPositions" className="block text-sm font-medium text-gray-700 mb-1">선호/모집 포지션</label>
                 <input id="preferredPositions" name="preferredPositions" type="text" value={preferredPositions} onChange={(e) => setPreferredPositions(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="예: 공격수, 전체"/>
             </div>
         </div>

         {/* 경기 모집(MATCH)일 때만 보이는 필드들 */}
         {category === RecruitCategory.MATCH && (
           <>
             <div>
               <label htmlFor="matchRules" className="block text-sm font-medium text-gray-700 mb-1">경기 규칙</label>
               <textarea id="matchRules" name="matchRules" rows={3} value={matchRules} onChange={(e) => setMatchRules(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
               <div>
                 <label htmlFor="minPlayers" className="block text-sm font-medium text-gray-700 mb-1">최소 팀 수</label>
                 <input id="minPlayers" name="minPlayers" type="number" min="0" value={minPlayers} onChange={(e) => setMinPlayers(e.target.value === '' ? '' : Number(e.target.value))} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
               </div>
               <div>
                 <label htmlFor="maxPlayers" className="block text-sm font-medium text-gray-700 mb-1">최대 팀 수</label>
                 <input id="maxPlayers" name="maxPlayers" type="number" min="0" value={maxPlayers} onChange={(e) => setMaxPlayers(e.target.value === '' ? '' : Number(e.target.value))} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
               </div>
             </div>
           </>
         )}

          <div className="flex justify-end gap-3 pt-6 border-t mt-6">
            <button type="button" onClick={onClose} disabled={isLoading} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50">
              취소
            </button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50">
              {isLoading ? "등록 중..." : "등록하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPostModal;