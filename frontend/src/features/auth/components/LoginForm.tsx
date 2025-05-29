// src/features/auth/components/LoginForm.tsx

import { useState } from "react";
import { loginApi } from "../api/authApi"; // authApi 실제 경로로 수정 필요
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import { UserLoginRequestDto, User as AppUser } from "@/types/user"; // UserLoginRequestDto와 User 타입 임포트

const LoginForm = () => {
  const [loginInputValue, setLoginInputValue] = useState(""); // UI 상태
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!loginInputValue || !password) {
      setError("아이디(또는 이메일)와 비밀번호를 모두 입력해주세요.");
      setIsLoading(false);
      return;
    }

    // --- 디버깅 로그 추가 ---
    console.log("Attempting to login with:");
    console.log("loginInputValue (for loginId):", loginInputValue, `(Type: ${typeof loginInputValue})`);
    console.log("password:", password, `(Type: ${typeof password})`);
    // --- 디버깅 로그 추가 끝 ---

    try {
      const credentials: UserLoginRequestDto = {
        loginId: loginInputValue, // UI의 입력값을 loginId 필드로 매핑
        password: password,
      };
      
      console.log("Credentials object being sent to API:", JSON.stringify(credentials, null, 2));

      const response = await loginApi(credentials);

      const { token, user } = response; // authApi.ts의 loginApi 반환값에 따라 조정
      
      login(token, user);
      navigate("/");
    } catch (err: any) {
      console.error("로그인 오류 (LoginForm.tsx):", err); // 오류 객체 전체 로깅
      if (err.response && err.response.data) {
        if (err.response.data.errors && Object.keys(err.response.data.errors).length > 0) {
          const errorMessages = Object.values(err.response.data.errors).join('\n');
          setError(errorMessages);
          console.log("Backend validation errors:", err.response.data.errors); // 백엔드 유효성 오류 상세 로깅
        } else if (err.response.data.message) {
          setError(err.response.data.message);
          console.log("Backend error message:", err.response.data.message); // 백엔드 일반 메시지 로깅
        } else {
           setError("아이디 또는 비밀번호가 올바르지 않습니다.");
           console.log("Backend response data (unknown structure):", err.response.data);
        }
      } else {
        setError("로그인 중 알 수 없는 오류가 발생했습니다. 네트워크 연결을 확인해주세요.");
        console.log("Network or other unknown error during login.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm p-4 md:p-0">
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Sport-Hub 로그인</h1>
          <p className="text-gray-500 mt-2">계정에 로그인하세요.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded-md" role="alert">
            <p className="font-bold">오류 발생:</p>
            {/* 오류 메시지가 여러 줄일 경우를 대비하여 map 사용 */}
            {error.split('\n').map((msg, idx) => <p key={idx}>{msg}</p>)}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="loginIdInput">
            아이디 또는 이메일
          </label>
          <input
            id="loginIdInput"
            name="loginIdInput" // input의 name 속성은 폼 제출 시 사용될 수 있으나, 여기서는 상태로 직접 관리
            className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            value={loginInputValue}
            onChange={(e) => setLoginInputValue(e.target.value)}
            placeholder="아이디 또는 이메일을 입력하세요"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>

        <div className="flex flex-col items-center justify-between gap-4">
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 transition-colors duration-150"
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
          <p className="text-center text-sm text-gray-600">
            계정이 없으신가요?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              회원가입
            </Link>
          </p>
        </div>
      </form>
      <p className="text-center text-xs text-gray-500">
        &copy;{new Date().getFullYear()} Sport-Hub. All rights reserved.
      </p>
    </div>
  );
};

export default LoginForm;