import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchAllTask } from "../../redux/features/tasks/taskSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { Spin } from "antd";
import MainContentTask from "../../component/MainContentTask";
import { TASK_STATUS } from "../../constants/task.constant";

const DoingTask = () => {
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, tasks, pagination } = useSelector((state: RootState) => state.task);

    useEffect(() => {
        dispatch(actFetchAllTask({
            _page: 1,
            _limit: pagination.limitPerPage,
            status: TASK_STATUS.DOING
        }));
    }, [dispatch, pagination.limitPerPage]);

    if (isLoading) {
        return <Spin />
    }

    return (
        <div className="doing-task">
            {tasks.length === 0 ? <div>No tasks in progress</div> : <MainContentTask tasks={tasks} />}
        </div>
    );
};

export default DoingTask;