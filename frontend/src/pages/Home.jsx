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
        <Blog posts={posts} />
      </div>
  );
};

export default Home;
