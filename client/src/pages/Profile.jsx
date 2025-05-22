import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Item from '../components/Item';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(storedUser);

    if (!token) {
      setError('No token found');
      return;
    }

    fetch(`http://localhost:8000/posts/?username=${storedUser.username}`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch posts');
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message));
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center ">
        <p className="text-lg font-medium text-red-500 dark:text-red-400">
          Error: {error}
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600 dark:text-gray-300 animate-pulse">
          Loading user...
        </p>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
          No posts found.
        </p>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8 p-4 pb-24">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          {user.username}'s Profile
        </h1>
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="w-full">
              <Item post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}