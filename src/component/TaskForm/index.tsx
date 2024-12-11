import { Button, Input, Radio, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import "./style.scss";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { actCreateNewTask, actDeleteTask } from "../../redux/features/tasks/taskSlice";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { AppDispatch } from "../../redux/store";
import { TASK_STATUS } from "../../constants/task.constant";
import { TaskApis } from "../../apis/taskApis";

interface FormValues {
    title: string;
    creator: string;
    createAt: string;
    status: string;
    description: string;
}

const schema = yup.object().shape({
    title: yup.string().required("Please input title"),
    creator: yup.string().required("Please input creator"),
    description: yup.string().required("Please input description"),
    createAt: yup.string().default(() => new Date().toLocaleString('vi-VN')),
    status: yup.string().required("Please select status")
});

const TaskForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { id } = useParams();
    const [originalTask, setOriginalTask] = useState<FormValues | null>(null);

    const { handleSubmit, control, formState: { errors }, reset } = useForm<FormValues>({
        defaultValues: {
            title: '',
            creator: '',
            createAt: new Date().toLocaleString('vi-VN'),
            status: TASK_STATUS.NEW,
            description: '',
        },
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        const fetchTask = async () => {
            if (id) {
                try {
                    const task = await TaskApis.getTaskById(id);
                    setOriginalTask(task);
                    reset(task);
                } catch (error) {
                    console.error("Error fetching task:", error);
                    message.error("Failed to fetch task details");
                    navigate(ROUTES.ALL_TASK);
                }
            }
        };
        fetchTask();
    }, [id, reset, navigate]);

    const handleReset = () => {
        if (originalTask) {
            reset(originalTask);
            message.info("Form has been reset to original values");
        }
    };

    const handleDelete = () => {
        Modal.confirm({
            title: 'Delete Task',
            content: 'Are you sure you want to delete this task?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await dispatch(actDeleteTask(id!));
                    message.success("Task deleted successfully");
                    navigate(ROUTES.ALL_TASK);
                } catch (error) {
                    console.error("Error deleting task:", error);
                    message.error("Failed to delete task");
                }
            },
        });
    };

    const onValid = async (formValues: FormValues) => {
        try {
            if (id) {
                await TaskApis.updateTaskById(id, formValues);
                message.success("Task updated successfully");
            } else {
                await dispatch(actCreateNewTask(formValues));
                message.success("Task created successfully");
            }
            navigate(ROUTES.ALL_TASK);
        } catch (error) {
            console.error("Error saving task:", error);
            message.error("Failed to save task");
        }
    };

    return (
        <div className="task-form-wrapper">
            <form className="task-form-container" onSubmit={handleSubmit(onValid)}>
                <div className="task-form">
                    <label className="task-form_lable">Title:</label>
                    <Controller
                        control={control}
                        name="title"
                        render={({ field }) => (
                            <Input 
                                placeholder={originalTask?.title || "Enter title..."} 
                                {...field} 
                            />
                        )}
                    />
                </div>
                {!!errors.title?.message && <span style={{ color: 'red' }}>{errors.title?.message}</span>}
                
                <div className="task-form">
                    <label className="task-form_lable">Creator:</label>
                    <Controller
                        control={control}
                        name="creator"
                        render={({ field }) => (
                            <Input 
                                placeholder={originalTask?.creator || "Enter creator name..."} 
                                {...field} 
                            />
                        )}
                    />
                </div>
                {!!errors.creator?.message && <span style={{ color: 'red' }}>{errors.creator?.message}</span>}
                
                <div className="task-form">
                    <label className="task-form_lable">Create At:</label>
                    <Controller
                        control={control}
                        name="createAt"
                        render={({ field }) => (
                            <Input {...field} disabled />
                        )}
                    />
                </div>

                <div className="task-form">
                    <label className="task-form_lable">Status:</label>
                    <Controller
                        control={control}
                        name="status"
                        render={({ field }) => (
                            <Radio.Group {...field} className="status-radio-group">
                                <Radio value={TASK_STATUS.NEW}>
                                    <span style={{ color: field.value === TASK_STATUS.NEW ? '#18ff33' : 'inherit' }}>New</span>
                                </Radio>
                                <Radio value={TASK_STATUS.DOING}>
                                    <span style={{ color: field.value === TASK_STATUS.DOING ? '#ffeb3b' : 'inherit' }}>Doing</span>
                                </Radio>
                                <Radio value={TASK_STATUS.DONE}>
                                    <span style={{ color: field.value === TASK_STATUS.DONE ? '#2196f3' : 'inherit' }}>Done</span>
                                </Radio>
                            </Radio.Group>
                        )}
                    />
                </div>
                {!!errors.status?.message && <span style={{ color: 'red' }}>{errors.status?.message}</span>}

                <div className="task-form">
                    <label className="task-form_lable">Description:</label>
                    <Controller
                        control={control}
                        name="description"
                        render={({ field }) => (
                            <Input.TextArea 
                                placeholder={originalTask?.description || "Enter description..."} 
                                {...field} 
                            />
                        )}
                    />
                </div>
                {!!errors.description?.message && <span style={{ color: 'red' }}>{errors.description?.message}</span>}

                <div className="task-form-btn">
                    <Button type="primary" htmlType="submit">
                        {id ? 'Update' : 'Save'}
                    </Button>
                    {id && (
                        <>
                            <Button 
                                style={{ marginLeft: 8 }} 
                                onClick={handleReset}
                            >
                                Reset
                            </Button>
                            <Button 
                                danger 
                                style={{ marginLeft: 8 }}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default TaskForm;