import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addArticle } from "../../services/operations/articleApi";
import { MdOutlineDelete } from "react-icons/md";
const ConferenceResearchArticleForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    authors: [""],
    location: "",
    issues: "",
    pageNoStart: "",
    pageNoEnd: "",
    link: "",
    conferenceName: "",
    type: "Conference",
    month: "",
    year: "",
  });
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  // Handle adding a new author
  const handleIncrement = () => {
    setFormData((prevData) => ({
      ...prevData,
      authors: [...prevData.authors, ""],
    }));
  };

  // Handle removing a specific author
  const handleAuthorRemove = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      authors: prevData.authors.filter((_, i) => i !== index),
    }));
  };

  // Handle individual author input changes
  const handleAuthorChange = (index, value) => {
    const updatedAuthors = [...formData.authors];
    updatedAuthors[index] = value;
    setFormData({ ...formData, authors: updatedAuthors });
  };

  // Handle input changes for other fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await addArticle(formData, token);
      if (response) {
        console.log("Article uploaded successfully:", response);
        setFormData({
          title: "",
          authors: [""],
          type: "Conference",
          location: "",
          issues: "",
          pageNoStart: "",
          pageNoEnd: "",
          link: "",
          conferenceName: "",
          month: "",
          year: "",
        });
      }
    } catch (error) {
      console.error("Error uploading article:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-10">
      <div className="max-w-4xl border mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-800">
          Submit Your Conference Article
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              placeholder="Enter the title of your research article"
              required
            />
          </div>

          {/* Authors */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Authors</label>
            {formData.authors.map((author, index) => (
              <div key={index} className="flex items-center space-x-4 mt-2">
                <input
                  type="text"
                  value={author}
                  onChange={(e) => handleAuthorChange(index, e.target.value)}
                  className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Author ${index + 1}`}
                  required
                />
                {formData.authors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleAuthorRemove(index)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                  >
                <MdOutlineDelete className=" text-2xl" />
                  </button>
                )}
              </div>
            ))}
            <div className="flex items-center mt-4 space-x-4">
              <button
                type="button"
                onClick={handleIncrement}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
              >
                Add Author
              </button>
            </div>
          </div>

          {/* Conference Name */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">Conference Name</label>
            <input
              type="text"
              name="conferenceName"
              value={formData.conferenceName}
              onChange={handleChange}
              className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              placeholder="E.g., AI, Machine Learning, Robotics"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              placeholder="Provide a location"
              required
            />
          </div>

          {/* Page Numbers */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">Pages</label>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                name="pageNoStart"
                value={formData.pageNoStart}
                onChange={handleChange}
                className="mt-2 block w-[100px] border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                placeholder="Start Page"
                required
              />
              <span className="text-gray-700 font-semibold">to</span>
              <input
                type="text"
                name="pageNoEnd"
                value={formData.pageNoEnd}
                onChange={handleChange}
                className="mt-2 block w-[100px] border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                placeholder="End Page"
                required
              />
            </div>
          </div>

          {/* Month and Year */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-lg font-semibold text-gray-700">Month</label>
              <input
                type="text"
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                placeholder="Month of publication"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-lg font-semibold text-gray-700">Year</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                placeholder="Year of publication"
                required
              />
            </div>
          </div>

          {/* Link */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">Link</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              placeholder="Enter the link to your research"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className={`bg-blue-600 text-white py-3 px-8 rounded-lg shadow-md text-lg font-bold hover:bg-blue-700 transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Submit Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConferenceResearchArticleForm;
