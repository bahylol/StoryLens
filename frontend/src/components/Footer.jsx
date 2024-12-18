import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 <a href="/" className="hover:underline">Story Lens™</a>. All Rights Reserved.
        </span>
        <button
          onClick={scrollToTop}
          className="bg-gray-100 text-black p-2 rounded-full shadow-md hover:bg-gray-600 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19V6m0 0l-7 7m7-7l7 7"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
