import React, {useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {auth} from '../firebaseConfig';
import {createUserWithEmailAndPassword} from "firebase/auth";
import styles from '../styles/LoginPage.module.css';

const SignupPage: React.FC = () => {
    // const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate(); // Use navigate instead of window.location.href
    const [errorMessage, setErrorMessage] = useState('');
    const [isInputError, setIsInputError] = useState(false);

    const handleSignup = async () => {
        // const enteredName = nameRef.current?.value.trim() || "";
        const enteredEmail = emailRef.current?.value.trim() || "";
        const enteredPassword = passwordRef.current?.value || "";

        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword);
            const user = userCredential.user;
            console.log("User created:", user, userCredential);

            // Redirect to login page
            navigate('/');

        } catch (error: any) {
            console.error("Signup error:", error);
            setErrorMessage('Invalid credentials.');
            setIsInputError(true);
            setTimeout(() => setIsInputError(false), 3000);
        }
    };

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            // WARNING: Promise returned from handleSignup is ignored
            // You can resolve this warning by marking your keydown handler as asynchronous and awaiting the call to handleSignup.
            await handleSignup();
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginForm}>
                <h1>Signup</h1>
                <div className={styles.formGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        ref={emailRef}
                        onKeyDown={handleKeyDown}
                        className={isInputError ? styles.errorInput : ''}
                        onChange={() => setIsInputError(false)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Create your password"
                        ref={passwordRef}
                        onKeyDown={handleKeyDown}
                        className={isInputError ? styles.errorInput : ''}
                        onChange={() => setIsInputError(false)}
                    />
                </div>
                <button className={styles.loginBtn} onClick={handleSignup}>Signup</button>
                <span>Already have an account? <Link to="/">Login</Link></span>
            </div>
        </div>
    );
};

export default SignupPage;
