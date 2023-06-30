import { UserContext } from '@/context/userContext';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

const Navbar = () => {
    // for checking the scroll of the website to change the nav bar style
    const [scrollY, setScrollY] = useState(0);
    const { userData } = useContext(UserContext);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className={` ${scrollY < 50 ? "bg-transparent " : "nav-container fadeIn"} sticky top-0`}>
            <div className='mx-auto' style={{ width: "1200px" }}>
                <div className='flex justify-between items-center h-[100px] nav-details'>
                    <Link href={`/`}>
                        <h1 className='text-4xl italic font-bold'>TITLE</h1>
                    </Link>
                    <div className='flex justify-end'>
                        {userData?.role === "admin" && <>
                            <Link href={`/create_blog`}>
                                <h1 className='font-bold ml-5'>Create Blog</h1>
                            </Link>
                            <Link href={`/all_users`}>
                                <h1 className='font-bold ml-5'>All users</h1>
                            </Link>
                        </>}
                        <Link href={`/`}>
                            <h1 className='font-bold ml-5'>Go Black Home</h1>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;