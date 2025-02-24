import React, {useContext} from "react";
import {ThemeContext} from "../context/ThemeContext";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import styles from "../styles/ThemeToggle.module.css";

const ThemeToggle: React.FC = () => {
    const themeContext = useContext(ThemeContext);
    if (!themeContext) return null;

    const {theme, toggleTheme} = themeContext;

    return (
        <button onClick={toggleTheme} className={`${styles.themeToggleBtn} ${theme === "light" ? styles.light : styles.dark}`}>
            {theme === "light" ? (
                <>
                    <FontAwesomeIcon icon={faMoon}/> Dark Mode
                </>
            ) : (
                <>
                    <FontAwesomeIcon icon={faSun}/> Light Mode
                </>
            )}
        </button>
    );
};

export default ThemeToggle;
