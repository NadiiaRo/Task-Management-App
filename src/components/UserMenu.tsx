import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/UserMenu.module.css';

const UserMenu: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout =  () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
       <div className={styles.userMenu}>
           <span>👤</span>
           <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
       </div>
    );
}

export default UserMenu;