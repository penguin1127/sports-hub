// src/features/auth/components/LoginForm.tsx
import { useState } from "react"
import { useAuthStore } from "@/stores/useAuthStore"
import { useNavigate } from "react-router-dom"
import { loginApi } from "../api/authApi"

export default function LoginForm() {
  const [userid, setUserid] = useState("")
  const [password, setPassword] = useState("")
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await loginApi(userid, password)
      const { token, user } = response.data

      // ✅ Zustand에 저장 + localStorage 저장
      login(token, user)

      navigate("/")
    } catch (error) {
      alert("로그인 실패: 아이디 또는 비밀번호를 확인하세요.")
      console.error("Login error:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={userid} onChange={(e) => setUserid(e.target.value)} placeholder="아이디" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
      <button type="submit">로그인</button>
    </form>
  )
}
