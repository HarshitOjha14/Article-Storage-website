import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addArticle } from "../../services/operations/articleApi";
import { MdOutlineDelete } from "react-icons/md";

const JournalResearchArticleForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    authors: [""],
    type: "Journal",
    journalName: "",
    volume: "",
    issue: "",
    pageNoStart: "",
    pageNoEnd: "",
    month: "",
    year: "",
    link: "",
  });

  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const handleIncrement = () => {
    setFormData((prevData) => ({
      ...prevData,
      authors: [...prevData.authors, ""],
    }));
  };

  const handleAuthorChange = (index, value) => {
    const updatedAuthors = [...formData.authors];
    updatedAuthors[index] = value;
    setFormData({ ...formData, authors: updatedAuthors });
  };

  const handleAuthorRemove = (index) => {
    const updatedAuthors = formData.authors.filter((_, i) => i !== index);
    setFormData({ ...formData, authors: updatedAuthors });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation for authors (must have at least one)
    if (formData.authors.every((author) => author.trim() === "")) {
      alert("Please provide at least one author.");
      setLoading(false);
      return;
    }

    // Validation for page numbers (must be numeric)
    if (isNaN(formData.pageNoStart) || isNaN(formData.pageNoEnd)) {
      alert("Page numbers must be numeric.");
      setLoading(false);
      return;
    }

    try {
      const response = await addArticle(formData, token);
      if (response) {
        console.log("Article uploaded successfully:", response);
        setFormData({
          title: "",
          authors: [""],
          journalName: "",
          type: "Journal",
          volume: "",
          issue: "",
          pageNoStart: "",
          pageNoEnd: "",
          month: "",
          year: "",
          link: "",
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
      <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Submit Your Journal Article
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                <button
                  type="button"
                  onClick={() => handleAuthorRemove(index)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                  <MdOutlineDelete className=" text-2xl" />
                </button>
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

          {/* Journal Name */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Journal Name</label>
            <input
              type="text"
              name="journalName"
              value={formData.journalName}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the journal name"
              required
            />
          </div>

          {/* Volume */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Volume</label>
            <input
              type="text"
              name="volume"
              value={formData.volume}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the volume"
              required
            />
          </div>

          {/* Issue */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Issue</label>
            <input
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              rows="4"
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the issue"
              required
            />
          </div>

          {/* Page Numbers */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Page Numbers</label>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                name="pageNoStart"
                value={formData.pageNoStart}
                onChange={handleChange}
                className="w-[100px] border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Start"
                required
              />
              <span>to</span>
              <input
                type="text"
                name="pageNoEnd"
                value={formData.pageNoEnd}
                onChange={handleChange}
                className="w-[100px] border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="End"
                required
              />
            </div>
          </div>

          {/* Month and Year */}
          <div className="flex items-center space-x-4">
            <div className="w-1/2">
              <label className="block text-lg font-medium text-gray-700">Month</label>
              <input
                type="text"
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="MM"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-lg font-medium text-gray-700">Year</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="YYYY"
                required
              />
            </div>
          </div>

          {/* Link */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Link</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the article link"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600"
            >
              {loading ? "Uploading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JournalResearchArticleForm;
