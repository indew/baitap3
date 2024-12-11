
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HeaderComponent from './component/headerComponent';
import SideBar from './component/SideBar';
import MainLayout from './layouts/mainLayout';
import DoneTask from './Pages/doneTask/DoneTask';
import { ROUTES } from './constants/routes';
import AllTask from './Pages/AllTask';
import NewTask from './Pages/newTask/NewTask';
import DoingTask from './Pages/doingTask/DoingTask';
import AddNewTask from './Pages/AddNewTask';
import UpdateTask from './Pages/updateTask';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
          <Route index element={<AllTask />} />
            <Route path={ROUTES.ALL_TASK} element={<AllTask />} />
            <Route path={ROUTES.UPDATE_TASK} element={<UpdateTask />} />
            <Route path={ROUTES.NEW_TASK} element={<NewTask />} />
            <Route path={ROUTES.DOING_TASK} element={<DoingTask />} />
            <Route path={ROUTES.DONE_TASK} element={<DoneTask />} />
            <Route path={ROUTES.ADD_NEW} element={<AddNewTask />} />
          </Route>
          <Route path={'/'} element={<Navigate to={ROUTES.ALL_TASK} />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
