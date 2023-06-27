import auth from '@/firebase.init';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

const Login = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    if (user) {
        console.log(user);
    }
    useEffect(() => {
        if (user) {
            fetch('/api/post_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.user.email }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        window.localStorage.setItem("token", JSON.stringify(data.token));
                    } else {
                        console.log("some thing went wrong when creating this data");
                    }
                });
        }
    }, [user]);
    // if (error) {
    //     console.log(error.message);
    // }
    return (
        <div className='w-full min-h-screen flex justify-center items-center'>
            <button className='px-5 py-3 bg-blue-600 text-white active:bg-blue-900'
                onClick={() => { signInWithGoogle(); }}
            >Login with Google</button>
            {(loading || error) && <p className='text-xl mt-10'>{loading && "Loading..." || error && error.message}</p>}
        </div>
    );
};

export default Login;