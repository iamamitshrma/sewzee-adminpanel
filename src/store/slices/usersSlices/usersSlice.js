import { createSlice } from "@reduxjs/toolkit";
import { getUsersThunk } from "../../actions/usersActions/usersAction";

const initialState = {
    users: [],
    userList: [],
    error: {
        isError: false,
        msg: "",
    },
    isRefreshing: false,
    isLoading: false,
};

export const usersSlice = createSlice({
    name: "users",
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
        // users reducers
        builder.addCase(getUsersThunk.pending, (state, action) => {
            state.isLoading = true;
            state.error = {
                isError: false,
                msg: "",
            };
        });
        builder.addCase(getUsersThunk.fulfilled, (state, action) => {
            const data = action.payload;
            state.userList = data?.data;
            const convertData = data.data.map((item) => {
                return [
                    item.id,
                    item?.name,
                    item?.email,
                    item.number,
                    item.gender,
                    item?.created_at,
                    item?.status === 1 ? "Active" : "Inactive",
                    item.id,
                ];
            });
            const productData = convertData.map((item) => ({
                userId: item[0],
                userName: item[1],
                email: item[2],
                phone: item[3],
                gender: item[4],
                accountCreated: item[5],
                status: item[6],
                action: item[7],
            }));
            state.users = productData;
            state.error = {
                isError: false,
                msg: "",
            };
            state.isLoading = false;
        });
        builder.addCase(getUsersThunk.rejected, (state, action) => {
            console.log(action);
            state.error = {
                isError: true,
                msg: "Something went wrong",
            };
            state.isLoading = false;
        });
    },
});

export const { clearDashboardError } = usersSlice.actions;

export default usersSlice.reducer;
