// 예: src/features/auth/components/LoginForm.tsx
import { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(userid, password);
    navigate("/"); // 메인 페이지로 이동
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={userid} onChange={(e) => setUserid(e.target.value)} placeholder="아이디" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
      <button type="submit">로그인</button>
    </form>
  );
}
