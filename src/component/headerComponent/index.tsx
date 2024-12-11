import { Row, Col, Flex, Button } from "antd";
import Input from "antd/es/input";
import { Link, useNavigate } from "react-router-dom";
import "./styles.scss";
import { ROUTES } from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { actFetchAllTask, setSearchKey } from "../../redux/features/tasks/taskSlice";
import { RootState, AppDispatch } from '../../redux/store';

const HeaderComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const searchKey = useSelector((state: RootState) => state.task.searchKey);
    const pagination = useSelector((state: RootState) => state.task.pagination);

    const handleRedirectAddTask = () => {
        navigate(ROUTES.ADD_NEW);
    };

    const handleSearchTask = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        const params = {
            _page: 1,
            _limit: pagination.limitPerPage,
    
        };
        if (searchKey) {
            (params as any).q = searchKey; 
          }
          
        console.log("Search Key:", searchKey);
console.log("Pagination:", pagination);
        dispatch(actFetchAllTask(params));
    };

    const handleChangeInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        dispatch(setSearchKey(value));
    };

    return (
        <div className="header-container">
            <Button onClick={handleRedirectAddTask}>Creacte New Task</Button>
            <form className="header-container_search-area" onSubmit={handleSearchTask}>
                <Input placeholder="Vui lòng nhập tìm kiếm..." value={searchKey} onChange={handleChangeInputSearch} />
                <Button htmlType="submit">Search</Button>
            </form>
        </div>
    );
};

export default HeaderComponent;