import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import '../styles/TaskList.module.css';

const TaskList: React.FC = () => {
    const taskContext = useContext(TaskContext);

    if (!taskContext) return null;

    const { tasks, toggleTask, deleteTask } = taskContext;

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                    />
                    {task.title}
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
