import UserMenu from '../components/UserMenu';
import SearchBar from "../components/SearchBar";
import AddTask from "../components/AddTask";
import TaskList from '../components/TaskList';
import Filter from "../components/Filter";
import styles from '../styles/Dashboard.module.css';

const Dashboard: React.FC = () => {
    return (
        <>
            <UserMenu/>
            <div className={styles.dashboard}>
                <div className={styles.title}>
                    <h1>Task Dashboard</h1>
                    <SearchBar/>
                </div>

                <div className={styles.actions}>
                    <AddTask/>
                    <Filter/>
                </div>
                <TaskList/>
            </div>
        </>
    );
};

export default Dashboard;
