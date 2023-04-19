import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";
import { AUTH_REGISTER, DASHBOARD_BASE, AUTH_LOGIN } from "../utils/paths";
import { useEffect,useState } from "react";

export const AuthLayout = () => {
  const navigate = useNavigate();
  const isAuth = useAuthStore((state) => state.isAuth);

  const [navActive, setNavActive] = useState<"login" | "register">("login");
  useEffect(() => {
    if (isAuth) {
      navigate(DASHBOARD_BASE);
    } else {
      navigate(AUTH_LOGIN);
    }
  }, [isAuth]);

  const handleLoginClick = () => {
    navigate(AUTH_LOGIN);
    setNavActive("login");
  };

  const handleRegisterClick = () => {
    navigate(AUTH_REGISTER);
    setNavActive("register");
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="m-auto mx-0 flex w-full min-w-[200px] max-w-[500px] flex-shrink-0 flex-col">
        <div className="dropdown">
          <div className="bg-opacity-800">
            <div className="tabs w-full flex-grow-0">
              <button
                className={`tab-lifted tab tab-border-none tab-lg flex-1 ${
                  navActive === "login" ? "tab-active" : ""
                }`}
                onClick={handleLoginClick}
              >
                Login
              </button>
              <button
                className={`tab-lifted tab tab-border-none tab-lg flex-1 ${
                  navActive === "register" ? "tab-active" : ""
                }`}
                onClick={handleRegisterClick}
              >
                Register
              </button>
            </div>
          </div>
        </div>
        <div className={`grid w-full flex-grow gap-3 rounded-xl bg-base-100 p-6 shadow-xl ${
          navActive === "login" ? "rounded-tl-none" : "rounded-tr-none"
        }`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
