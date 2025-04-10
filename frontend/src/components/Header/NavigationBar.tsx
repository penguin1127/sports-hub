import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const NavigationBar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ 임시 로그인 상태
  const navigate = useNavigate();

  const navItems = [
    {
      label: "팀 모집",
      path: "/team",
      dropdown: [
        { label: "개인", path: "/team" },
        { label: "팀", path: "/team/team" },
      ],
    },
    {
      label: "용병 모집",
      path: "/mercenary",
      dropdown: [
        { label: "개인", path: "/mercenary" },
        { label: "팀", path: "/mercenary/team" },
      ],
    },
    {
      label: "경기 모집",
      path: "/match",
    },
  ];

  const handleLogout = () => {
    // 🔒 나중에 로그아웃 처리 로직 추가
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-full mx-auto px-6 py-4 flex items-center justify-between">
        {/* 로고 */}
        <Link to="/" className="text-2xl font-bold text-white">
          Sports-Hub
        </Link>

        {/* 메뉴 */}
        <ul className="flex space-x-6 relative">
          {navItems.map((item) => {
            const isDropdownOpen = openDropdown === item.label;

            return (
              <li
                key={item.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div className="flex items-center space-x-1 cursor-pointer">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors duration-200 ${
                        isActive ? "text-white" : "text-gray-300"
                      } hover:text-white`
                    }
                  >
                    {item.label}
                  </NavLink>

                  {item.dropdown && (
                    <ChevronDown
                      className={`w-4 h-4 text-gray-300 group-hover:text-white transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                {/* 드롭다운 */}
                {item.dropdown && (
                  <ul
                    className={`absolute left-0 top-full mt-2 bg-white rounded-md shadow-md py-2 w-32
                      opacity-0 translate-y-2 scale-95
                      group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                      transition-all duration-200 ease-out
                      pointer-events-none group-hover:pointer-events-auto z-50`}
                  >
                    {item.dropdown.map((subItem) => (
                      <li key={subItem.label}>
                        <NavLink
                          to={subItem.path}
                          className={({ isActive }) =>
                            `block px-4 py-2 text-sm text-black hover:bg-gray-100 ${
                              isActive ? "font-semibold" : ""
                            }`
                          }
                        >
                          {subItem.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        {/* 우측 버튼 */}
        <div className="flex space-x-3">
          {isLoggedIn ? (
            <>
              <Link to="/mypage">
                <button className="px-4 py-1 text-sm font-medium rounded-full bg-white text-black hover:bg-gray-200 transition">
                  마이페이지
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-1 text-sm font-medium border rounded-full border-white text-white hover:bg-white hover:text-black transition"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-1 text-sm font-medium border rounded-full border-white text-white hover:bg-white hover:text-black transition">
                  로그인
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-1 text-sm font-medium rounded-full bg-white text-black hover:bg-gray-200 transition">
                  회원가입
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
