import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import FormCreator from '../components/FormCreator';
import formStyleEdit from '../formTemplates/formStyleEdit.json';
import formTemplate from '../formTemplates/formTemplate.json';

function EditBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/blog/${id}`);
        console.log(response.data)
        setBlog(response.data);
      } catch (error) {
        console.log('Error fetching blog data:', error);
      }
    }

    fetchBlog();
  }, [id]);

  const editBlog = async (data) => {
    try {

      const response = await axios.put(`${process.env.REACT_APP_BACKEND}/updateBlog`, data);

      setTimeout(() => {
        navigate(`/blog/${response.data._id}`)
      }, 3000);

      toast.success('Blog Updated Successfully');

    } catch (error) {
      toast.error("Error Updating blog");
      console.error('Error Updating blog:', error);
    }
  }

  if (!blog) {
    return <div>Loading...</div>; // Show loading message or spinner while fetching data
  }

  return (
    <>
      <div><Toaster /></div>

      <div className="flex items-center justify-center bg-gradient-to-b from-blue-200 to-gray-200">
        <div className="m-8">
          <FormCreator
            formTemplate={formTemplate}
            formStyle={formStyleEdit}
            initialData={blog}
            onSubmit={editBlog}
          />
        </div>
      </div>
    </>
  );
}

export default EditBlog;
