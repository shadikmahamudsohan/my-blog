import Image from 'next/image';
import React from 'react';

const Banner = () => {
    return (
        <div className='grid gap-5 grid-cols-1 md:grid-cols-2'>
            <div style={{ width: "100%", }}>
                <h1 className='text1'>Hello, I am a Shadik</h1>
                <h2 className='text2'>welcome to my blog</h2>
                <p className='text3'>Do not miss out on the latest news about Travel tips, Hotels review, Food guide...</p>
                <div className='subscribe-container'>
                    <div className='flex justify-between items-center'>
                        <input type="text" className='sub-input' placeholder='Enter your email address' />
                        <button className='sub-button'>subscribe</button>
                    </div>
                </div>
            </div>
            <div style={{ position: 'relative', width: '100%', height: "1100px", marginTop: "-140px" }}>
                <Image src={`/images/shadikmahamudimage-transformed.png`} alt="image" layout="fill" objectFit="cover" />
            </div>
        </div>
    );
};

export default Banner;