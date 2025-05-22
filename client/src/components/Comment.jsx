import React from 'react';

const Comment = ({ comments }) => {
    return (
        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {comments && comments.length > 0 ? (
                <ul className="space-y-3">
                    {comments.map((comment) => (
                        <li
                            key={comment.id}
                            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-600"
                        >
                            <p className="text-gray-800 dark:text-gray-100 text-sm leading-relaxed">
                                <span className="font-semibold text-gray-900 dark:text-gray-50">
                                    {comment.user.username}:
                                </span>{' '}
                                {comment.content}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 italic">
                                {new Date(comment.created_at).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                })}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm italic text-center">
                    No comments yet. Be the first to comment!
                </p>
            )}
        </div>
    );
};

export default Comment;