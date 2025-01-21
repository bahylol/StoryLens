import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Blog from "../components/Blog.jsx";

const BlogsDisplay = ({ backendUrl, draft, categories }) => {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchBlogs = useCallback((category) => {
    let url = `${backendUrl}/getAllBlogs?draft=${draft}`;

    if (category && category !== "All") {
      url += `&category=${category}`;
    }

    axios
      .get(url)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [backendUrl, draft]);

  useEffect(() => {
    fetchBlogs(selectedCategory);
  }, [selectedCategory, fetchBlogs]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="relative mt-4 bg-white rounded-full shadow-lg flex justify-between items-center px-6 py-3 w-[100%] mx-auto shadow-md shadow-gray-400/50">
        <span className="text-lg font-semibold text-gray-700">Category:</span>
        <div className="flex flex-wrap space-x-4 gap-y-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-6 py-3 rounded-full shadow-md transition ${selectedCategory === category
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-0 grid max-w-2xl grid-cols-1 gap-x-4 gap-y-8 border-t-0 pt-10 sm:mt-0 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.map((post) => (
          <Blog key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

BlogsDisplay.defaultProps = {
  backendUrl: process.env.REACT_APP_BACKEND,
  draft: false,
  categories: ["AI", "Healthcare", "Technology", "Business", "All"],
};

export default BlogsDisplay;
