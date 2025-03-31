import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

// Your Firebase configuration object (replace with your config)
const firebaseConfig = {
    apiKey: "AIzaSyBs17pE7f_0nwaYFSQRbLeM5Jc41cj0znw",
    authDomain: "task-management-app-a2654.firebaseapp.com",
    projectId: "task-management-app-a2654",
    storageBucket: "task-management-app-a2654.firebasestorage.app",
    messagingSenderId: "1064491971278",
    appId: "1:1064491971278:web:5a709851edd9b5f309d69f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;