// src/features/auth/pages/SignupPage.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupApi } from '@/features/auth/api/authApi'; // 실제 API 함수 경로로 수정
import { UserSignUpRequestDto } from '@/types/user'; // DTO 타입 임포트 (실제 경로로 수정)
import { REGIONS } from '@/constants/regions'; // 지역 상수 임포트 (실제 경로로 수정)

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserSignUpRequestDto>({
    userid: '',
    password: '',
    name: '',
    email: '',
    isExPlayer: false,
    region: '', // 기본값 또는 첫 번째 지역
    preferredPosition: '',
    phoneNumber: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    // 간단한 프론트엔드 유효성 검사 예시
    if (!formData.userid || !formData.password || !formData.name || !formData.email) {
      setError("아이디, 비밀번호, 이름, 이메일은 필수입니다.");
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      setIsLoading(false);
      return;
    }
    // TODO: 더 많은 프론트엔드 유효성 검사 추가 (예: 이메일 형식, 아이디 길이 등)

    try {
      // UserSignUpRequestDto에 정의된 모든 필드를 포함하여 요청
      // 백엔드 DTO와 정확히 일치하는 필드명과 타입을 사용해야 합니다.
      const requestData: UserSignUpRequestDto = {
        userid: formData.userid,
        password: formData.password,
        name: formData.name,
        email: formData.email,
        isExPlayer: formData.isExPlayer,
        region: formData.region || undefined, // 빈 문자열이면 undefined로 보내거나, 백엔드가 빈 문자열을 null로 처리하는지 확인
        preferredPosition: formData.preferredPosition || undefined,
        phoneNumber: formData.phoneNumber || undefined,
      };

      await signupApi(requestData);
      alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (err: any) {
      console.error("Signup failed:", err);
      if (err.response && err.response.data && err.response.data.errors) {
        // 백엔드 유효성 검사 오류 메시지 표시
        const backendErrors = err.response.data.errors;
        const errorMessages = Object.values(backendErrors).join('\n');
        setError(errorMessages);
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const positionOptions = ["골키퍼(GK)", "수비수(DF)", "미드필더(MF)", "공격수(FW)", "무관"];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          {/* 로고가 있다면 여기에 <img /> 태그 사용 */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sport-Hub 회원가입
          </h2>
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="userid" className="block text-sm font-medium text-gray-700">
                아이디 <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="userid"
                  name="userid"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.userid}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                이름 <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일 주소 <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호 <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
               <p className="mt-1 text-xs text-gray-500">8자 이상 입력해주세요.</p>
            </div>

            {/* --- 선택 입력 필드들 --- */}
            <div className="flex items-center">
              <input
                id="isExPlayer"
                name="isExPlayer"
                type="checkbox"
                checked={formData.isExPlayer}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isExPlayer" className="ml-2 block text-sm text-gray-900">
                선수 출신 여부
              </label>
            </div>

            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                주 활동 지역 (선택)
              </label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">지역 선택</option>
                {REGIONS.map((regionName) => ( // REGIONS는 @/constants/regions 등에서 가져온다고 가정
                  <option key={regionName} value={regionName}>
                    {regionName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="preferredPosition" className="block text-sm font-medium text-gray-700">
                선호 포지션 (선택)
              </label>
              <select
                id="preferredPosition"
                name="preferredPosition"
                value={formData.preferredPosition}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">포지션 선택</option>
                {positionOptions.map((pos) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                전화번호 (선택)
              </label>
              <div className="mt-1">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="010-1234-5678"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* 오류 메시지 표시 */}
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    {/* Heroicon name: solid/x-circle */}
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">회원가입 실패</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <ul role="list" className="list-disc pl-5 space-y-1">
                        {/* 여러 오류 메시지를 표시해야 한다면 error 상태를 객체나 배열로 관리 */}
                        {error.split('\n').map((errMsg, idx) => <li key={idx}>{errMsg}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? '가입 처리 중...' : '가입하기'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">또는</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                이미 계정이 있으신가요?{' '}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  로그인하기
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;