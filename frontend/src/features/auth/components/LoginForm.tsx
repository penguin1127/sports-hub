import { useState } from "react";
import { loginApi } from "../api/authApi";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
    const response = await loginApi(userid, password); // ✅ 수정됨
    const { token, user } = response.data;             // ✅ 수정됨
    login(token, user);
    navigate("/");
  } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gray-100">
      <input
        className="w-80 p-2 rounded border"
        type="text"
        value={userid}
        onChange={(e) => setUserid(e.target.value)}
        placeholder="아이디"
      />
      <input
        className="w-80 p-2 rounded border"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
        로그인
      </button>
    </form>
  );
};

export default LoginForm;