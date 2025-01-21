import React, { createContext, useState, ReactNode } from 'react';

interface Task {
    id: string;
    title: string;
    completed: boolean;
}

interface TaskContextType {
    tasks: Task[];
    addTask: (taskTitle: string) => void;
    editTask: (id: string, newTitle: string) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
    children: ReactNode;
}

const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (taskTitle: string) => {
        const newTask: Task = { id: Date.now().toString(), title: taskTitle, completed: false };
        setTasks([...tasks, newTask]);
    };

    const editTask = (id: string, newTitle: string) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, title: newTitle } : task));
    };

    const toggleTask = (id: string) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, editTask, toggleTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export { TaskContext, TaskProvider };
