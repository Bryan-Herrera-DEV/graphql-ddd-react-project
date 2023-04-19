import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";
import { useEffect } from "react";
import { AUTH_LOGIN, DASHBOARD_HOME } from "../utils/paths";
import { useQuery } from "@apollo/client";
import { GET_USER_DATA } from "./../services/user.service";
import md5 from "md5";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const isAuth = useAuthStore((state) => state.isAuth);
  const userId = useAuthStore((state) => state.userId);
  const getUser = useAuthStore((state) => state.user);

  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);
  const setUserId = useAuthStore((state) => state.setUserId);

  const { loading, error, data } = useQuery(GET_USER_DATA, {
    variables: {
      getUserId: 1.0,
      id: 1.0,
    },
  });
  useEffect(() => {
    if (!isAuth) {
      navigate(AUTH_LOGIN);
    } else {
      navigate(DASHBOARD_HOME);
    }

    if (data) {
      setUser(data.getUser);
    }
  }, [isAuth, data]);

  const address = String(userId).trim().toLowerCase();
  const hash = md5(address);
  console.log(hash);

  const logoutHande = () => {
    setToken("");
    setUser(null);
    setUserId(null);
    navigate(AUTH_LOGIN);
  };
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn-ghost btn text-xl normal-case">ToDoList - MTC</a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full border-2 border-red-100">
                <img
                  src={`https://www.gravatar.com/avatar/${hash}?d=retro&f=y&s=200`}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  {getUser?.email}
                  <span className="badge">Email</span>
                </a>
              </li>
              <li>
                <p
                  onClick={() => {
                    logoutHande();
                  }}
                >
                  Logout
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="navbar">
        <div className="pl-[1rem] pr-[1rem]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
