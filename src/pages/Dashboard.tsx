import React, {useContext, useRef} from 'react'; //Import useState and useRef here
import {TaskContext} from '../context/TaskContext';
import TaskList from '../components/TaskList';
import UserMenu from '../components/UserMenu';
import styles from '../styles/Dashboard.module.css';

const Dashboard: React.FC = () => {
    const taskContext = useContext(TaskContext);

    if (!taskContext) return null;

    const {addTask} = taskContext;

    // const [newTask, setNewTask] = useState(''); //Use Ref instead
    const taskInputRef = useRef<HTMLInputElement>(null);

    // const handleAddTask = () => {
    //     if (newTask.trim()) {
    //         addTask(newTask);
    //         setNewTask('');
    //     }
    // }; //Use Ref instead

    const handleAddTask = () => {
        const taskValue = taskInputRef.current?.value.trim();
        if (taskValue) {
            addTask(taskValue);
            if (taskInputRef.current) {
                taskInputRef.current.value = '';
            }
        }
    };

    return (
        <>
            <UserMenu/>
            <div className={styles.dashboard}>
                <h1>Task Dashboard</h1>
                <div className={styles.addTask}>
                    <input
                        type="text"
                        placeholder="New Task"
                        // value={newTask}
                        // onChange={(e) => setNewTask(e.target.value)} //Use Ref instead
                        ref={taskInputRef}
                    />
                    <button onClick={handleAddTask}>Add Task</button>
                </div>
                <TaskList/>
            </div>
        </>
    );
};

export default Dashboard;
