import Cards from '@/components/Cards';
import Navbar from '@/components/Navbar';
import { BlogContext } from '@/context/blogContext';
import createBlogImageHook from '@/hooks/createBlogImageHook';
import React, { useContext, useState } from 'react';

const Create = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageData, setImageData] = useState("");
    const [uploading, setUploading] = useState(false);
    const { blogData, refresh, setRefresh, loading } = useContext(BlogContext);
    const handleSubmit = async () => {
        setUploading(true);
        const imageName = `${imageData[0].name.split(".")[0]}.${imageData[0].name.split(".")[1]}`;
        if (imageData) {
            await createBlogImageHook(imageData, title);
            fetch('/api/post_blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                },
                body: JSON.stringify({ title, description, imageName }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setRefresh(refresh + 1);
                        setUploading(false);
                    } else {
                        console.log("some thing went wrong when creating this data");
                    }
                });
        }
    };
    return (
        <>
            <Navbar />
            <div className='mx-auto mt-10 ' style={{ maxWidth: "1200px" }}>
                <div className='w-fit mx-auto'>
                    <div className="relative bg-gray-100 border-dashed border-2 border-blue-500 p-4 w-96">
                        <input
                            type="file"
                            name="image"
                            onChange={(e) => setImageData(e.target.files)}
                            className="absolute inset-0 w-full h-full opacity-0"
                        />
                        <div className="text-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mx-auto h-12 w-12 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 2C5.03 2 1 6.03 1 11c0 4.97 4.03 9 9 9s9-4.03 9-9c0-4.97-4.03-9-9-9zm0 2a7 7 0 00-7 7c0 3.866 3.134 7 7 7s7-3.134 7-7a7 7 0 00-7-7zm0 1.4a5.6 5.6 0 100 11.2 5.6 5.6 0 000-11.2zM9 5a1 1 0 10-2 0v3H4a1 1 0 100 2h3v3a1 1 0 102 0V10h3a1 1 0 100-2H10V5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p className="mt-1 text-sm text-gray-600">
                                <span className="font-medium text-blue-500">Upload</span> an image
                            </p>
                        </div>
                    </div>

                    <input
                        onChange={(e) => { setTitle(e.target.value); }}
                        type="text"
                        className="p-2 border-blue-500 border w-96 bg-gray-100 focus:bg-white"
                        placeholder="type here"
                    />
                    <br />
                    <textarea
                        onChange={(e) => { setDescription(e.target.value); }}
                        type="text"
                        className="p-2 border-blue-500 border w-96 bg-gray-100 focus:bg-white"
                        placeholder="type here"
                    />
                    <br />
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="bg-blue-500 rounded text-white p-2"
                        disabled={uploading}
                    >
                        Submit
                    </button>
                </div>


                <br /><br />
                <Cards blogData={blogData} loading={loading} />
            </div>
        </>

    );
};

export default Create;