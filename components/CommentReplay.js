import React from 'react';

const CommentReplay = ({ handleSubmit, focusedField, handleBlur, email, comment, handleFocus, setComment, setEmail, setName, name }) => {
    return (
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
                    style={{ background: "#F5F5F5" }}
                    className='outline-none border-b border-gray-400 focus:border-black py-3'
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
                    style={{ background: "#F5F5F5" }}
                    className='outline-none border-b border-gray-400 focus:border-black py-3'
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
                    style={{ background: "#F5F5F5" }}
                    rows={4}
                    className="outline-none border-b border-gray-400 focus:border-black py-3 focus:text-black"
                    onFocus={() => handleFocus('comment')}
                    onBlur={handleBlur}
                    required
                />
            </div>
            <button type="submit" className="outline-none border-b text-gray-500 border-gray-400 hover:border-black  hover:text-black">Submit</button>
        </form>
    );
};

export default CommentReplay;