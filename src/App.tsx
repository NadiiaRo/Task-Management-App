import {useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import {TaskProvider} from './context/TaskContext';
import {ThemeProvider} from './context/ThemeContext';
import './styles/global.css';

function App() {
    return (
        <ThemeProvider>
            <TaskProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<LoginPage/>}/>
                        <Route path="/signup" element={<SignupPage/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                    </Routes>
                </Router>
            </TaskProvider>
        </ThemeProvider>
    );
}

export default App
