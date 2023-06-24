import React from 'react';

const Navbar = ({ scrollY }) => {
    return (
        <div className={` ${scrollY < 99 ? "bg-transparent" : "bg-white fadeIn"} z-50  h-24 flex items-center w-full fixed top-0`}>
            <div className='mx-auto' style={{ width: "1200px" }}>
                <h1 className='text-4xl italic font-bold'>TITLE</h1>
            </div>
        </div>
    );
};

export default Navbar;