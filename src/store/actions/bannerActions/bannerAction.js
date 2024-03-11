import { createAsyncThunk } from "@reduxjs/toolkit";
import SewzeeService from "../../../services/sewzeeService";

export const getMarketplaceMediaThunk = createAsyncThunk(
    "sewzee/banner",
    async (payload, thunkAPI) => {
        const res = await SewzeeService.getMarketplaceMediaReq()
            .then((res) => {
                return thunkAPI.fulfillWithValue(res.data);
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue(error);
            });
        return res;
    }
);

export const getTailorMediaThunk = createAsyncThunk(
    "sewzee/banner",
    async (payload, thunkAPI) => {
        const res = await SewzeeService.getTailorMediaReq(payload)
            .then((res) => {
                return thunkAPI.fulfillWithValue(res.data);
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue(error);
            });
        return res;
    }
);
