import React, {useContext, useRef} from "react";
import {TaskContext} from '../context/TaskContext';
import styles from '../styles/SearchBar.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

const SearchBar: React.FC = () => {
    const taskContext = useContext(TaskContext);
    if (!taskContext) return null;

    const {tasks, setFilteredTasks} = taskContext; // Make sure TaskContext has setFilteredTasks
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleSearch = () => {
        const query = searchInputRef.current?.value.trim().toLowerCase();
        if (!query) return setFilteredTasks(tasks);

        const filteredTasks = tasks.filter((task) => {
            return task.title.toLowerCase().includes(query);
        });

        console.log("Filtered tasks:", filteredTasks); // Check filtered result
        setFilteredTasks(filteredTasks);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                placeholder="Search..."
                ref={searchInputRef}
                onKeyDown={handleKeyDown}
            />
            <span className={styles.searchIcon} onClick={handleSearch}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </span>
        </div>
    );

};

export default SearchBar;