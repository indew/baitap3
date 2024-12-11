import React   from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const SideBar= ()=>{
    return(
        <div className="side-bar-container">
            <ul className="side-bar-container_list">
                <li className="side-bar-container_list-item"> <Link to ={ROUTES.ALL_TASK} >All Task</Link> </li>
                <li className="side-bar-container_list-item"> <Link to ={ROUTES.NEW_TASK} >New Task</Link></li>
                <li className="side-bar-container_list-item"> <Link to ={ROUTES.DOING_TASK} >Doing Task</Link></li>
                <li className="side-bar-container_list-item"> <Link to ={ROUTES.DONE_TASK} >Done Task</Link></li>
            </ul>
        </div>
    );
};
export default SideBar;