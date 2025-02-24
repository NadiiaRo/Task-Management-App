import React from 'react';
import {useNavigate} from 'react-router-dom';
import styles from '../styles/UserMenu.module.css';
import ThemeToggle from "./ThemeToggle";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';

const UserMenu: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className={styles.userMenu}>
            <div className={styles.user}>
                <span><FontAwesomeIcon icon={faUser}/></span>
                <button onClick={handleLogout} className={styles.logoutButton}><FontAwesomeIcon icon={faRightFromBracket} />Logout</button>
            </div>
        </div>
    );
}

export default UserMenu;