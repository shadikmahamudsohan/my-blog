import { BlogContext } from '@/context/blogContext';
import createBlogHook from '@/hooks/createBlogHook';
import Image from 'next/image';
import city from "../public/city.jpg";
import React, { useContext, useEffect, useState } from 'react';
import createBlogImageHook from '@/hooks/createBlogImageHook';
import SingleCard from '@/components/SingleCard';
import Navbar from '@/components/Navbar';
import Cards from '@/components/Cards';

const Home = () => {
  const [text, setText] = useState("");
  const [imageData, setImageData] = useState("");
  const { blogData, refresh, setRefresh, loading } = useContext(BlogContext);

  const handleSubmit = async () => {
    const imageName = `${imageData[0].name.split(".")[0]}.${imageData[0].name.split(".")[1]}`;
    // createBlogHook(text, refresh, setRefresh, imageName);
    if (imageData) {
      await createBlogImageHook(imageData, text);
      fetch('/api/post_blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: text, imageName }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setRefresh(refresh + 1);
          } else {
            console.log("some thing went wrong when creating this data");
          }
        });
    }
  };

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
    <main>
      {/* small banner image */}
      <div className='w-full'>
        <Image className='w-full h-24 object-cover' src={city} alt="banner" />
      </div>
      {/* navbar */}
      <Navbar scrollY={scrollY} />
      {/* body */}
      <div className='mx-auto mt-5 ' style={{ maxWidth: "1200px" }}>
        <input type="file"
          name="image"
          placeholder='your image'
          onChange={(e) => setImageData(e.target.files)}
        />
        <input onChange={(e) => { setText(e.target.value); }} type="text" className='p-2 w-96 border-blue-500 border' placeholder='type here' />
        <button onClick={handleSubmit} type='submit' className='bg-blue-500 rounded text-white p-2'>Submit</button>
        <br /><br />
        <Cards blogData={blogData} loading={loading} />

      </div>
    </main>
  );
};

export default Home;