import React, {useContext, useRef, useState} from "react"; // Import useState and useRef here
import {TaskContext} from "../context/TaskContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/AddTask.module.css";
import {addDoc, collection} from "firebase/firestore";
import {db, auth} from "../firebaseConfig";

const AddTask: React.FC = () => {
    const taskContext = useContext(TaskContext);

    if (!taskContext) return null;

    const {fetchTasks} = taskContext;

    const [priority, setPriority] = useState('normal');
    const [isAdding, setIsAdding] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const taskInputRef = useRef<HTMLInputElement>(null);
    const [isInputError, setIsInputError] = useState(false);

    // const handleAddTask = () => {
    //     const taskValue = taskInputRef.current?.value.trim();
    //     if (taskValue) {
    //         addTask(taskValue, priority);
    //         if (taskInputRef.current) {
    //             taskInputRef.current.value = '';
    //         }
    //         setIsAdding(false); // <-- Hides the form once the task is added
    //         setErrorMessage(null); // <-- Resets error message
    //         setIsInputError(false); // <-- Resets input error styling
    //     } else {
    //         setErrorMessage('Empty field.')
    //         setIsInputError(true); // <-- Sets input field to red
    //         setTimeout(() => {
    //             setIsInputError(false); // <-- Resets the input field color after 3 seconds
    //         }, 3000);
    //     }
    // };

    // Fetching tasks
    const handleAddTask = async () => {
        const taskTitle = taskInputRef.current?.value.trim();
        const user = auth.currentUser;

        if (!user) {
            console.error("❌ User not authenticated.");
            return;
        }

        // if (taskTitle) {
        //     try {
        //         console.log("🚀 Adding task to Firestore...");
        //
        //         const userDocRef = doc(db, "users", user.uid);
        //         const tasksCollectionRef = collection(userDocRef, "tasks");
        //
        //         await addDoc(tasksCollectionRef, {
        //             id: Date.now().toString(),
        //             title: taskTitle,
        //             isCompleted: false,
        //             priority: priority,
        //         });
        //
        //         console.log("✅ Task successfully added!");
        //
        //         fetchTasks(user.uid); // <--- Fetch tasks again after adding
        //
        //         if (taskInputRef.current) {
        //             taskInputRef.current.value = "";
        //         }
        //         setIsAdding(false);
        //         setErrorMessage(null);
        //         setIsInputError(false);
        //     } catch (error) {
        //         console.error("Error adding task:", error);
        //     }

        if (taskTitle) {
            try {
                console.log("🚀 Adding task to Firestore...");

                const tasksCollectionRef = collection(db, "users", user.uid, "tasks");

                // Firestore auto-generates the ID
                const taskDocRef = await addDoc(tasksCollectionRef, {
                    title: taskTitle,
                    isCompleted: false,
                    priority: priority,
                });

                console.log("✅ Task successfully added with ID:", taskDocRef.id);

                // Fetch tasks again to update UI
                fetchTasks(user.uid);

                if (taskInputRef.current) {
                    taskInputRef.current.value = "";
                }
                setIsAdding(false);
                setErrorMessage(null);
                setIsInputError(false);
            } catch (error) {
                console.error("❌ Error adding task:", error);
            }

        } else {
            setErrorMessage("Empty field.");
            setIsInputError(true);
            setTimeout(() => {
                setIsInputError(false);
            }, 3000);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleAddTask();
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
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                placeholder="New Task"
                                ref={taskInputRef}
                                className={isInputError ? styles.errorInput : ''}
                                onChange={() => {
                                    setErrorMessage(null);
                                    setIsInputError(false);
                                }}
                                onKeyDown={handleKeyDown}
                            />
                            {errorMessage && (
                                <div className={styles.errorMessage}>{errorMessage}</div>
                            )}
                        </div>
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
                </>
            )}
        </>
    );
};

export default AddTask;