import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewBlog from './pages/NewBlog';
import Drafts from './pages/Drafts';
import BlogDetails from './pages/BlogDetails';
import EditBlog from './pages/EditBlog';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newBlog" element={<NewBlog />} />
          <Route path="/drafts" element={<Drafts />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/editBlog/:id" element={<EditBlog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
