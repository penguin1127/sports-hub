// src/components/layout/HeroBanner.tsx
const HeroBanner = () => {
    return (
      <div className="w-full bg-blue-100 py-12 px-4 rounded-2xl shadow-md mb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              당신의 팀을 위한 <br className="hidden md:block" />
              최고의 축구 용병을 찾아보세요!
            </h2>
            <p className="text-gray-600 text-lg">
              간편하게 용병과 경기를 모집하고, 빠르게 팀을 찾아보세요.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            {/* 실제 이미지는 나중에 교체할 예정 */}
            <div className="w-[300px] h-[200px] bg-gray-300 rounded-xl flex items-center justify-center text-gray-500">
              배너 이미지 자리
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HeroBanner;
  