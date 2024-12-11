import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TaskApis } from "../../../apis/taskApis";
import { AppDispatch } from "../../store";


interface Task {
    title: string;
    creator: string;
    createAt: string;
    status: string;
    description: string;
}

interface FetchAllTaskParams {
    _page: number;
    _limit: number;
    q?: string; 
    status?: string; 
}

const initialState = {
    isLoading: false,
    tasks: [],
    errors: {},
    pagination: {
        currentPage: 1,
        limitPerPage: 8,
        total: 8,
    },
    searchKey: ""
};

export const actFetchAllTask = createAsyncThunk(
    "tasks/fetchAllTask",
    async (params: FetchAllTaskParams) => {
        const response = await TaskApis.getAllTask(params);
        return { data: response.data, total: response.headers["x-total-count"] };
    }
);

export const actFetchTaskById = createAsyncThunk(
    "tasks/fetchTaskById",
    async (taskId: string) => {  
        const task = await TaskApis.getTaskById(taskId);
        return task;
    }
);

export const actCreateNewTask = (task: Task) => {
    return async (dispatch: AppDispatch, getState: any) => {
        try {
            await TaskApis.createTask(task);
            const { pagination } = getState().tasks;
            dispatch(actFetchAllTask({
                _page: pagination.currentPage,
                _limit: pagination.limitPerPage,
            }));
        } catch (error) {
            console.error(error);
        }
    };
};

export const actDeleteTask = (id: string) => {
    return async (dispatch: AppDispatch, getState: any) => {
        try {
            await TaskApis.deleteTaskById(id);
            const { pagination } = getState().tasks;
            dispatch(actFetchAllTask({
                _page: pagination.currentPage,
                _limit: pagination.limitPerPage,
            }));
        } catch (error) {
            console.error(error);
        }
    };
};

export const actUpdateTaskStatus = (id: string, newStatus: string) => {
    return async (dispatch: AppDispatch, getState: any) => {
        try {
            const currentTask = await TaskApis.getTaskById(id);
            const updatedTask = {
                ...currentTask,
                status: newStatus
            };
            await TaskApis.updateTaskById(id, updatedTask);
            const { pagination } = getState().tasks;
            dispatch(actFetchAllTask({
                _page: pagination.currentPage,
                _limit: pagination.limitPerPage,
            }));
        } catch (error) {
            console.error(error);
        }
    };
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setNewPage: (state, action) => {
            state.pagination = {
                ...state.pagination,
                currentPage: action.payload
            }
        },
        setSearchKey: (state, action) => {
            state.searchKey = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(actFetchAllTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(actFetchAllTask.fulfilled, (state, action) => {
                state.tasks = action.payload.data;
                state.isLoading = false;
                state.pagination.total = action.payload.total;
            })
            .addCase(actFetchAllTask.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export const { setNewPage, setSearchKey } = taskSlice.actions;
export const tasksReducer = taskSlice.reducer;
