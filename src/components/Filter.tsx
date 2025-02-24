import React, {useContext} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import {TaskContext} from "../context/TaskContext";
import styles from '../styles/Filter.module.css';

const Filter: React.FC = () => {
    const taskContext = useContext(TaskContext);
    if (!taskContext) return null;
    const {tasks, setFilteredTasks} = taskContext;

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = (e.target as HTMLSelectElement).value;
        if (value === "A-Z") {
            // Sort tasks alphabetically by title without mutating the original array
            const sortedTasks = [...tasks].sort((a, b) => a.title.localeCompare(b.title));
            setFilteredTasks(sortedTasks);
        } else if (value === "Priority") {
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
            setFilteredTasks(sortedByPriority);
            // } else if (value === "Completion") {
            //     // Filter tasks to show only completed tasks
            //     const completedTasks = tasks.filter(task => task.completed);
            //     setFilteredTasks(completedTasks);
        } else if (value === "Completion") {
            // Sort tasks so that incomplete tasks appear first
            const sortedByCompletion = [...tasks].sort((a, b) => {
                if (a.completed === b.completed) return 0;
                return a.completed ? 1 : -1;
            });
            setFilteredTasks(sortedByCompletion);
        } else if (value === "Filter") {
            // If the filter is cleared, show all tasks
            setFilteredTasks(tasks);
        }
        // You can add additional filtering logic for "Priority" and "Completion" here
    };

    return (
        <>
            <select className={styles.filterDropdown} onChange={handleFilterChange}>
                <option>Filter<FontAwesomeIcon icon={faFilter}/></option>
                <option>A-Z</option>
                <option>Priority</option>
                <option>Completion</option>
            </select>
        </>
    );
};

export default Filter;