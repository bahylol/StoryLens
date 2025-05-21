import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Blog from "../components/Blog.jsx";
import { Toaster, toast } from 'react-hot-toast';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, } from "@dnd-kit/core";
import { arrayMove, SortableContext, rectSortingStrategy, useSortable, } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Sortable item wrapper
function SortableItem({ post }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: post._id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Blog post={post} />
    </div>
  );
}

const BlogsDisplay = ({ draft, categories }) => {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchBlogs = useCallback((category) => {
    let url = `${process.env.REACT_APP_BACKEND}/getAllBlogs?draft=${draft}`;
    if (category && category !== "All") url += `&category=${category}`;

    axios
      .get(url)
      .then((res) => {
        const sorted = res.data.sort((a, b) => (a.order || 0) - (b.order || 0));
        setPosts(sorted);
      })
      .catch(console.error);
  }, [draft]);

  useEffect(() => {
    fetchBlogs(selectedCategory);
  }, [selectedCategory, fetchBlogs]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      const oldIndex = posts.findIndex((p) => p._id === active.id);
      const newIndex = posts.findIndex((p) => p._id === over.id);
      const newOrder = arrayMove(posts, oldIndex, newIndex);
      setPosts(newOrder);

      axios
        .put(`${process.env.REACT_APP_BACKEND}/reorderBlogs`, {
          reorderedBlogs: newOrder.map((post, idx) => ({ _id: post._id, order: idx + 1 })),
        })
        .then(toast.success('Blogs order Updated Successfully'))
        .catch(console.log("Error Updating blogs order"));
    }
  };

  return (
    <>
      <div><Toaster /></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Category selector */}
        <div className="relative mt-4 bg-white rounded-full shadow-lg flex justify-between items-center px-6 py-3 w-full mx-auto shadow-md shadow-gray-400/50">
          <span className="text-lg font-semibold text-gray-700">Category:</span>
          <div className="flex flex-wrap space-x-4 gap-y-2">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-full shadow-md transition ${selectedCategory === cat
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-200 text-black hover:bg-gray-300"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* DnD Kit Context */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={posts.map((p) => p._id)} strategy={rectSortingStrategy}>
            <div className="mx-auto mt-0 grid max-w-2xl grid-cols-1 gap-x-4 gap-y-8 pt-10 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {posts.map((post) => (
                <SortableItem key={post._id} post={post} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
};

BlogsDisplay.defaultProps = {
  draft: false,
  categories: ["AI", "Healthcare", "Technology", "Business", "All"],
};

export default BlogsDisplay;
