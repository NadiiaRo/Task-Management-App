import React, {useContext} from "react";
import {TaskContext} from "../context/TaskContext";
import styles from '../styles/Sort.module.css';

const Sort: React.FC = () => {
    const taskContext = useContext(TaskContext);
    if (!taskContext) return null;
    const {tasks, setSortedTasks} = taskContext;

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = (e.target as HTMLSelectElement).value;
        if (value === "alphabet") {
            // Sort tasks alphabetically by title without mutating the original array
            const sortedTasks = [...tasks].sort((a, b) => a.title.localeCompare(b.title));
            setSortedTasks(sortedTasks);
        } else if (value === "priority") {
            // Define an order for priorities (lower number = higher priority)
            const priorityOrder: { [key: string]: number } = {
                high: 1,
                normal: 2,
                low: 3
            };
            // Sort tasks by priority based on the order above
            const sortedByPriority = [...tasks].sort((a, b) => {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });
            setSortedTasks(sortedByPriority);
        } else if (value === "completion") {
            // Sort tasks so that incomplete tasks appear first
            const sortedByCompletion = [...tasks].sort((a, b) => {
                if (a.isCompleted === b.isCompleted) return 0;
                return a.isCompleted ? 1 : -1;
            });
            setSortedTasks(sortedByCompletion);
        } else if (value === "Sort") {
            // If the filter is cleared, show all tasks
            setSortedTasks(tasks);
        }
    };

    return (
        <>
            <select className={styles.filterDropdown} onChange={handleSortChange}>
                <option value="default">Sort</option>
                <option value="alphabet">A-Z</option>
                <option value="priority">Priority</option>
                <option value="completion">Completion</option>
            </select>
        </>
    );
};

export default Sort;