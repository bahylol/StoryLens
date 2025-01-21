import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from '../components/Blog.jsx';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND}/getAllBlogs`)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto mt-0 grid max-w-2xl grid-cols-1 gap-x-4 gap-y-8 border-t-0 pt-10 sm:mt-0 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.map((post) => (
          <Blog key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
