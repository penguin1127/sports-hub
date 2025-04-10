import AuthForm from "./components/AuthForm";

const LoginPage = () => {
  const handleLogin = (data: { email: string; password: string }) => {
    console.log("Login Data:", data);
    // 여기에 로그인 API 연결 예정
  };

  return (
    <div className="w-full max-w-md mx-auto py-20 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
