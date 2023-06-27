import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_REACT_APP_apiKey,
    authDomain: process.env.NEXT_PUBLIC_REACT_APP_authDomain,
    projectId: process.env.NEXT_PUBLIC_REACT_APP_projectId,
    storageBucket: process.env.NEXT_PUBLIC_REACT_APP_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_REACT_APP_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_REACT_APP_appId,
    measurementId: process.env.NEXT_PUBLIC_REACT_APP_measurementId,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
