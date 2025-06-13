// src/features/mercenary/api/mercenaryApi.ts
import axiosInstance from "@/lib/axiosInstance.ts"; // axiosInstance 설정된 axios 인스턴트, 미리 설정된 axios 인스턴트를 가져옴 -> 토큰 자동 주입 가능

export interface MercenaryRequest{ // 요구하는 데이터(객체의 타입) 정의
    recruitPostid: number; // 모집 공고 ID
    position: string; // 역할
    message: string; // 메시지
}

export const applyMercenary = async(data: MercenaryRequest) => {
    try {
        const response = await axiosInstance.post('/mercenary-application/', data); // HTTP POST 요청을 특정 경로로 보냄, await을 사용하여 이 요청이 만료될 때 까지 기다림.
        return response.data;
    } catch (error) {
        console.error('용병 신청 실패:', error);
        throw error;
    }
};