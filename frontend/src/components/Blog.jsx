import React from 'react';

const Blog = ({ posts }) => {
  return (
    <div className="mx-auto mt-0 grid max-w-2xl grid-cols-1 gap-x-4 gap-y-8 border-t-0 pt-10 sm:mt-0 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {posts.map((post) => (
        <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
          <div className="group relative">
            <h3 className="mt-0 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600 flex items-center">
              <a href={"/blog/" + post._id} className="flex items-center">
                <span className="absolute inset-0" />
                {post.title}
              </a>
              <span className="text-xs text-gray-500 ml-auto">
                {new Date(post.date).toLocaleDateString()}
              </span>
            </h3>
            <div className="flex items-center justify-between text-xs mt-2">
              <div className="flex flex-wrap gap-x-2">
                {post.category.map((cat, index) => (
                  <span
                    key={index}
                    className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-2 text-sm/6 text-gray-600">{post.summary}</p>
          </div>
          <div className="mt-4 w-full">
            <img
              alt=""
              src={post.imagelink}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        </article>
      ))}
    </div>
  );
};

export default Blog;
