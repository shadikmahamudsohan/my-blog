import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_REACT_APP_apiKey,
//     authDomain: process.env.NEXT_PUBLIC_REACT_APP_authDomain,
//     projectId: process.env.NEXT_PUBLIC_REACT_APP_projectId,
//     storageBucket: process.env.NEXT_PUBLIC_REACT_APP_storageBucket,
//     messagingSenderId: process.env.NEXT_PUBLIC_REACT_APP_messagingSenderId,
//     appId: process.env.NEXT_PUBLIC_REACT_APP_appId,
//     measurementId: process.env.NEXT_PUBLIC_REACT_APP_measurementId,
// };

const firebaseConfig = {
    apiKey: "AIzaSyCfGKmWCPP2fg68JTSK0zTAO_yFgxFOAdU",
    authDomain: "daily-blog-f0b64.firebaseapp.com",
    projectId: "daily-blog-f0b64",
    storageBucket: "daily-blog-f0b64.appspot.com",
    messagingSenderId: "438735745251",
    appId: "1:438735745251:web:740aeeb8120335d83095d6",
    measurementId: "G-VEBSQBE0WF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
