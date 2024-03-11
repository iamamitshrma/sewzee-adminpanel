import { Navigate, Outlet } from "react-router-dom";
import { Suspense } from "react";

import { ToastContainer, PageLoader } from "../../ui/constants/";
import MainLayout from "../../components/MainLayout/MainLayout";


const ProtectedRouter = () => {
    const token = localStorage.getItem("token");
    return  token ? (
        <MainLayout>
            <ToastContainer />
            <Suspense fallback={<PageLoader />}>
                <Outlet />
            </Suspense>
        </MainLayout>
    ) : (
        <Navigate to="/" />
    );
};

export default ProtectedRouter;