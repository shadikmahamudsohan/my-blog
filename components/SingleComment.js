import React from 'react';
import avatar from '../public/avatar/avatar1.jpg';
import Image from 'next/image';
const SingleComment = ({ data, userData, handleStatusUpdate }) => {
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
            {userData.role === "admin" &&
                data.status === "waiting" &&
                <div>
                    <button
                        onClick={() => handleStatusUpdate("approved", data._id)}
                        className="bg-green-500 px-3 rounded shadow mb-5 text-white py-2 mr-5">approved</button>
                    <button
                        onClick={() => handleStatusUpdate("declined", data._id)}
                        className="bg-red-500 px-3 rounded shadow mb-5 text-white py-2 mr-5">declined</button>
                </div>
            }
            {userData.role === "admin" && <small>{data.status}</small>}
            <div className='line'></div>
        </div>
    );
};

export default SingleComment;