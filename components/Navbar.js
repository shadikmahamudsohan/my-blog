import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Navbar = () => {
    // for checking the scroll of the website to change the nav bar style
    const [scrollY, setScrollY] = useState(0);
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
        <div className={` ${scrollY < 99 ? "bg-transparent" : "bg-white fadeIn"} z-50  h-24 flex items-center w-full fixed top-0`}>
            <div className='mx-auto' style={{ width: "1200px" }}>
                <Link href={`/`}>
                    <h1 className='text-4xl italic font-bold'>TITLE</h1>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;