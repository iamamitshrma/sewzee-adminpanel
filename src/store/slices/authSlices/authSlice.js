import { createSlice } from "@reduxjs/toolkit";
import { loginSewzeeThunk } from "../../actions/authActions/authaction";

const initialState = {
    token: null,
    error: {
        isError: false,
        msg: "",
    },
    isLoading: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutAction: (state) => {
            state.token = null;
            localStorage.clear();
        },
        clearAuthError: (state) => {
            state.error = {
                isError: false,
                msg: "",
            };
        }
    },
    extraReducers: (auth) => {
        // login reducers
        auth.addCase(loginSewzeeThunk.pending, (state, action) => {
            state.isLoading = true;
            state.error = {
                isError: false,
                msg: "",
            };
        });
        auth.addCase(loginSewzeeThunk.fulfilled, (state, action) => {
            const data = action.payload;
            state.token = data?.token;
            localStorage.setItem("token", data?.token);
            state.error = {
                isError: false,
                msg: "",
            };
            state.isLoading = false;
        });
        auth.addCase(loginSewzeeThunk.rejected, (state, action) => {
            state.error = {
                isError: true,
                msg: action.payload.response.data.message,
            };
            state.isLoading = false;
        });
    },
});

export const { logoutAction, clearAuthError } = authSlice.actions;

export default authSlice.reducer;
