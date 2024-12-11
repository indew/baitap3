import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "../features/tasks/taskSlice";
import { useDispatch } from "react-redux";


export const store = configureStore({
    reducer:{
        task: tasksReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>() 