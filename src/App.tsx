import {useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import {TaskProvider} from './context/TaskContext';
import {ThemeProvider} from './context/ThemeContext';
import './styles/global.css';

function App() {
    const [count, setCount] = useState(0)

    return (
        // <Router>
        //     <TaskProvider>
        //         <Routes>
        //             <Route path="/" element={<LoginPage/>}/>
        //             <Route path="/dashboard" element={<Dashboard/>}/>
        //         </Routes>
        //     </TaskProvider>
        // </Router>
        <ThemeProvider>
            <TaskProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<LoginPage/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                    </Routes>
                </Router>
            </TaskProvider>
        </ThemeProvider>
    );
}

export default App
