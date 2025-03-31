import React, {useContext, useEffect, useState} from 'react';
import {TaskContext} from '../context/TaskContext';
import styles from '../styles/TaskList.module.css';
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {auth} from "../firebaseConfig";

const TaskList: React.FC = () => {
    const taskContext = useContext(TaskContext);

    if (!taskContext) return null;

    const {tasks, setTasks, editTask, toggleTask, deleteTask, sortedTasks, fetchTasks} = taskContext;
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedPriority, setEditedPriority] = useState<string>('');
    const user = auth.currentUser;

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

    const displayedTasks = sortedTasks.length > 0 ? sortedTasks : [];

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

    useEffect(() => {
        if (user) {
            fetchTasks(user.uid);
        }
    }, []);

    return (
        <div className={styles.tasks}>
            {displayedTasks.length === 0 ? (
                <div className={styles.noTasks}>
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
                                <input
                                    type="checkbox"
                                    checked={task.isCompleted}
                                    onChange={() => toggleTask(task.id)}
                                />
                                <span
                                    className={task.isCompleted ? styles.completed : ''}
                                    onClick={() => toggleTask(task.id)}>
                                    {task.title}
                                </span>
                                <div className={styles.updateTask}>
                                    {getPrioritySymbol(task.priority)}
                                </div>
                                <div className={styles.updateTask}>
                                    <button className={styles.editBtn} onClick={() => handleEditTask(task.id)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                    <button className={styles.deleteBtn} onClick={() => deleteTask(task.id)}><FontAwesomeIcon icon={faTrash} /></button>
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
