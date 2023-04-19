import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  AUTH_BASE,
  AUTH_LOGIN,
  AUTH_REGISTER,
  DASHBOARD_BASE,
  DASHBOARD_HOME,
} from "./utils/paths";
import { AuthLayout } from "./layout/AuthLayout";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import DashboardLayout from "./layout/DashboardLayout";
import Home from "./pages/Dashboard/Home/Home";

function App() {
  return (
    <div className="bg-base-300 w-full h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={AUTH_BASE} />} />
          <Route path={AUTH_BASE} element={<AuthLayout />}>
            <Route path={AUTH_REGISTER} element={<Register />} />
            <Route path={AUTH_LOGIN} element={<Login />} />
          </Route>
          <Route path={DASHBOARD_BASE} element={<DashboardLayout />}>
            <Route path={DASHBOARD_HOME} element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
