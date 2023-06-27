import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('/api/get_my_info', {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUserData(data.result);
                    setLoading(false);
                } else {
                    console.log("some thing went wrong when getting this data");
                }
            });
    }, [refresh]);

    return (
        <UserContext.Provider value={{ userData, refresh, setRefresh, loading }}>
            {children}
        </UserContext.Provider>
    );
};