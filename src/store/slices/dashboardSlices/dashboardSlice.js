import { createSlice } from "@reduxjs/toolkit";
import { loginSewzeeThunk } from "../../actions/authActions/authaction";
import { getDahboardDataThunk, getDahboardRefreshThunk } from "../../actions/dashboardActions/dashboardAction";

const initialState = {
    dashboardData: null,
    error: {
        isError: false,
        msg: "",
    },
    isRefreshing: false,
    isLoading: false,
};

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        clearDashboardError: (state) => {
            state.error = {
                isError: false,
                msg: "",
            };
        }
    },
    extraReducers: (builder) => {
        // dashboard reducers
        builder.addCase(getDahboardDataThunk.pending, (state, action) => {
            state.isLoading = true;
            state.error = {
                isError: false,
                msg: "",
            };
        });
        builder.addCase(getDahboardDataThunk.fulfilled, (state, action) => {
            const data = action.payload;
            state.dashboardData = data.data;
            state.error = {
                isError: false,
                msg: "",
            };
            state.isLoading = false;
        });
        builder.addCase(getDahboardDataThunk.rejected, (state, action) => {
            state.error = {
                isError: true,
                msg: action.payload.response.data.message,
            };
            state.isLoading = false;
        });

        builder.addCase(getDahboardRefreshThunk.pending, (state, action) => {
            state.isLoading = true;
            state.isRefreshing = true;
            state.error = {
                isError: false,
                msg: "",
            };
        });

        builder.addCase(getDahboardRefreshThunk.fulfilled, (state, action) => {
            const data = action.payload;
            state.dashboardData = data?.data;
            state.error = {
                isError: false,
                msg: "",
            };
            state.isLoading = false;
            state.isRefreshing = false;
        });

        builder.addCase(getDahboardRefreshThunk.rejected, (state, action) => {
            state.error = {
                isError: true,
                msg: action.payload.response.data.message,
            };
            state.isLoading = false;
            state.isRefreshing = false;
        });

    },
});

export const { clearDashboardError } = dashboardSlice.actions;

export default dashboardSlice.reducer;