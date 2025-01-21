// import React, { useState } from 'react';
//
// const LoginPage: React.FC = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//
//     const handleLogin = () => {
//         if (email === 'test@test.com' && password === 'password') {
//             localStorage.setItem('user', JSON.stringify({ email }));
//             window.location.href = '/dashboard';
//         } else {
//             alert('Invalid credentials');
//         }
//     };
//
//     return (
//         <div>
//             <h1>Login</h1>
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <button onClick={handleLogin}>Login</button>
//         </div>
//     );
// };
//
// export default LoginPage;

import React, { useState } from 'react';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        const correctEmail = 'test@test.com';
        const correctPassword = 'password';

        if (email === correctEmail && password === correctPassword) {
            localStorage.setItem('user', JSON.stringify({ email }));
            window.location.href = '/dashboard';
        } else {
            setErrorMessage(
                `Invalid credentials. Please use the following to log in:
                Email: ${correctEmail}
                Password: ${correctPassword}`
            );
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginForm}>
                <h1>Login</h1>
                <div className={styles.formGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={handleLogin}>Login</button>
                {errorMessage && (
                    <div className={styles.errorMessage}>{errorMessage}</div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
