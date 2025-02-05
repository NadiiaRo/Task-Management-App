import React, {useContext, useRef, useState} from "react"; // Import useState and useRef here
import {TaskContext} from "../context/TaskContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/AddTask.module.css";

const AddTask: React.FC = () => {
    const taskContext = useContext(TaskContext);

    if (!taskContext) return null;

    const {addTask} = taskContext;

    const [priority, setPriority] = useState('normal');
    const [isAdding, setIsAdding] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const taskInputRef = useRef<HTMLInputElement>(null);
    const [isInputError, setIsInputError] = useState(false);

    const handleAddTask = () => {
        const taskValue = taskInputRef.current?.value.trim();
        if (taskValue) {
            addTask(taskValue, priority);
            if (taskInputRef.current) {
                taskInputRef.current.value = '';
            }
            setIsAdding(false); // <-- Hides the form once the task is added
            setErrorMessage(null); // <-- Resets error message
            setIsInputError(false); // <-- Resets input error styling
        } else {
            setErrorMessage('Empty field.')
            setIsInputError(true); // <-- Sets input field to red
            setTimeout(() => {
                setIsInputError(false); // <-- Resets the input field color after 1 second
            }, 1000);
        }
    };

    return (
        <>
            {!isAdding ? (
                <button className={styles.addTaskButton} onClick={() => setIsAdding(true)}>
                    <FontAwesomeIcon icon={faPlus}/> Add Task
                </button>
            ) : (
                <>
                    <div className={styles.addTask}>
                        <input
                            type="text"
                            placeholder="New Task"
                            ref={taskInputRef}
                            className={isInputError ? styles.errorInput : ''} // Apply error style conditionally
                            onChange={() => {
                                setErrorMessage(null); // Clear error message when user types
                                setIsInputError(false); // Reset input error styling
                            }}
                        />
                        <select className={styles.priorityDropdown}
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="high">High</option>
                            <option value="normal">Normal</option>
                            <option value="low">Low</option>
                        </select>
                        <button onClick={handleAddTask}>Add Task</button>
                    </div>
                    {errorMessage && (
                        <div className={styles.errorMessage}>{errorMessage}</div>
                    )}
                </>
            )}
        </>
    );
};

export default AddTask;
