import React, {createContext, useState, useEffect, ReactNode} from 'react';
import {auth, db} from "../firebaseConfig";
import {collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc} from "firebase/firestore";

export interface Task {
    id: string;
    title: string;
    isCompleted: boolean;
    priority: string;
}

interface TaskContextType {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    sortedTasks: Task[];  // <-- Stores sorted tasks
    setSortedTasks: (tasks: Task[]) => void; // <-- Updates sorted list
    addTask: (taskTitle: string, priority: string) => void;
    editTask: (id: string, newTitle: string, newPriority: string) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
    fetchTasks: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
    children: ReactNode;
}

const TaskProvider: React.FC<TaskProviderProps> = ({children}) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [sortedTasks, setSortedTasks] = useState<Task[]>(tasks);

    // Fetch tasks when user logs in
    const fetchTasks = async (userId: string) => {
        if (!userId) return;
        try {
            console.log("📡 Fetching tasks...");

            const userDocRef = doc(db, "users", userId);
            const tasksCollectionRef = collection(userDocRef, "tasks");
            const querySnapshot = await getDocs(tasksCollectionRef);

            const fetchedTasks: Task[] = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as Task[];

            setTasks(fetchedTasks);
            setSortedTasks(fetchedTasks);
            console.log("✅ Tasks loaded:", fetchedTasks);
        } catch (error) {
            console.error("❌ Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                fetchTasks(user.uid);
            } else {
                setTasks([]);
                setSortedTasks([]);
            }
        });

        return () => unsubscribe();
    }, []);

    // Add a new task to Firestore
    // const addTask = (taskTitle: string, priority: string) => {
    //     const newTask: Task = {
    //         id: Date.now().toString(),
    //         title: taskTitle,
    //         isCompleted: false,
    //         priority: priority,
    //     };
    //     const updatedTasks = [...tasks, newTask];
    //     // setTasks(updatedTasks);
    //     setFilteredTasks(updatedTasks);
    // };

    const user = auth.currentUser;
    const addTask = async (taskTitle: string, priority: string) => {
        if (!user) {
            console.error("❌ User not authenticated.");
            return;
        }

        try {
            // const userDocRef = doc(db, "users", user.uid);
            // const tasksCollectionRef = collection(userDocRef, "tasks");
            //
            // const newTask: Task = {
            //     id: Date.now().toString(),
            //     title: taskTitle,
            //     isCompleted: false,
            //     priority: priority,
            // };
            //
            // await addDoc(tasksCollectionRef, newTask);

            console.log("🚀 Adding task to Firestore...");
            const taskDocRef = await addDoc(collection(db, "users", user.uid, "tasks"), {
                title: taskTitle,
                isCompleted: false,
                priority: priority,
            });

            console.log("✅ Task added with ID:", taskDocRef.id);

            const newTask: Task = {
                id: taskDocRef.id, // Use Firestore-generated ID
                title: taskTitle,
                isCompleted: false,
                priority: priority,
            };

            setTasks(prevTasks => [...prevTasks, newTask]); // Update state with correct ID

            fetchTasks(user.uid); // Refresh tasks
        } catch (error) {
            console.error("❌ Error adding task:", error);
        }
    };

    // Edit a task
    // const editTask = (id: string, newTitle: string, newPriority: string) => {
    //     const updatedTasks = tasks.map(task =>
    //         task.id === id ? {...task, title: newTitle, priority: newPriority} : task
    //     );
    //     // setTasks(updatedTasks);
    //     setFilteredTasks(updatedTasks);
    // };

    const editTask = async (id: string, newTitle: string, newPriority: string) => {
        if (!user) return;

        const taskDocRef = doc(db, "users", user.uid, "tasks", id);

        try {
            // Check if the task document exists
            const taskSnapshot = await getDoc(taskDocRef);
            if (!taskSnapshot.exists()) {
                console.error(`❌ Task with ID ${id} does not exist.`);
                return;
            }

            // Update Firestore
            await updateDoc(taskDocRef, {
                title: newTitle,
                priority: newPriority,
            });

            console.log("✅ Task updated successfully!");

            fetchTasks(user.uid); // Refresh tasks
        } catch (error) {
            console.error("❌ Error updating task:", error);
        }
    };

    // Toggle task completion
    // const toggleTask = (id: string) => {
    //     const updatedTasks = tasks.map(task =>
    //         task.id === id ? {...task, completed: !task.isCompleted} : task
    //     );
    //     // setTasks(updatedTasks);
    //     setFilteredTasks(updatedTasks);
    // };

    const toggleTask = async (id: string) => {
        if (!user) return;

        try {
            const userDocRef = doc(db, "users", user.uid);
            const taskDocRef = doc(userDocRef, "tasks", id);

            const updatedTasks = tasks.map(task =>
                task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
            );

            const updatedTask = updatedTasks.find(task => task.id === id);
            if (!updatedTask) return;

            await updateDoc(taskDocRef, {
                isCompleted: updatedTask.isCompleted,
            });

            fetchTasks(user.uid); // Refresh tasks
        } catch (error) {
            console.error("❌ Error toggling task:", error);
        }
    };

    // Delete a task
    // const deleteTask = (id: string) => {
    //     const updatedTasks = tasks.filter(task => task.id !== id);
    //     // setTasks(updatedTasks);
    //     setFilteredTasks(updatedTasks);
    // };

    const deleteTask = async (id: string) => {
        if (!user) return;

        try {
            const userDocRef = doc(db, "users", user.uid);
            const taskDocRef = doc(userDocRef, "tasks", id);

            await deleteDoc(taskDocRef);

            fetchTasks(user.uid); // Refresh tasks
        } catch (error) {
            console.error("❌ Error deleting task:", error);
        }
    };

    return (
        <TaskContext.Provider value={{
            tasks,
            setTasks,
            addTask,
            editTask,
            toggleTask,
            deleteTask,
            sortedTasks,
            setSortedTasks,
            fetchTasks
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export {TaskContext, TaskProvider};
