import { BlogContext } from '@/context/blogContext';
import createBlogHook from '@/hooks/createBlogHook';
import Image from 'next/image';
import city from "../public/city.jpg";
import React, { useContext, useEffect, useState } from 'react';
import createBlogImageHook from '@/hooks/createBlogImageHook';

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
      <div className={` ${scrollY < 99 ? "bg-transparent" : "bg-white"}  h-24 flex items-center w-full fixed top-0`}>
        <div className='mx-auto' style={{ width: "1200px" }}>
          <h1 className='text-4xl italic font-bold'>TITLE</h1>
        </div>
      </div>
      {/* body */}
      <div className='mx-auto mt-5' style={{ minWidth: "1200px" }}>
        <input type="file"
          name="image"
          placeholder='your image'
          onChange={(e) => setImageData(e.target.files)}
        />
        <input onChange={(e) => { setText(e.target.value); }} type="text" className='p-2 w-96 border-blue-500 border' placeholder='type here' />
        <button onClick={handleSubmit} type='submit' className='bg-blue-500 rounded text-white p-2'>Submit</button>
        <br /><br />
        <div className='grid grid-rows-4 grid-flow-col gap-4'>
          {!loading ? blogData?.map(data => (
            <div key={data._id} className='border w-fit mx-auto border-black p-3 mb-5'>
              <Image src={`/images/${data.imageName}`} alt="name" width={500} height={300} />
              <p className='text-lg'>
                {data.description}
              </p>
            </div>
          )) : "loading..."}
        </div>
      </div>
    </main>
  );
};

export default Home;

// todo: publish it in github and hide the user name and password in env.local. fix the vercel problem of not getting the user name and password form the env.local