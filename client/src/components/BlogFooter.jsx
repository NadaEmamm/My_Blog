import React from 'react';
import { FaRegHeart, FaRegComment, FaShare } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function PostFooter({ postId }) {
  return (
    <div className="flex justify-around items-center border-t pt-3">
      <button className="text-red-500 hover:text-red-600" title="Like">
        <FaRegHeart size={20} />
      </button>

      <Link to={`/post/${postId}`} className="text-blue-500 hover:text-blue-600" title="Comments">
        <FaRegComment size={20} />
      </Link>

      <button className="text-green-500 hover:text-green-600" title="Share">
        <FaShare size={20} />
      </button>
    </div>
  );
}
