import UserMenu from '../components/UserMenu';
import SearchBar from "../components/SearchBar";
import AddTask from "../components/AddTask";
import TaskList from '../components/TaskList';
import styles from '../styles/Dashboard.module.css';

const Dashboard: React.FC = () => {
    return (
        <>
            <UserMenu/>
            <div className={styles.dashboard}>
                <h1>Task Dashboard</h1>
                <SearchBar/>
                <AddTask/>
                <TaskList/>
            </div>
        </>
    );
};

export default Dashboard;
