import { generatePath, useNavigate } from "react-router-dom";
import "./styles.scss";
import React from "react";
import { ROUTES } from "../../constants/routes";

interface TaskProps {
    id: number;
    title: string;
    creator: string;
    status: string;
    description: string;
}

const Task: React.FC<TaskProps> = ({ id, title, creator, status, description }) => {
    const navigate = useNavigate();

    const handleRedirectToDetailPage = () => {
        navigate(generatePath(ROUTES.UPDATE_TASK, { id: id.toString() }));
    };

    return (
        <div className="task-container">
            <div className="task-container_title" onClick={handleRedirectToDetailPage}>
                Title: {title}
            </div>
            <div className="task-container_author">Creator: {creator}</div>
            <div className="task-container_status">Status: {status}</div>
            <div className="task-container_divider"></div>
            <div className="task-container_description">
                <div className="task-container_des-title">Description:</div>
                <div className="task-container_des-content">{description}</div>
            </div>
        </div>
    );
};

export default Task;