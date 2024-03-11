
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "../../ui/constants/";

const UnProtectedRouter = () => {
  const isLogin = localStorage.getItem("token");

  return isLogin ? (
    <Navigate to="/dashboard" />
  ) : (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default UnProtectedRouter;