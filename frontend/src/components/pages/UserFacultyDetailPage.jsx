import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserDetailsById } from "../../services/operations/profileApi";
import { useSelector } from "react-redux";

const UserFacultyDetailPage = () => {
  const { facultyId } = useParams(); // Extract facultyId from URL
  const { token } = useSelector((state) => state.auth);

  const [facultyDetails, setFacultyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserDetails = async (facultyId) => {
    try {
      setLoading(true);
      const response = await fetchUserDetailsById(token, facultyId);

      if (response?.success) {
        setFacultyDetails(response.data);
      } else {
        throw new Error(response?.message || "Failed to fetch faculty details");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && facultyId) {
      getUserDetails(facultyId);
    }
  }, [token, facultyId]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-medium text-red-600">{error}</div>
      </div>
    );
  }

  // Helper Function for Social Links
  const renderSocialLink = (url, platform) => {
    if (!url) return null;
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition"
      >
        {platform}
      </a>
    );
  };

  // Render Faculty Details
  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Faculty Profile
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={facultyDetails.image}
            alt={facultyDetails.Name}
            className="w-40 h-40 rounded-full shadow-md"
          />
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold text-gray-900">Name:</span>{" "}
              {facultyDetails.Name}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold text-gray-900">Email:</span>{" "}
              {facultyDetails.email}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold text-gray-900">Account Type:</span>{" "}
              {facultyDetails.accountType}
            </p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold text-gray-900">Department:</span>{" "}
              {facultyDetails.department.name}
            </p>
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Additional Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold text-gray-900">Gender:</span>{" "}
              {facultyDetails.additionalDetails.gender || "Not Specified"}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold text-gray-900">Date of Birth:</span>{" "}
              {facultyDetails.additionalDetails.dateOfBirth || "Not Specified"}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold text-gray-900">
                Contact Number:
              </span>{" "}
              {facultyDetails.additionalDetails.contactNumber || "Not Specified"}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold text-gray-900">About:</span>{" "}
              {facultyDetails.additionalDetails.about || "Not Specified"}
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Social Links
          </h2>
          <div className="flex gap-4">
            {renderSocialLink(
              facultyDetails.additionalDetails.facebookUrl,
              "Facebook"
            )}
            {renderSocialLink(
              facultyDetails.additionalDetails.instagramUrl,
              "Instagram"
            )}
            {renderSocialLink(
              facultyDetails.additionalDetails.twitterUrl,
              "Twitter"
            )}
          </div>
        </div>

        {/* Articles */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Articles
          </h2>
          {facultyDetails.articles.length > 0 ? (
            <ul className="list-disc list-inside text-lg font-medium text-gray-700">
              {facultyDetails.articles.map((article, index) => (
                <li key={index}>{article}</li>
              ))}
            </ul>
          ) : (
            <p className="text-lg font-medium text-gray-700">
              No articles available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserFacultyDetailPage;
