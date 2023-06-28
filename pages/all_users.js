import Navbar from '@/components/Navbar';
import { UserContext } from '@/context/userContext';
import React, { useContext, useEffect, useState } from 'react';

const Users = () => {
    const [usersData, setUsersData] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loadingUser, setLoadingUser] = useState(false);
    const [error, setError] = useState("");
    const { userData, loading } = useContext(UserContext);
    console.log(userData);
    useEffect(() => {
        setLoadingUser(true);
        fetch('/api/get_user', {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUsersData(data.result);
                    setLoadingUser(false);
                } else {
                    console.log("some thing went wrong when getting this data");
                    setError("some thing went wrong when getting this data");
                }
            });
    }, [refresh]);
    if (error) {
        return <p>{error}</p>;
    }
    if (loadingUser || loading) {
        return <p>Loading...</p>;
    }
    const handleUserRole = (role, email) => {
        setLoadingUser(true);

        fetch('/api/update_user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
            body: JSON.stringify({ role, email }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setLoadingUser(false);
                    setRefresh(refresh + 1);
                } else {
                    console.log("some thing went wrong when updating this data");
                }
            });
    };
    return (
        <>
            <Navbar />
            <div style={{ maxWidth: "1200px" }} className='mx-auto my-24'>
                {error && <p className='text-red-500 text-lg font-bold'>{error}</p>}
                <h1 className='my-10 text-5xl font-bold text-center'>All users</h1>
                {usersData?.map(data => (
                    <div key={data._id} className='py-5 border-b-2 border-blue-600 flex justify-between items-center'>
                        <p className='text-lg'>{data.email}</p>
                        <p className='text-lg font-bold'>{data.role}</p>
                        {userData.email === data.email && <p className='text-lg font-bold'>Me</p>}
                        <button className="py-2 px-3 ml-5 bg-red-600 text-white rounded shadow"
                            onClick={() => handleUserRole(data.role === "admin" ? "user" : "admin", data.email)}
                            disabled={userData.email === data.email}
                        >{data.role === "admin" ? "user" : "admin"}</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Users;