import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  AUTH_BASE,
  AUTH_LOGIN,
  AUTH_REGISTER,
  DASHBOARD_BASE,
} from "./utils/paths";
import { AuthLayout } from "./layout/AuthLayout";
import Register from "./pages/Dashboard/Register/Register";
import Login from "./pages/Dashboard/Login/Login";
import DashboardLayout from "./layout/DashboardLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={AUTH_BASE} />} />
          <Route path={AUTH_BASE} element={<AuthLayout />}>
            <Route path={AUTH_REGISTER} element={<Register />} />
            <Route path={AUTH_LOGIN} element={<Login />} />
          </Route>
          <Route path={DASHBOARD_BASE} element={<DashboardLayout />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
