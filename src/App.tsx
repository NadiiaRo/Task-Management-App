import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from "./routes/ProtectedRoute";
import {TaskProvider} from './context/TaskContext';
import './styles/global.css';

function App() {
    return (
        <TaskProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/signup" element={<SignupPage/>}/>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </Router>
        </TaskProvider>
    );
}

export default App;

{/*What’s Happening Here?*/}
{/*    The ProtectedRoute acts as a wrapper.*/}
{/*    The child route inside it (/dashboard) is placed where <Outlet /> is in ProtectedRoute.tsx.*/}
{/*    If the user is logged in, React replaces <Outlet /> with <Dashboard />.*/}
{/*    If the user is not logged in, they are redirected to /login.*/}
    // <Outlet /> is a placeholder for child routes.
    // It allows ProtectedRoute to wrap multiple protected pages (not just /dashboard).
    // It avoids repeating authentication logic for every route.
    // Route protection should happen at the routing level (App.tsx), not inside the login logic.