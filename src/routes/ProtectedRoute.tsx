import React from "react";
import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute: React.FC = () => {
    // const user = auth.currentUser;
    // return user ? <Outlet /> : <Navigate to="/login" />;

    // What’s Happening Here?
    //  1. auth.currentUser checks if the user is logged in.
    //  2. If user exists, <Outlet /> renders whatever child routes are inside this route.
    //  3. If user does not exist, <Navigate to="/login" /> redirects the user to the login page.

    const [user, setUser] = useState(auth.currentUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
            setUser(loggedInUser);
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    if (loading) return <div>Loading...</div>; // Prevents flashing of login page

    return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;

// What Do We Do Here?
// Use onAuthStateChanged – Ensure Firebase authentication state is correctly tracked.
// Prevent flickering – Use loading state to prevent unnecessary redirects before auth state is confirmed.
// Clean up listener – Call unsubscribe() on unmount to avoid memory leaks.
// Ensure real-time auth state updates – If the user logs out or their session expires, the component will re-render accordingly.