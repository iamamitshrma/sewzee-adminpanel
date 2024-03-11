import { createSlice } from "@reduxjs/toolkit";
import { getUsersThunk } from "../../actions/usersActions/usersAction";
import { getMarketplaceMediaThunk } from "../../actions/bannerActions/bannerAction";

const initialState = {
    marketplace: [],
    tailor: [],
    error: {
        isError: false,
        msg: "",
    },
    isRefreshing: false,
    isLoading: false,
};

export const bannerSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {
        clearDashboardError: (state) => {
            state.error = {
                isError: false,
                msg: "",
            };
        },
    },
    extraReducers: (builder) => {
        // banner reducers
        builder.addCase(getMarketplaceMediaThunk.pending, (state, action) => {
            state.isLoading = true;
            state.error = {
                isError: false,
                msg: "",
            };
        });
        builder.addCase(getMarketplaceMediaThunk.fulfilled, (state, action) => {
            const data = action.payload;
            console.log(data.data);
            // const convertData = data.data.map((item) => {
            //     return [
            //         item.id,
            //         item?.name,
            //         item?.email,
            //         item.number,
            //         item.gender,
            //         item?.created_at,
            //         item?.status === 1 ? "Active" : "Inactive",
            //         item.id,
            //     ];
            // });
            // const productData = convertData.map((item) => ({
            //     userId: item[0],
            //     userName: item[1],
            //     email: item[2],
            //     phone: item[3],
            //     gender: item[4],
            //     accountCreated: item[5],
            //     status: item[6],
            //     action: item[7],
            // }));
            // state.users = productData;
            state.error = {
                isError: false,
                msg: "",
            };
            state.isLoading = false;
        });
        builder.addCase(getMarketplaceMediaThunk.rejected, (state, action) => {
            console.log(action);
            state.error = {
                isError: true,
                msg: "Something went wrong",
            };
            state.isLoading = false;
        });
    },
});

export const { clearDashboardError } = bannerSlice.actions;

export default bannerSlice.reducer;
