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
                <div style={{ position: 'relative', width: '100%' }}>
                    <div style={{ aspectRatio: '16/9' }}>
                        <Image src={`/images/${blogData?.imageName}`} alt="name" layout="fill" objectFit="cover" />
                    </div>
                </div>
                <p className="text-lg my-10">
                    {blogData?.description}
                    একটা সময়ের প্রান্তিক গ্রামে, যেখানে একটি ঘন জঙ্গলে মোড়ানো একটি কিশোরী লিলি নামের। তার আপাততার জন্য অসংখ্য জিজ্ঞাসা ও অভিজ্ঞতা উদ্বেলিত। লিলির দিনগুলি বিচরণ করে তার গ্রামটিকে ঘিরে বস্তবের মধ্যে গোপন রয়েছে ময়ূরকণা উদ্যান আবিষ্কারের খোঁজে।

                    একটি উজ্জ্বল সূর্যের সকালে, লিলি আরো দূরে চলে যাওয়ার সময় একটি প্রাচীন, গেঁথা পথের কাছে পড়ে। কৌতুহলে ভরা, তিনিই তাকে অনুসরণ করল। পথটি তাকে একটি অতীতস্থ বটের দিকে নেয়। বিস্মিত হয়ে লিলি, তার হাতটি কম্পিত করে দিল। সম্পূর্ণ আদিম একটি দরজা খুলে দিল, যা বটের নীচে আছে। টেনে দিলো লিলি।
                </p>
                <Comment id={id} />
            </div>
        </>
    );
};

export default Blog;