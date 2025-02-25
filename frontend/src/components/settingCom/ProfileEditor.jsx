import React, { useState } from "react";
import { updateProfile } from "../../services/operations/SettingApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileEditor = ({ userDetails }) => {
  const [profileDetails, setProfileDetails] = useState({
    Name: userDetails?.Name || "",
    contactNumber: userDetails?.additionalDetails?.contactNumber || "",
    about: userDetails?.additionalDetails?.about || "",
    gender: userDetails?.additionalDetails?.gender || "",
    dateOfBirth: userDetails?.additionalDetails?.dateOfBirth || "",
    twitterUrl: userDetails?.additionalDetails?.twitterUrl || "",
    linkedinURL: userDetails?.additionalDetails?.linkedinURL || "",
    instagramURL: userDetails?.additionalDetails?.instagramURL || "",
    facebookURL: userDetails?.additionalDetails?.facebookURL || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await dispatch(updateProfile(token, profileDetails));
      console.log("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  return (
    <form
      onSubmit={handleSave}
      className="space-y-8 border p-8 rounded-xl bg-gray-100"
    >
      <h3 className="text-2xl font-bold text-gray-800">Edit Profile</h3>

      {/* Edit Profile Details */}
      <div>
        <h4 className="text-xl font-semibold text-gray-800 m-2">
          Profile Details
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              name="Name"
              value={profileDetails.Name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="text"
              name="contactNumber"
              value={profileDetails.contactNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your phone number"
            />
          </div>
        </div>
      </div>

      {/* Personal Details */}
      <div>
        <h4 className="text-xl font-semibold text-gray-800 m-2">
          Personal Details
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              About
            </label>
            <textarea
              name="about"
              value={profileDetails.about}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Tell us about yourself"
              rows={4}
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Gender
            </label>
            <input
              type="text"
              name="gender"
              value={profileDetails.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your gender"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={profileDetails.dateOfBirth}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div>
        <h4 className="text-xl font-semibold text-gray-800">
          Social Media Links
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Twitter
            </label>
            <input
              type="url"
              name="twitterUrl"
              value={profileDetails.twitterUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your Twitter profile URL"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              LinkedIn
            </label>
            <input
              type="url"
              name="linkedinURL"
              value={profileDetails.linkedinURL}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your LinkedIn profile URL"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Instagram
            </label>
            <input
              type="url"
              name="instagramURL"
              value={profileDetails.instagramURL}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your Instagram profile URL"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Facebook
            </label>
            <input
              type="url"
              name="facebookURL"
              value={profileDetails.facebookURL}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your Facebook profile URL"
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileEditor;
