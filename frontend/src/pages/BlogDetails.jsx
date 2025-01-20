import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { EditIcon, DeleteIcon, DraftIcon, UploadIcon } from '../utils/icons';

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.log('Error fetching blog data:', error);
      }
    }

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div className="flex justify-center items-center h-screen text-xl text-gray-500">Loading...</div>;
  }

  const deleteBlog = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND}/deleteBlog`, { data: { _id: id } });

      setTimeout(() => {
        navigate(`/`)
      }, 3000);

      toast.success('Blog successfully deleted');
    } catch (error) {
      toast.error("Error deleting blog");
      console.error('Error deleting blog:', error);
    }
  };

  const changeStatus = async (status) => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND}/updateBlog`, { _id: id, draft: status });

      setTimeout(() => {
        window.location.reload();
      }, 3000);

      if (status === true) {
        toast.success('Blog status updated to Draft');
      }
      else {
        toast.success('Blog status updated to Published');
      }
    } catch (error) {
      toast.error("Error updating blog status");
      console.error('Error updating blog status:', error);
    }
  }

  return (
    <>
      <div><Toaster /></div>

      <div>
        <section
          className="relative w-full h-80 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url(${blog.imagelink})` }}
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 flex items-end justify-between h-full px-6 pb-4">
            <h1 className="text-4xl font-semibold text-black bg-gray-200 bg-opacity-50 rounded-full p-4 shadow-md text-center">
              {blog.title}
            </h1>
            <p className="text-white text-lg bg-black bg-opacity-25 rounded-full p-2">
              {new Date(blog.date).toLocaleDateString()}
            </p>
          </div>
        </section>

        <div className="flex items-center justify-center">
          <div className="p-6 rounded-lg shadow-lg mt-6 bg-gradient-to-b from-gray-100 to-blue-100 min-h-screen min-w-[90vw] max-w-[95vw]">
            <div
              dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>

        <div className="relative mt-6 bg-white rounded-full shadow-lg flex justify-between items-center px-6 py-3 w-[90%] max-w-[500px] mx-auto shadow-md shadow-gray-400/50">
          <span className="text-lg font-semibold text-gray-700">Admin Controls:</span>
          <div className="flex space-x-4">
            {blog.draft === true ? (
              <button className="px-6 py-3 bg-yellow-500 text-white rounded-full shadow-md hover:bg-yellow-600 focus:outline-none transition"
                onClick={() => changeStatus(false)}>
                <UploadIcon color="#fff" />
              </button>
            ) : (
              <button className="px-6 py-3 bg-yellow-500 text-white rounded-full shadow-md hover:bg-yellow-600 focus:outline-none transition"
                onClick={() => changeStatus(true)}>
                <DraftIcon />
              </button>
            )}
            <button className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none transition"
              onClick={() => { navigate(`/editBlog/${id}`) }}>
              <EditIcon />
            </button>
            <button className="px-6 py-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none transition"
              onClick={deleteBlog}>
              <DeleteIcon />
            </button>
          </div>
        </div>

      </div>
    </>
  );
}

export default BlogDetails;
