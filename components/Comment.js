import React, { useContext, useEffect, useState } from 'react';
import SingleComment from './SingleComment';
import { UserContext } from '@/context/userContext';
import CommentReplay from './CommentReplay';

const Comment = ({ id }) => {
    const [comment, setComment] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [focusedField, setFocusedField] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [commentData, setCommentData] = useState([]);
    const [commentLoading, setCommentLoading] = useState(false);
    const { userData, loading } = useContext(UserContext);
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

    const handleStatusUpdate = (status, id) => {
        setCommentLoading(true);
        fetch(`/api/update_comment/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
            body: JSON.stringify({ status }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setRefresh(refresh + 1);
                    setCommentLoading(false);
                } else {
                    console.log("some thing went wrong when updating this data");
                }
            });
    };

    return (
        <div className='mb-40'>
            <h1 className='text-2xl font-bold mb-10'>comments</h1>
            {commentLoading || loading ? "loading..." :
                userData.role === "admin" ?
                    commentData?.map(data => (
                        <SingleComment key={data._id} data={data} userData={userData} handleStatusUpdate={handleStatusUpdate} />
                    ))
                    : commentData?.map(data => (
                        <>
                            {data.status !== "approved" &&
                                < SingleComment key={data._id} data={data} userData={userData} handleStatusUpdate={handleStatusUpdate} />}
                        </>
                    ))
            }

            <h1 className='text-2xl font-bold my-10'>live a reply</h1>
            <CommentReplay
                handleSubmit={handleSubmit}
                focusedField={focusedField}
                handleBlur={handleBlur}
                email={email}
                comment={comment}
                handleFocus={handleFocus}
                setComment={setComment}
                setEmail={setEmail}
                setName={setName}
                name={name}
            />

        </div>
    );
};

export default Comment;
