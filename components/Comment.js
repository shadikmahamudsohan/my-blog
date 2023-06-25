import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';

const Comment = ({ id }) => {
    const [comment, setComment] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [focusedField, setFocusedField] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [commentData, setCommentData] = useState([]);
    const [commentLoading, setCommentLoading] = useState(false);
    const handleFocus = (field) => {
        setFocusedField(field);
    };

    const handleBlur = () => {
        setFocusedField(null);
    };

    // submitting comment to server
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/post_comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment, name, email, blogId: id }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setRefresh(refresh + 1);
                } else {
                    console.log("some thing went wrong when creating this data");
                }
            });
    };

    // getting the comments

    useEffect(() => {
        setCommentLoading(true);
        fetch(`/api/get_comment/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setCommentData(data.result);
                    setCommentLoading(false);
                }
            });
    }, [id, refresh]);

    return (
        <div className='mb-40'>
            <h1 className='text-2xl font-bold mb-10'>comments</h1>
            {commentLoading ? "loading..." :
                commentData?.map(data => (
                    <SingleComment key={data._id} data={data} />
                ))
            }

            <h1 className='text-2xl font-bold my-10'>live a reply</h1>

            <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
                <div className='flex flex-col mb-5'>
                    <label htmlFor="name" className={focusedField === 'name' ? 'text-black' : 'text-gray-500'}>
                        Your Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className='outline-none border-b border-gray-200 focus:border-black py-3'
                        onFocus={() => handleFocus('name')}
                        onBlur={handleBlur}
                        required
                    />
                </div>
                <div className='flex flex-col mb-5'>
                    <label htmlFor="email" className={focusedField === 'email' ? 'text-black' : 'text-gray-500'}>
                        Your Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className='outline-none border-b border-gray-200 focus:border-black py-3'
                        onFocus={() => handleFocus('email')}
                        onBlur={handleBlur}
                        required
                    />
                </div>
                <div className="flex flex-col mb-5">
                    <label htmlFor="comment" className={focusedField === 'comment' ? 'text-black' : 'text-gray-500'}>
                        Message:
                    </label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Enter your comment"
                        rows={4}
                        className="outline-none border-b border-gray-200 focus:border-black py-3 focus:text-black"
                        onFocus={() => handleFocus('comment')}
                        onBlur={handleBlur}
                        required
                    />
                </div>
                <button type="submit" className="outline-none border-b text-gray-500 border-gray-200 hover:border-black  hover:text-black">Submit</button>
            </form>
        </div>
    );
};

export default Comment;
