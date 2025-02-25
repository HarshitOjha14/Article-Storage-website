import React from 'react';
import { BiEditAlt } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { FaFacebookSquare } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const ProfileSection = ({ userDetails, onEditProfile }) => {
  console.log("User Details: ", userDetails);

  if (userDetails.accountType === "Admin") {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl space-y-5">
        <h2 className="text-3xl font-semibold text-gray-900 text-center">Welcome Back ADMIN </h2>

        {/* Profile Header */}
        <div className="flex items-center space-x-6 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
          <img
            src={userDetails.image || "https://cdn-icons-png.flaticon.com/512/10841/10841518.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow-sm"
          />
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-800">{userDetails.Name}</p>
            <p className="text-md text-gray-800">{userDetails.email}</p>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl space-y-5">
      <h2 className="text-3xl font-semibold text-gray-900 text-center">My Profile</h2>

      {/* Profile Header */}
      <div className="flex items-center space-x-6 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <img
          src={userDetails.image || "https://cdn-icons-png.flaticon.com/512/10841/10841518.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow-sm"
        />
        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-800">{userDetails.Name}</p>
          <p className="text-md text-gray-800">{userDetails.email}</p>
        </div>
      </div>

      {/* About Section */}
      <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">About</h3>
        <p className="text-gray-700">{userDetails.additionalDetails?.about || 'No information provided.'}</p>
      </div>

      {/* Personal Details */}
      <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Details</h3>
        <p className="text-gray-700">Phone: {userDetails.additionalDetails?.contactNumber || 'N/A'}</p>
        <p className="text-gray-700">Gender: {userDetails.additionalDetails?.gender || 'N/A'}</p>
        <p className="text-gray-700">DOB: {userDetails.additionalDetails?.dateOfBirth || 'N/A'}</p>
      </div>

      {/* Social Media Links */}
      <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Social Media</h3>
        <div className="flex space-x-6 mt-2">
          {userDetails.additionalDetails?.facebookUrl && (
            <Link
              to={userDetails.additionalDetails.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <FaFacebookSquare className="text-2xl" />
            </Link>
          )}
          {userDetails.additionalDetails?.instagramUrl && (
            <Link
              to={userDetails.additionalDetails.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-800 transition-colors duration-200"
            >
              <LuInstagram className="text-2xl" />
            </Link>
          )}
          {userDetails.additionalDetails?.twitterUrl && (
            <Link
              to={userDetails.additionalDetails.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
            >
              <FaSquareXTwitter className="text-2xl" />
            </Link>
          )}
          {userDetails.additionalDetails?.linkedinUrl && (
            <Link
              to={userDetails.additionalDetails.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 transition-colors duration-200"
            >
              <FaLinkedin className="text-2xl" />
            </Link>
          )}
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="text-center mt-4">
        <button
          onClick={onEditProfile}
          className="bg-purple-600 text-white px-8 py-3 rounded-md font-semibold shadow-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105"
        >
          <span className="flex justify-center items-center gap-2">
            <BiEditAlt className="text-xl" />
            Edit Profile
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
