// src/features/auth/pages/SignupPage.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupApi } from '@/features/auth/api/authApi';
import { UserSignUpRequestDto } from '@/types/user'; // user.ts에서 임포트
import { REGIONS } from '@/constants/regions'; // 실제 경로로 수정

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserSignUpRequestDto>({
    // UserSignUpRequestDto의 필드명과 일치하도록 초기화
    userid: '', // UserSignUpRequestDto.java는 'userid' 사용
    password: '',
    name: '',
    email: '',
    isExPlayer: false,
    region: '',
    preferredPosition: '',
    phoneNumber: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev: UserSignUpRequestDto) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev: UserSignUpRequestDto) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    // UserSignUpRequestDto.java의 유효성 검사 규칙에 맞춰 프론트엔드 검사
    if (!formData.userid || !formData.password || !formData.name || !formData.email) {
      setError("아이디, 비밀번호, 이름, 이메일은 필수입니다.");
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 8) { // @Size(min=8)
      setError("비밀번호는 8자 이상이어야 합니다.");
      setIsLoading(false);
      return;
    }
    if (formData.userid.length < 4) { // @Size(min=4)
      setError("아이디는 4자 이상이어야 합니다.");
      setIsLoading(false);
      return;
    }
    // TODO: 이메일 형식, 이름/아이디/이메일 최대 길이 등 DTO의 다른 유효성 검사 규칙도 추가

    try {
      // UserSignUpRequestDto 타입과 일치하는 객체 전송
      const requestData: UserSignUpRequestDto = {
        name: formData.name,
        email: formData.email,
        userid: formData.userid, // 'userid' 필드명 사용
        password: formData.password,
        isExPlayer: formData.isExPlayer,
        region: formData.region || undefined,
        preferredPosition: formData.preferredPosition || undefined,
        phoneNumber: formData.phoneNumber || undefined,
      };
      
      // console.log("Submitting signup data:", JSON.stringify(requestData, null, 2));
      
      await signupApi(requestData);
      alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (err: any) {
      console.error("SignupPage handleSubmit error:", err);
      if (err.response && err.response.data) {
        if (err.response.data.errors) {
          const backendErrors = err.response.data.errors;
          const errorMessages = Object.values(backendErrors).join('\n');
          setError(errorMessages);
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('회원가입 중 오류가 발생했습니다. 서버 응답을 확인해주세요.');
        }
      } else {
        setError('회원가입 중 네트워크 오류 또는 알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const positionOptions = ["골키퍼(GK)", "수비수(DF)", "미드필더(MF)", "공격수(FW)", "무관"];

  return (
    // JSX는 이전 답변의 UI 개선 버전 사용
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sport-Hub 회원가입
          </h2>
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="userid" className="block text-sm font-medium text-gray-700">아이디 <span className="text-red-500">*</span></label>
              <div className="mt-1"><input id="userid" name="userid" type="text" required value={formData.userid} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /></div>
              <p className="mt-1 text-xs text-gray-500">4자 이상 50자 이하로 입력해주세요.</p>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">이름 <span className="text-red-500">*</span></label>
              <div className="mt-1"><input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /></div>
              <p className="mt-1 text-xs text-gray-500">최대 50자까지 입력 가능합니다.</p>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일 주소 <span className="text-red-500">*</span></label>
              <div className="mt-1"><input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /></div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호 <span className="text-red-500">*</span></label>
              <div className="mt-1"><input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /></div>
              <p className="mt-1 text-xs text-gray-500">8자 이상 입력해주세요.</p>
            </div>
            <div className="flex items-center">
              <input id="isExPlayer" name="isExPlayer" type="checkbox" checked={formData.isExPlayer} onChange={handleChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label htmlFor="isExPlayer" className="ml-2 block text-sm text-gray-900">선수 출신 여부</label>
            </div>
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700">주 활동 지역 (선택)</label>
              <select id="region" name="region" value={formData.region} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option value="">지역 선택 안함</option>
                {REGIONS.map((regionName) => (<option key={regionName} value={regionName}>{regionName}</option>))}
              </select>
            </div>
            <div>
              <label htmlFor="preferredPosition" className="block text-sm font-medium text-gray-700">선호 포지션 (선택)</label>
              <select id="preferredPosition" name="preferredPosition" value={formData.preferredPosition} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option value="">포지션 선택 안함</option>
                {positionOptions.map((pos) => (<option key={pos} value={pos}>{pos}</option>))}
              </select>
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">전화번호 (선택)</label>
              <div className="mt-1"><input id="phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} placeholder="010-1234-5678" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /></div>
            </div>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0"><svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg></div>
                  <div className="ml-3"><h3 className="text-sm font-medium text-red-800">회원가입 실패</h3><div className="mt-2 text-sm text-red-700"><ul role="list" className="list-disc pl-5 space-y-1">{error.split('\n').map((errMsg, idx) => <li key={idx}>{errMsg}</li>)}</ul></div></div>
                </div>
              </div>
            )}
            <div><button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">{isLoading ? '가입 처리 중...' : '가입하기'}</button></div>
          </form>
          <div className="mt-6"><div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">또는</span></div></div><div className="mt-6 text-center"><p className="text-sm text-gray-600">이미 계정이 있으신가요?{' '}<Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">로그인하기</Link></p></div></div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;