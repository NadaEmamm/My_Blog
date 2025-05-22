import BlogFooter from './BlogFooter';

export default function Item({ post }) {


  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl relative">
  
      {post.image && (
        <div className="relative">
          <img
            src={post.image}
            alt={post.title || 'Post image'}
            className="w-full max-h-64 object-contain rounded-t-xl bg-gray-100 dark:bg-gray-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-xl" />
        </div>
      )}
      <div className="px-6 py-5">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
          {post.content}
        </h2>

        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
          Created by: <span className="font-medium">{post.user.username}</span>
        </p>
      </div>
      <div className="px-6 pb-5">
        <BlogFooter postId={post.id} />
      </div>
    </div>
  );
}