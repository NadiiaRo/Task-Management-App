import React, {useContext, useState} from 'react';
import { TaskContext } from '../context/TaskContext';
import styles from '../styles/TaskList.module.css';

const TaskList: React.FC = () => {
    const taskContext = useContext(TaskContext);

    if (!taskContext) return null;

    const { tasks, editTask, toggleTask, deleteTask } = taskContext;

    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editedTitle, setEditedTitle] = useState('');

    const handleEditTask = (id: string) => {
        setEditingTaskId(id);
        const taskToEdit = tasks.find(task => task.id === id);
        if (taskToEdit) {
            setEditedTitle(taskToEdit.title);
        }
    };

    const handleSaveEdit = () => {
        if (editedTitle.trim()) {
            editTask(editingTaskId!, editedTitle);
            setEditingTaskId(null);
            setEditedTitle('');
        }
    };

    return (
        <div className={styles.tasks}>
            {tasks.map((task) => (
                <div key={task.id} className={styles.task}>
                    {editingTaskId === task.id ? (
                        <div className={styles.editTask}>
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                            />
                            <button onClick={handleSaveEdit}>Save</button>
                            <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                        </div>
                    ) : (
                        <div className={styles.taskContent}>
                                <span
                                    className={task.completed ? styles.completed : ''}
                                    onClick={() => toggleTask(task.id)}
                                >
                                    {task.title}
                                </span>
                            <button onClick={() => handleEditTask(task.id)}>Edit</button>
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TaskList;
