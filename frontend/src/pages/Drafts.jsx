import React from "react";
import BlogsDisplay from "../components/BlogsDisplay";

const Drafts = () => {
  return (
    <BlogsDisplay draft={true} />
  );
};

export default Drafts;
