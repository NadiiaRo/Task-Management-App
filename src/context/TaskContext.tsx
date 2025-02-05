import React, {createContext, useState, ReactNode} from 'react';

interface Task {
    id: string;
    title: string;
    completed: boolean;
    priority: string;
}

interface TaskContextType {
    tasks: Task[];
    filteredTasks: Task[];  // <-- Stores filtered tasks
    setFilteredTasks: (tasks: Task[]) => void; // <-- Updates filtered list
    addTask: (taskTitle: string, priority: string) => void;
    editTask: (id: string, newTitle: string, newPriority: string) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
    children: ReactNode;
}

const TaskProvider: React.FC<TaskProviderProps> = ({children}) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

    const addTask = (taskTitle: string, priority: string) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title: taskTitle,
            completed: false,
            priority: priority
        };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
    };

    const editTask = (id: string, newTitle: string, newPriority: string) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? {...task, title: newTitle, priority: newPriority} : task
        );
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
    };

    const toggleTask = (id: string) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? {...task, completed: !task.completed} : task
        );
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
    };

    const deleteTask = (id: string) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
    };

    return (
        <TaskContext.Provider value={{
            tasks,
            addTask,
            editTask,
            toggleTask,
            deleteTask,
            filteredTasks,
            setFilteredTasks
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export {TaskContext, TaskProvider};
