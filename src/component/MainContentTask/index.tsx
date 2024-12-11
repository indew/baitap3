import Task from "../TaskCard"
import React from "react";
import "./style.scss";
interface MainContentTaskProps {
    tasks: TaskType[]; 
}

interface TaskType {
    id: number;
    title: string;
    creator: string; 
    status: string; 
    description: string;
}
const MainContentTask: React.FC<MainContentTaskProps> = (props) => {
    const renderTask = (tasks: TaskType[]) => {
        return tasks.map((task) => {
            return (
                <Task
                    key={task.id}
                    id={task.id} // Thêm thuộc tính id
                    title={task.title}
                    creator={task.creator}
                    status={task.status}
                    description={task.description}
                />
            );
        });
    };
    return (
        <div className="main-content-task">
            {renderTask(props.tasks)}
        </div>
    )
}
export default MainContentTask;