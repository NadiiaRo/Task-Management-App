import React from 'react';
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {auth} from '../firebaseConfig';
import styles from '../styles/UserMenu.module.css';

const UserMenu: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const user = auth.currentUser;

    return (
        <div className={styles.header}>
            <div className={styles.userMenu}>
                <div className={styles.userId}>
                    <span>{user?.email}</span>
                    <span className={styles.userIcon}><FontAwesomeIcon icon={faUser}/></span>
                </div>
                <button onClick={handleLogout} className={styles.logoutButton}>Log out<FontAwesomeIcon
                    icon={faRightFromBracket}/>
                </button>
            </div>
        </div>
    );
}

export default UserMenu;