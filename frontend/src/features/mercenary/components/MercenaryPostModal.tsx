// src/features/mercenary/components/MercenaryPostModal.tsx

import React, { useState } from 'react';
import { useAuthStore } from "@/stores/useAuthStore";
import {
  RecruitCategory,
  RecruitTargetType,
  ParticipantType,
  RecruitPostCreationRequestDto
} from "@/types/recruitPost";
import { REGIONS } from '@/constants/regions';
import Modal from '@/components/common/Modal';
import RecruitPostBaseForm from '@/components/common/RecruitPostBaseForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (postData: RecruitPostCreationRequestDto) => void;
}

type RecruitmentFlow = 'TEAM_TO_INDIVIDUAL' | 'INDIVIDUAL_TO_TEAM';

const MercenaryPostModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    region: "",
    subRegion: "",
    gameDate: "",
    gameTime: "",
    requiredPersonnel: '' as number | '',
    ageGroup: "",
    preferredPositions: "",
  });

  const [recruitmentFlow, setRecruitmentFlow] = useState<RecruitmentFlow>('TEAM_TO_INDIVIDUAL');
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!user) { /* ... 유효성 검사 ... */ return; }
    if (!formData.title.trim() || !formData.content.trim() || !formData.region) { /* ... */ return; }
    
    setIsLoading(true);

    const isTeamToIndividual = recruitmentFlow === 'TEAM_TO_INDIVIDUAL';
    const dto: RecruitPostCreationRequestDto = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      category: RecruitCategory.MERCENARY,
      region: formData.region,
      subRegion: formData.subRegion.trim() || undefined,
      gameDate: formData.gameDate || undefined,
      gameTime: formData.gameTime || undefined,
      // ▼▼▼ '팀->개인'일 때만 값을 보내고, 아닐 경우엔 undefined(null)로 보냅니다. ▼▼▼
      requiredPersonnel: isTeamToIndividual ? (formData.requiredPersonnel === '' ? undefined : Number(formData.requiredPersonnel)) : undefined,
      ageGroup: isTeamToIndividual ? (formData.ageGroup.trim() || undefined) : undefined,
      preferredPositions: formData.preferredPositions.trim() || undefined,
      fromParticipant: isTeamToIndividual ? ParticipantType.TEAM : ParticipantType.INDIVIDUAL,
      toParticipant: isTeamToIndividual ? ParticipantType.INDIVIDUAL : ParticipantType.TEAM,
      targetType: isTeamToIndividual ? RecruitTargetType.USER : RecruitTargetType.TEAM,
    };

    try {
      await onSubmit(dto);
    } finally {
      setIsLoading(false);
    }
  };

  const isTeamToIndividual = recruitmentFlow === 'TEAM_TO_INDIVIDUAL';
  const dateLabel = isTeamToIndividual ? '경기 날짜' : '활동 가능 날짜';
  const timeLabel = isTeamToIndividual ? '경기 시간' : '활동 가능 시간';
  // ▼▼▼ '포지션' 라벨을 위한 변수 추가 ▼▼▼
  const positionLabel = isTeamToIndividual ? '모집 포지션' : '선호 포지션';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="✏️ 용병 모집 글 작성">
      <form onSubmit={handleSubmit} className="space-y-5">
        <RecruitPostBaseForm formData={formData} handleInputChange={handleInputChange} />
        
        {/* 모집 유형 */}
        <div>
          <label htmlFor="recruitmentFlow" className="block text-sm font-medium text-gray-700 mb-1">모집 유형 <span className="text-red-500">*</span></label>
          <select id="recruitmentFlow" name="recruitmentFlow" required value={recruitmentFlow} onChange={(e) => setRecruitmentFlow(e.target.value as RecruitmentFlow)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md">
            <option value="TEAM_TO_INDIVIDUAL">팀 → 개인</option>
            <option value="INDIVIDUAL_TO_TEAM">개인 → 팀</option>
          </select>
        </div>
        
        {/* 날짜 / 시간 필드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
           <div>
               <label htmlFor="gameDate" className="block text-sm font-medium text-gray-700 mb-1">{dateLabel}</label>
               <input id="gameDate" name="gameDate" type="date" value={formData.gameDate} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
           </div>
           <div>
               <label htmlFor="gameTime" className="block text-sm font-medium text-gray-700 mb-1">{timeLabel}</label>
               <input id="gameTime" name="gameTime" type="time" value={formData.gameTime} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
           </div>
       </div>

       {/* 필요 인원 / 연령대 / 포지션 */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5">
            {/* ▼▼▼ '팀->개인'일 때만 이 필드들을 렌더링합니다. ▼▼▼ */}
            {isTeamToIndividual && (
              <>
                <div>
                    <label htmlFor="requiredPersonnel" className="block text-sm font-medium text-gray-700 mb-1">필요 인원</label>
                    <input id="requiredPersonnel" name="requiredPersonnel" type="number" min="0" value={formData.requiredPersonnel} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                    <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700 mb-1">연령대</label>
                    <input id="ageGroup" name="ageGroup" type="text" value={formData.ageGroup} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="예: 20대, 30-40대"/>
                </div>
              </>
            )}
           <div>
               {/* ▼▼▼ '포지션' 라벨도 동적으로 변경됩니다. ▼▼▼ */}
               <label htmlFor="preferredPositions" className="block text-sm font-medium text-gray-700 mb-1">{positionLabel}</label>
               <input id="preferredPositions" name="preferredPositions" type="text" value={formData.preferredPositions} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="예: 공격수, 전체"/>
           </div>
        </div>
        
        {/* 등록 / 취소 버튼 */}
        <div className="flex justify-end gap-3 pt-6 border-t mt-6">
          <button type="button" onClick={onClose} disabled={isLoading} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50">
            취소
          </button>
          <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50">
            {isLoading ? "등록 중..." : "등록하기"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default MercenaryPostModal;