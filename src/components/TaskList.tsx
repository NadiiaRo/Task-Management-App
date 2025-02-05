import React, {useContext, useState} from 'react';
import {TaskContext} from '../context/TaskContext';
import styles from '../styles/TaskList.module.css';

const TaskList: React.FC = () => {
    const taskContext = useContext(TaskContext);

    if (!taskContext) return null;

    const {tasks, editTask, toggleTask, deleteTask, filteredTasks} = taskContext;
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [priority, setPriority] = useState('normal'); //Refactoring Add Task functionality
    const [editedPriority, setEditedPriority] = useState<string>('');


    const handleEditTask = (id: string) => {
        setEditingTaskId(id);
        const taskToEdit = tasks.find(task => task.id === id);
        if (taskToEdit) {
            setEditedTitle(taskToEdit.title);
            setEditedPriority(taskToEdit.priority);
        }
    };

    const handleSaveEdit = () => {
        if (editedTitle.trim()) {
            editTask(editingTaskId!, editedTitle, editedPriority);
            setEditingTaskId(null);
            setEditedTitle('');
            setEditedPriority('');
        }
    };

    const displayedTasks = filteredTasks.length > 0 ? filteredTasks : tasks;

    const getPrioritySymbol = (priority: string) => {
        switch (priority) {
            case 'low':
                return '🟢';
            case 'high':
                return '🔴';
            case 'normal':
            default:
                return '🔵';
        }
    };

    return (
        <div className={styles.tasks}>
            {displayedTasks.length === 0 ? (
                <div>
                    <p>No tasks found.</p>
                </div>
            ) : (
                displayedTasks.map((task) => (
                    <div key={task.id} className={styles.task}>
                        {editingTaskId === task.id ? (
                            <div className={styles.editTask}>
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                />
                                <div className={styles.updateTask}>
                                    <select className={styles.priorityDropdown}
                                            value={editedPriority}
                                            onChange={(e) => setEditedPriority(e.target.value)}
                                    >
                                        <option value="high">High</option>
                                        <option value="normal">Normal</option>
                                        <option value="low">Low</option>
                                    </select>
                                    <button onClick={handleSaveEdit}>Save</button>
                                    <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.taskContent}>
                                <span
                                    className={task.completed ? styles.completed : ''}
                                    onClick={() => toggleTask(task.id)}
                                >
                                    {task.title}
                                </span>
                                <div className={styles.updateTask}>
                                    {getPrioritySymbol(task.priority)}
                                    <button onClick={() => handleEditTask(task.id)}>Edit</button>
                                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                                </div>

                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default TaskList;
