import { useState } from "react";
import { signupApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signupApi(userid, password);
      alert("회원가입 완료! 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (err) {
      alert("회원가입 실패: " + (err as any).response?.data?.message || "알 수 없는 오류");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 border rounded-md shadow-md w-[300px]">
        <h2 className="text-xl font-semibold text-center">회원가입</h2>
        <input
          type="text"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
          placeholder="아이디"
          required
          className="border px-3 py-2 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          required
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          가입하기
        </button>
      </form>
    </div>
  );
}
