import API from "./common";

// auth services

const loginSewzeeAdminReq = (payload) => {
    return API.post("api/auth/adminLogin", payload);
};

// dashboard services
const getDashboardDataReq = (payload) => {
    return API.get(`api/admin/dashboard?type=${payload}`);
};

// users services
const getUsersReq = (payload) => {
    if (
        payload.search === undefined &&
        payload.from === undefined &&
        payload.to === undefined
    ) {
        return API.get(`/api/admin/users`);
    } else if (
        payload.search !== undefined &&
        payload.from === undefined &&
        payload.to === undefined
    ) {
        return API.get(`/api/admin/users?search=${payload.search}`);
    } else if (
        payload.search === undefined &&
        payload.from !== undefined &&
        payload.to !== undefined
    ) {
        return API.get(
            `/api/admin/users?from=${payload.from}&to=${payload.to}`
        );
    } else if (
        payload.search !== undefined &&
        payload.from !== undefined &&
        payload.to !== undefined
    ) {
        return API.get(
            `/api/admin/users?search=${payload.search}&from=${payload.from}&to=${payload.to}`
        );
    }
};

// Banner
const getMarketplaceMediaReq = () => {
    return API.get("api/admin/media");
};
const getTailorMediaReq = () => {
    return API.get("api/admin/banners");
};

const SewzeeService = {
    loginSewzeeAdminReq,
    getDashboardDataReq,
    getUsersReq,
    getMarketplaceMediaReq,
    getTailorMediaReq,
};

export default SewzeeService;
