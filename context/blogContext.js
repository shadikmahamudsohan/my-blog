import { createContext, useEffect, useState } from "react";

export const BlogContext = createContext();

export const BlogContextProvider = ({ children }) => {
    const [blogData, setBlogData] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('/api/get_blog')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setBlogData(data.result);
                    setLoading(false);
                } else {
                    console.log("some thing went wrong when getting this data");
                }
            });
    }, [refresh]);

    return (
        <BlogContext.Provider value={{ blogData, refresh, setRefresh, loading }}>
            {children}
        </BlogContext.Provider>
    );
};