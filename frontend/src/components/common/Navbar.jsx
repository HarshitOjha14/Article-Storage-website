import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const navigate = useNavigate();

  // Function to handle modal option selection
  const handleModalOptionClick = (route) => {
    setShowModal(false); // Close modal
    navigate(route); // Navigate to the selected route
  };

  return (
    <nav className="bg-purple-600 shadow-md shadow-gray-400 sticky top-0 z-50 h-[10vh]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Brand Name */}
          <div>
            <Link to="/" className="text-white text-2xl font-bold">
              ArticleStorage
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white text-xl hover:font-semibold">
              Home
            </Link>
            <Link to="/articles" className="text-white text-xl hover:font-semibold">
              Articles
            </Link>

            {/* Upload Articles with Modal on Hover */}
            <div
              className="relative"
              onMouseEnter={() => setShowModal(true)}
              onMouseLeave={() => setShowModal(false)}
            >
              <span className="text-white text-xl hover:font-semibold cursor-pointer">
                Upload Articles
              </span>

              {/* Modal with options */}
              {showModal && (
                <div className="absolute top-full left-0 bg-white shadow-lg p-4 rounded-md space-y-2 z-50  w-64">
                  <button
                    onClick={() => handleModalOptionClick("/uploadArticle/Journal")}
                    className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
                  >
                    Upload Journal Article
                  </button>
                  <button
                    onClick={() => handleModalOptionClick("/uploadArticle/Confrence")}
                    className="w-full text-left px-2 py-1  hover:bg-gray-100 rounded-md"
                  >
                    Upload Confrence Article
                  </button>
                </div>
              )}
            </div>

            
              <Link to="/SearchArticle" className="text-white text-xl hover:font-semibold">
               Search Article
              </Link>
          
          </div>

          {/* User Profile or Auth Buttons */}
          <div className="flex items-center space-x-4">
            {token == null ? (
              <div className="flex gap-3">
                <Link to="/login">
                  <button className="bg-purple-700 text-white font-semibold border-gray-50 border-2 px-2 py-1 rounded-md hover:bg-purple-600">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-purple-700 text-white font-semibold border-gray-50 border-2 px-2 py-1 rounded-md hover:bg-purple-600">
                    Signup
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/myProfile">
                  <img
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[45px] border-white border-2 rounded-full object-cover"
                  />
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger Menu for Mobile */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col bg-black space-y-4 mt-2 pb-4 px-4">
            <Link
              to="/"
              className="text-white text-xl hover:text-blue-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/articles"
              className="text-white text-lg hover:text-blue-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Articles
            </Link>
            <Link
              to="/uploadArticle"
              className="text-white text-lg hover:text-blue-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Upload Articles
            </Link>
          
              <Link
                to="/SearchArticle"
                className="text-white text-lg hover:text-blue-300"
                onClick={() => setIsMenuOpen(false)}
              >
               Search Article
              </Link>
            
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
