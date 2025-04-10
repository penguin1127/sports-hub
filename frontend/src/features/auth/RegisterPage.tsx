import AuthForm from "./components/AuthForm";

const RegisterPage = () => {
  const handleRegister = (data: { email: string; password: string }) => {
    console.log("Register Data:", data);
    // 여기에 회원가입 API 연결 예정
  };

  return (
    <div className="w-full max-w-md mx-auto py-20 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
      <AuthForm type="register" onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;
