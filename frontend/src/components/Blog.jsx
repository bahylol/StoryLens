import React from 'react';

const Blog = ({ posts }) => {
  return (
    <div className="mx-auto mt-0 grid max-w-2xl grid-cols-1 gap-x-4 gap-y-16 border-t-0 pt-10 sm:mt-0 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {posts.map((post) => (
        <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
          <div className="group relative">
            <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
              <a href={"/blog/" + post._id}>
                <span className="absolute inset-0" />
                {post.title}
              </a>
              <div className="flex items-center justify-between text-xs mt-4">
                <span className="text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </span>
                {/* {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-x-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )} */}
              </div>
            </h3>
            <p className="mt-2 line-clamp-3 text-sm/6 text-gray-600">{post.summary}</p>
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
