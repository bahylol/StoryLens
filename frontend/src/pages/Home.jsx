import React from 'react';
import Blog from '../components/Blog.jsx';

const Home = () => {
  const posts = [
    {
      id: 1,
      title: "Exploring the Wonders of Nature",
      datetime: "2024-12-01",
      description: "Discover the hidden beauty of forests, mountains, and lakes in this comprehensive guide.",
      imageUrl: "https://via.placeholder.com/400x300?text=Nature+Post",
    },
    {
      id: 2,
      title: "Mastering React for Frontend Development",
      datetime: "2024-11-30",
      description: "Learn advanced techniques for building modern web applications using React.",
      imageUrl: "https://via.placeholder.com/400x300?text=React+Post",
    },
    {
      id: 3,
      href: "/post/3",
      title: "A Beginner's Guide to Photography",
      datetime: "2024-11-15",
      date: "November 15, 2024",
      description: "Start your photography journey with essential tips and techniques.",
      tags: ["Photography", "Beginner", "Art"],
      imageUrl: "https://via.placeholder.com/400x300?text=Photography+Post",
    },
    {
      id: 4,
      href: "/post/4",
      title: "Top 10 Recipes for Quick Meals",
      datetime: "2024-12-05",
      date: "December 5, 2024",
      description: "Save time in the kitchen with these easy and delicious recipes.",
      tags: ["Cooking", "Quick Meals", "Food"],
      imageUrl: "https://via.placeholder.com/400x300?text=Recipes+Post",
    },
    {
      id: 5,
      href: "/post/5",
      title: "Fitness Hacks for a Busy Lifestyle",
      datetime: "2024-11-25",
      date: "November 25, 2024",
      description: "Stay fit and healthy even when you have a packed schedule.",
      tags: ["Fitness", "Health", "Lifestyle"],
      imageUrl: "https://via.placeholder.com/400x300?text=Fitness+Post",
    },
    {
      id: 6,
      href: "/post/6",
      title: "Understanding Cryptocurrency Basics",
      datetime: "2024-12-10",
      date: "December 10, 2024",
      description: "Get to know how cryptocurrency works and why it's changing the financial world.",
      tags: ["Cryptocurrency", "Finance", "Blockchain"],
      imageUrl: "https://via.placeholder.com/400x300?text=Crypto+Post",
    },
    {
      id: 7,
      href: "/post/7",
      title: "The Future of Artificial Intelligence",
      datetime: "2024-12-08",
      date: "December 8, 2024",
      description: "Explore the advancements in AI and what it means for our future.",
      tags: ["AI", "Technology", "Innovation"],
      imageUrl: "https://via.placeholder.com/400x300?text=AI+Post",
    },
    {
      id: 8,
      href: "/post/8",
      title: "Top 5 Travel Destinations for 2025",
      datetime: "2024-12-20",
      date: "December 20, 2024",
      description: "Plan your next vacation with our top picks for travel in 2025.",
      tags: ["Travel", "Vacation", "Destinations"],
      imageUrl: "https://via.placeholder.com/400x300?text=Travel+Post",
    },
    {
      id: 9,
      href: "/post/9",
      title: "How to Start Investing in Stocks",
      datetime: "2024-11-20",
      date: "November 20, 2024",
      description: "Learn the basics of stock market investing and start building your portfolio.",
      tags: ["Stocks", "Investing", "Finance"],
      imageUrl: "https://via.placeholder.com/400x300?text=Investing+Post",
    },
    {
      id: 10,
      href: "/post/10",
      title: "Minimalism: Living with Less",
      datetime: "2024-11-10",
      date: "November 10, 2024",
      description: "Discover the benefits of a minimalist lifestyle and how to adopt it.",
      tags: ["Minimalism", "Lifestyle", "Simplicity"],
      imageUrl: "https://via.placeholder.com/400x300?text=Minimalism+Post",
    },
  ];  

  return (
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Blog posts={posts} />
      </div>
  );
};

export default Home;
