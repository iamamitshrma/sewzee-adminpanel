import { createAsyncThunk } from "@reduxjs/toolkit";
import SewzeeService from "../../../services/sewzeeService";

export const getDahboardDataThunk = createAsyncThunk(
    "sewzee/dahboardData",
    async (payload, thunkAPI) => {
        const res = await SewzeeService.getDashboardDataReq(payload)
            .then((res) => {
                return thunkAPI.fulfillWithValue(res.data);
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue(error);
            });
        return res;
    }
);
export const getDahboardRefreshThunk = createAsyncThunk(
    "sewzee/dahboardRefresh",
    async (payload, thunkAPI) => {
        const res = await SewzeeService.getDashboardDataReq(payload)
            .then((res) => {
                return thunkAPI.fulfillWithValue(res.data);
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue(error);
            });
        return res;
    }
);