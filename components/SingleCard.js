import { BlogContext } from '@/context/blogContext';
import Image from 'next/image';
import React, { useContext } from 'react';

const SingleCard = ({ data }) => {
    const { refresh, setRefresh } = useContext(BlogContext);

    const handleDelete = () => {
        fetch(`/api/delete_blog/${data._id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setRefresh(refresh + 1);
                }
            });
    };
    return (
        <div className="blog-card fadeIn">
            <div style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '56.25%' }}>
                <Image src={`/images/${data.imageName}`} alt="name" layout="fill" objectFit="cover" />
            </div>
            <p className="text-lg">
                {data.description}
            </p>
            <button className='p-3 bg-red-500 text-white' onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default SingleCard;