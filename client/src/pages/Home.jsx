import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Item from '../components/Item';
import { FaChevronDown } from 'react-icons/fa';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [menuPostId, setMenuPostId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:8000/posts/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('content', newPostContent);
    if (newPostImage) {
      formData.append('image', newPostImage);
    }

    fetch('http://localhost:8000/posts/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to create post');
        return res.json();
      })
      .then((data) => {
        setPosts([data, ...posts]);
        setShowModal(false);
        setNewPostContent('');
        setNewPostImage(null);
      })
      .catch((err) => console.error('Failed to create post:', err));
  };

  const handleEdit = (post) => {
    navigate(`/edit/${post.id}`, { state: { post } });
  };

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const token = localStorage.getItem('token');
      fetch(`http://localhost:8000/posts/${postId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setPosts(posts.filter(post => post.id !== postId));
          } else {
            throw new Error('Failed to delete post');
          }
        })
        .catch((error) => {
          console.error('Error deleting post:', error);
          alert('Failed to delete post');
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8 pb-24">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          My Book
        </h1>

        <div className="mb-8">
          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-left text-sm shadow-sm"
          >
            What's on your mind?
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 text-xl font-bold"
              >
                ×
              </button>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Create Post
              </h2>
              <form onSubmit={handleSubmit}>
                <textarea
                  rows="4"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  placeholder="What's on your mind?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  required
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewPostImage(e.target.files[0])}
                  className="mb-4 text-gray-600 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-200 dark:file:bg-gray-600 file:text-gray-800 dark:file:text-gray-100 hover:file:bg-gray-300 dark:hover:file:bg-gray-500"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-500 font-semibold py-2 px-6 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {posts.map((post) => {
            const isOwner = user && user.username === post.user.username;
            return (
              <div key={post.id} className="relative w-full">
                {isOwner && (
                  <>
                    <button
                      onClick={() => setMenuPostId(menuPostId === post.id ? null : post.id)}
                      className="absolute top-4 right-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-200 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 rounded-full p-2.5 z-30"
                    >
                      <FaChevronDown size={16} />
                    </button>
                    {menuPostId === post.id && (
                      <div className="absolute right-4 top-12 mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl z-40 w-44">
                        <button
                          onClick={() => handleEdit(post)}
                          className="block w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="block w-full text-left px-4 py-2.5 text-sm font-medium text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-red-600 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
                <Item post={post} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}