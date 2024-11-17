import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  setPersistence, 
  browserSessionPersistence 
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCrfDQKHg2YW52iD4K5dgWze6PWobY8Oc",
  authDomain: "xeno-task-8c222.firebaseapp.com",
  projectId: "xeno-task-8c222",
  storageBucket: "xeno-task-8c222.firebasestorage.app",
  messagingSenderId: "380931760534",
  appId: "1:380931760534:web:951916e44c8e087d5d7db7",
  measurementId: "G-VT8JVY6V9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Set session persistence
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Authentication persistence set to session.");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error.message);
  });

export { auth, googleProvider };




