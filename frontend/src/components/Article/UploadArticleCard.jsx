import React, { useState } from "react";
import { addArticle } from "../../services/operations/articleApi";
import { useSelector } from "react-redux";

const ResearchArticleForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    keywords: "",
    introduction: "",
    methodology: "",
    results: "",
    conclusion: "",
    references: "",
  });
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);

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
          abstract: "",
          keywords: "",
          introduction: "",
          methodology: "",
          results: "",
          conclusion: "",
          references: "",
        });
      }
    } catch (error) {
      console.error("Error uploading article:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl border mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
        Submit Your Research Article
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

        {/* Abstract */}
        <div>
          <label className="block text-lg font-semibold text-gray-700">Abstract</label>
          <textarea
            name="abstract"
            value={formData.abstract}
            onChange={handleChange}
            rows="4"
            className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="Provide a summary of your research article"
            required
          ></textarea>
        </div>

        {/* Keywords */}
        <div>
          <label className="block text-lg font-semibold text-gray-700">Keywords</label>
          <input
            type="text"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="E.g., AI, Machine Learning, Robotics"
            required
          />
        </div>

        {/* Introduction */}
        <div>
          <label className="block text-lg font-semibold text-gray-700">Introduction</label>
          <textarea
            name="introduction"
            value={formData.introduction}
            onChange={handleChange}
            rows="6"
            className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="Provide an introduction to your research"
            required
          ></textarea>
        </div>

        {/* Methodology */}
        <div>
          <label className="block text-lg font-semibold text-gray-700">Methodology</label>
          <textarea
            name="methodology"
            value={formData.methodology}
            onChange={handleChange}
            rows="6"
            className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="Describe your research methodology"
            required
          ></textarea>
        </div>

        {/* Results */}
        <div>
          <label className="block text-lg font-semibold text-gray-700">Results and Discussion</label>
          <textarea
            name="results"
            value={formData.results}
            onChange={handleChange}
            rows="6"
            className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="Discuss your research findings"
            required
          ></textarea>
        </div>

        {/* Conclusion */}
        <div>
          <label className="block text-lg font-semibold text-gray-700">Conclusion</label>
          <textarea
            name="conclusion"
            value={formData.conclusion}
            onChange={handleChange}
            rows="4"
            className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="Summarize your research conclusions"
            required
          ></textarea>
        </div>

        {/* References */}
        <div>
          <label className="block text-lg font-semibold text-gray-700">References</label>
          <textarea
            name="references"
            value={formData.references}
            onChange={handleChange}
            rows="4"
            className="mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="List your references here"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className={`bg-blue-600 text-white py-3 px-8 rounded-lg shadow-md text-lg font-bold hover:bg-blue-700 transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Submit Article"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResearchArticleForm;
