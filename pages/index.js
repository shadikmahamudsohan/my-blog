import { BlogContext } from '@/context/blogContext';
import Image from 'next/image';
import city from "../public/city.jpg";
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Cards from '@/components/Cards';

const Home = () => {
  const { blogData, loading } = useContext(BlogContext);

  return (
    <main>
      {/* small banner image */}
      <div className='w-full'>
        <Image className='w-full h-24 object-cover' src={city} alt="banner" />
      </div>
      <Navbar />
      <div className='mx-auto my-10 ' style={{ maxWidth: "1200px" }}>
        <Cards blogData={blogData} loading={loading} />
      </div>
    </main>
  );
};

export default Home;