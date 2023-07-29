import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import { createLogger } from "redux-logger";
import { userApi } from "./api/userApi";
import userReducer from "./userSlice";

const logger = createLogger({
    collapsed: true
})
export const store = configureStore({
    reducer:{
        [api.reducerPath] : api.reducer,
        [userApi.reducerPath]: userApi.reducer,
        userState: userReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware).concat(logger)
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch