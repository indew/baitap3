import React, { useEffect } from "react";
import MainContentTask from "../../component/MainContentTask";
import { useDispatch, useSelector } from "react-redux";
import { actFetchAllTask, setNewPage } from "../../redux/features/tasks/taskSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { Pagination, Spin } from "antd";


const AllTask = () => {
   const dispatch: AppDispatch = useDispatch();
   const { isLoading, tasks, pagination, searchKey } = useSelector((state: RootState) => state.task);

   useEffect(() => {
        dispatch(actFetchAllTask({
            _page: 1,
            _limit: pagination.limitPerPage,
            q: searchKey
        }));
    }, [dispatch, pagination.limitPerPage, searchKey]);

   const handleChange = (newPage: any) => {
      dispatch(setNewPage(newPage))
      dispatch(actFetchAllTask({
         _page: newPage,
         _limit: pagination.limitPerPage,
      }))
   }
   console.log(tasks, 'all task ne');
   if (isLoading) {
      return <Spin />
   }

   return (
      <div className="all-task">

         {tasks.length === 0 ? <div> No tasks</div> : <>
            <MainContentTask tasks={tasks} />
            <Pagination defaultPageSize={pagination.limitPerPage} current={pagination.currentPage}
               total={pagination.total}
               onChange={handleChange} />
         </>}

      </div>
   );

};
export default AllTask;