import React from 'react';
import { useParams } from 'react-router-dom';

function BlogDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Blog Details</h1>
      <p>Displaying details for blog ID: {id}</p>
    </div>
  );
}

export default BlogDetails;
