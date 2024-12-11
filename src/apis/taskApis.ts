import axios from "axios"

interface TaskParams {
    _page: number;
    _limit: number;
    q?: string;
    status?: string;
}

interface Task {
    id?: string;
    title: string;
    creator: string;
    createAt: string;
    status: string;
    description: string;
}

export const TaskApis = {
    getAllTask: (params: TaskParams) => {
        return axios.get(`${process.env.REACT_APP_BE_URL}tasks`, { params });
    },
    createTask: (task: Task) => {
        return axios.post(`${process.env.REACT_APP_BE_URL}tasks`, task);
    },
    getTaskById: (id: string) => {
        return axios.get<Task>(`${process.env.REACT_APP_BE_URL}tasks/${id}`).then(res => res.data);
    },
    updateTaskById: (id: string, task: Task) => {
        return axios.put<Task>(`${process.env.REACT_APP_BE_URL}tasks/${id}`, task);
    },
    deleteTaskById: (id: string) => {
        return axios.delete(`${process.env.REACT_APP_BE_URL}tasks/${id}`);
    }
};