import { useState } from "react";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (form: { email: string; password: string }) => void;
}

const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto">
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-3 py-2 rounded"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border px-3 py-2 rounded"
      />
      <button
        type="submit"
        className="bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        {type === "login" ? "로그인" : "회원가입"}
      </button>
    </form>
  );
};

export default AuthForm;
