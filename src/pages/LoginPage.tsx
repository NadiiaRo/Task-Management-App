import React, {useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {auth} from "../firebaseConfig";
import {setPersistence, browserSessionPersistence, signInWithEmailAndPassword} from "firebase/auth"
import styles from '../styles/LoginPage.module.css';

const LoginPage: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [isInputError, setIsInputError] = useState(false);

    const handleLogin = async () => {
        await setPersistence(auth, browserSessionPersistence); // Set session persistence

        const enteredEmail = emailRef.current?.value.trim() || "";
        const enteredPassword = passwordRef.current?.value || "";

        if (!enteredEmail || !enteredPassword) {
            setErrorMessage("Please fill in both fields.")
            setIsInputError(true);
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword);
            console.log("✅ User logged in:", userCredential.user);
            navigate('/dashboard');
        } catch (error: any) {
            console.log("❌ Login error:", error);
            handleAuthError(error.code);
        }
    };

    const handleAuthError = (errorCode: string) => {
        let message = "Invalid credentials. Please try again."
        if (errorCode === "auth/user-not-found" || errorCode === "auth/invalid-credential") {
            message = "User not found. Please sign up.";
        } else if (errorCode === "auth/wrong-password") {
            message = "Incorrect email or password. Please try again.";
        }
        setErrorMessage(message);
        setIsInputError(true);
        setTimeout(() => setIsInputError(false), 3000); // <-- Resets the input field color after 3 seconds
    };

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            await handleLogin();
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginForm}>
                <h1>Login</h1>
                <div className={styles.loginInputs}>
                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            ref={emailRef}
                            onKeyDown={handleKeyDown}
                            className={isInputError ? styles.errorInput : ''}
                            onChange={() => {
                                setIsInputError(false);
                            }}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            ref={passwordRef}
                            onKeyDown={handleKeyDown}
                            className={isInputError ? styles.errorInput : ''}
                            onChange={() => {
                                setIsInputError(false);
                            }}
                        />
                    </div>
                    <button className={styles.loginBtn} onClick={handleLogin}>Login</button>
                </div>
                {errorMessage && (
                    <div className={styles.errorMessage}>{errorMessage}</div>
                )}
                <span>Don't have an account? <Link to="/signup">Signup</Link></span>
            </div>
        </div>
    );
};

export default LoginPage;
