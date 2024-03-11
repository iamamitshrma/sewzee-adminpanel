import { createAsyncThunk } from "@reduxjs/toolkit";
import SewzeeService from "../../../services/sewzeeService";

export const getUsersThunk = createAsyncThunk(
    "sewzee/users",
    async (payload, thunkAPI) => {
        const res = await SewzeeService.getUsersReq(payload)
            .then((res) => {
                return thunkAPI.fulfillWithValue(res.data);
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue(error);
            });
        return res;
    }
);
