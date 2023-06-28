import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Comment from '@/components/Comment';

const Blog = () => {
    const router = useRouter();
    const { id } = router.query;
    const [blogData, setBlogData] = useState({});
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(0);

    // getting the single blog data with I clicked from single card
    useEffect(() => {
        setLoading(true);
        fetch(`/api/get_single_blog/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setBlogData(data.result);
                    setLoading(false);
                } else {
                    console.log("some thing went wrong when getting this data");
                }
            });
    }, [id, refresh]);

    if (loading) {
        return <p>loading...</p>;
    }
    return (
        <>
            <Navbar />
            <div className='mx-auto' style={{ maxWidth: "1200px", marginTop: "100px" }}>
                <h1 className="text-3xl font-bold">
                    {blogData?.title}
                </h1>
                <p className="text-sm text-gray-500 mb-10">posted: {new Date(blogData.createdAt).toLocaleDateString()}</p>

                <div style={{ position: 'relative', width: '100%' }}>
                    <div style={{ aspectRatio: '16/9' }}>
                        <Image src={`/images/${blogData?.imageName}`} alt="name" layout="fill" objectFit="cover" />
                    </div>
                </div>

                <p className="text-lg my-10">
                    {blogData?.description}
                </p>
                <Comment id={id} />
            </div>
        </>
    );
};

export default Blog;