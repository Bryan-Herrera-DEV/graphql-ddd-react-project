import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";
import { useEffect } from "react";
import { AUTH_LOGIN } from "../utils/paths";
import { useQuery } from "@apollo/client";
import { GET_USER_DATA } from "./../services/user.service";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const isAuth = useAuthStore((state) => state.isAuth);
  const userId = useAuthStore((state) => state.userId);

  const { loading, error, data } = useQuery(GET_USER_DATA, {
    variables: {
      getUserId: userId,
      id: userId,
    },
  });
  useEffect(() => {
    if (!isAuth) {
      navigate(AUTH_LOGIN);
    }

    console.log(data);
  }, [isAuth, data]);

  setTimeout(() => {
    console.log(data)
  }, 1000);

  return <div>Dashboard</div>;
};

export default DashboardLayout;
