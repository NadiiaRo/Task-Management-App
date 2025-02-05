import React, {useContext} from "react";
import {ThemeContext} from "../context/ThemeContext";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons';

const ThemeToggle: React.FC = () => {
    const themeContext = useContext(ThemeContext);
    if (!themeContext) return null;

    const {theme, toggleTheme} = themeContext;

    return (
        <button onClick={toggleTheme}>
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
