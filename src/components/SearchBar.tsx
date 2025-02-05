import React, {useContext, useState} from "react";
import {TaskContext} from '../context/TaskContext';
import styles from '../styles/SearchBar.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

const SearchBar: React.FC = () => {
    // const taskContext = useContext(TaskContext);
    // if (!taskContext) return null;
    //
    // const {tasks, setFilteredTasks} = taskContext;
    //
    // const [searchQuery, setSearchQuery] = useState('');
    //
    // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const query = (e.target as HTMLInputElement).value; // Proper type assertion
    //     setSearchQuery(query);
    //
    //     // If tasks are strings
    //     const filtered = tasks.filter(task =>
    //         task.title.toLowerCase().includes(query.toLowerCase())
    //     );
    //
    //     setFilteredTasks(filtered); // Make sure this function exists in the context
    // };
    //
    const taskContext = useContext(TaskContext);
    if (!taskContext) return null;

    const {tasks, setFilteredTasks} = taskContext; // Make sure TaskContext has setFilteredTasks
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = (e.target as HTMLInputElement).value.toLowerCase();
        setSearchInput(query);

        const filteredTasks = tasks.filter((task) => {
            console.log(`Checking task: ${task.title}, Query: ${query}`); // Debugging log
            return task.title.toLowerCase().includes(query);
        });

        console.log("Filtered tasks:", filteredTasks); // Check filtered result
        setFilteredTasks(filteredTasks);
    };

    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                placeholder="Search tasks..."
                value={searchInput}
                onChange={handleSearch}
            />
            <span className={styles.searchIcon}><FontAwesomeIcon icon={faMagnifyingGlass}/></span>
        </div>
    );

};

export default SearchBar;