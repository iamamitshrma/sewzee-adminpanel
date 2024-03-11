import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

//reducers
import authReducer from "./slices/authSlices/authSlice";
import dashboardReducer from "./slices/dashboardSlices/dashboardSlice";
import usersReducer from "./slices/usersSlices/usersSlice";
import bannerReducer from "./slices/bannerSlices/bannerSlice";

//persist config
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"],
};

//combine all reducers
const reducer = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
    users: usersReducer,
    banner: bannerReducer,
});

//persisted reducer
const persistedReducer = persistReducer(persistConfig, reducer);

//store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

//persistor
export const persistor = persistStore(store);
