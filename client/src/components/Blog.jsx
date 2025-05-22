import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Comment from '../components/Comment';
import Item from '../components/Item';

export default function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        fetch(`http://localhost:8000/posts/${id}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch post');
                return res.json();
            })
            .then((data) => {
                setPost(data);
                setComments(data.comments);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id, navigate]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const content = e.target.content.value;

        fetch(`http://localhost:8000/posts/${id}/comments/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({ content }),
        })
            .then((res) => {
                if (!res.ok) throw new Error('Failed to add comment');
                return res.json();
            })
            .then((data) => {
                setComments([...comments, data]);
                e.target.reset();
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <p className="text-lg font-medium text-gray-600 dark:text-gray-300 animate-pulse">
                    Loading...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <p className="text-lg font-medium text-red-500 dark:text-red-400">
                    Error: {error}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
                    <Item post={post} />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-24">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        Comments
                    </h2>
                    <Comment comments={comments} />
                    <form onSubmit={handleCommentSubmit} className="mt-6">
                        <div className="mb-4">
                            <label
                                htmlFor="comment"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                            >
                                Add a comment
                            </label>
                            <textarea
                                id="comment"
                                name="content"
                                rows="4"
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                placeholder="Write your comment here..."
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}