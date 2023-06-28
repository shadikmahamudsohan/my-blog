import { BlogContext } from '@/context/blogContext';
import Image from 'next/image';
import React, { useContext } from 'react';
import Link from "next/link";
import { UserContext } from '@/context/userContext';

const SingleCard = ({ data }) => {
    const { refresh, setRefresh } = useContext(BlogContext);
    const { userData } = useContext(UserContext);

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
        <div className="blog-card fadeIn shadow-lg rounded-lg overflow-hidden">
            <Link href={`/blog/${data._id}`}>
                <div style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '56.25%' }}>
                    <Image src={`/images/${data.imageName}`} alt="name" layout="fill" objectFit="cover" />
                </div>
            </Link>
            <div className="p-4">
                <p className="text-lg font-semibold">{data.title}</p>
                <div className="flex justify-between items-end mt-2">
                    {userData.role === "admin" &&
                        <button className="px-2 py-1 rounded shadow bg-red-500 text-white" onClick={handleDelete}>Delete</button>}
                    <p className="text-sm text-gray-500">{new Date(data.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </div>



    );
};

export default SingleCard;