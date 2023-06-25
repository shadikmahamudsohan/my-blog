import React from 'react';
import avatar from '../public/avatar/avatar1.jpg';
import Image from 'next/image';
const SingleComment = ({ data }) => {
    return (
        <div className='mb-5'>
            <div className='flex items-start mb-5'>
                <div className='avatar'>
                    <Image src={avatar} alt="avatar" layout="fill" objectFit="cover" />
                </div>
                <div>
                    <p className='text-lg font-bold mb-3'>{data.name}</p>
                    <p >{data.comment}</p>
                </div>
            </div>
            <div className='line'></div>
        </div>
    );
};

export default SingleComment;