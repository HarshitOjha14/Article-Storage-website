import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { apiConnector } from "../../services/apiconnector";
import { departmentEndpoints } from "../../services/apis";
import { getFilteredArticles } from "../../services/operations/articleApi";
import { Link } from "react-router-dom";
import { MdReadMore } from "react-icons/md";

const SearchFilter = () => {
  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedArticleType, setSelectedArticleType] = useState(""); // New state for article type
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await apiConnector(
          "GET",
          departmentEndpoints.SHOW_ALL_DEPARTMENT
        );
        setDepartments(res.data.departments || []);
      } catch (err) {
        console.error("Could not fetch departments:", err);
        setError("Failed to load departments.");
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    if (!selectedDepartment) return;

    const fetchFaculties = async () => {
      setLoading(true);
      setFaculties([]);
      setError("");
      try {
        const res = await apiConnector(
          "POST",
          "http://localhost:5000/api/v1/department/getFacultyByDepartment",
          { deptID: selectedDepartment }
        );
        setFaculties(res.data.faculty || []);
      } catch (err) {
        console.error("Could not fetch faculty for department:", err);
        setError("Failed to load faculty members.");
      } finally {
        setLoading(false);
      }
    };

    fetchFaculties();
  }, [selectedDepartment]);

  useEffect(() => {
    if (!selectedDepartment && !fromDate && !toDate && !selectedArticleType) return;

    const fetchArticles = async () => {
      setLoading(true);
      setArticles([]);
      try {
        const articles = await getFilteredArticles(
          selectedDepartment,
          selectedFaculty,
          fromDate?.toISOString(),
          toDate?.toISOString(),
          selectedArticleType 
        );
        setArticles(articles || []);
      } catch (err) {
        console.error("Could not fetch articles:", err);
        setError("Failed to load articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedDepartment, selectedFaculty, fromDate, toDate, selectedArticleType]);

  // Count articles by type (Journal vs Conference)
  const journalCount = articles.filter((article) => article.type === "Journal").length;
  const conferenceCount = articles.filter((article) => article.type === "Conference").length;

  return (
    <div className="w-full h-full p-6 sm:p-8  ">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-indigo-900">
        Search Articles
      </h1>
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Left Section */}
        <div className="w-full sm:w-1/3 space-y-8 sm:space-y-10 sm:border-r sm:pr-10 sm:sticky top-16">
          <div>
            <label className="block text-lg font-semibold text-indigo-700">
              Department:
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="mt-3 p-4 w-full border-2 border-indigo-400 rounded-lg shadow-sm focus:ring-4 focus:ring-indigo-300"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold text-indigo-700">
              Faculty:
            </label>
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              disabled={!faculties.length || loading}
              className="mt-3 p-4 w-full border-2 border-indigo-400 rounded-lg shadow-sm focus:ring-4 focus:ring-indigo-300"
            >
              <option value="">Select Faculty</option>
              {loading ? (
                <option>Loading...</option>
              ) : faculties.length > 0 ? (
                faculties.map((faculty) => (
                  <option key={faculty._id} value={faculty._id}>
                    {faculty.Name}
                  </option>
                ))
              ) : (
                <option>No faculty available</option>
              )}
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold text-indigo-700">
              Article Type:
            </label>
            <select
              value={selectedArticleType}
              onChange={(e) => setSelectedArticleType(e.target.value)}
              className="mt-3 p-4 w-full border-2 border-indigo-400 rounded-lg shadow-sm focus:ring-4 focus:ring-indigo-300"
            >
              <option value="">Select Article Type</option>
              <option value="Journal">Journal</option>
              <option value="Conference">Conference</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-lg font-semibold text-indigo-700">
                From Date:
              </label>
              <DatePicker
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                maxDate={toDate}
                placeholderText="Select Start Date"
                className="mt-3 p-4 w-full border-2 border-indigo-400 rounded-lg shadow-sm focus:ring-4 focus:ring-indigo-300"
              />
            </div>
            <div className="flex-1">
              <label className="block text-lg font-semibold text-indigo-700">
                To Date:
              </label>
              <DatePicker
                selected={toDate}
                onChange={(date) => setToDate(date)}
                minDate={fromDate}
                placeholderText="Select End Date"
                className="mt-3 p-4 w-full border-2 border-indigo-400 rounded-lg shadow-sm focus:ring-4 focus:ring-indigo-300"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-2/3 sm:h-[70vh] overflow-y-auto">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Articles</h2>
          {!loading && articles.length > 0 && (
            <p className="mt-2 text-lg text-gray-700">
              Total Articles Found:{" "}
              <span className="font-semibold text-indigo-600">{articles.length}</span>
              <br />
              Journal Articles:{" "}
              <span className="font-semibold text-indigo-600">{journalCount}</span>
              <br />
              Conference Articles:{" "}
              <span className="font-semibold text-indigo-600">{conferenceCount}</span>
            </p>
          )}

          {loading ? (
            <p className="mt-6 text-gray-500 text-lg">Loading articles...</p>
          ) : articles.length > 0 ? (
            <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.map((article) => (
                <li
                  key={article._id}
                  className="p-6 bg-white rounded-lg shadow-md border-2 hover:border-indigo-600 transition-all"
                >
                  <h3 className="text-xl font-semibold text-indigo-800 mb-3">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Authors: {article.authors.join(", ")}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Published On:{" "}
                    {new Date(article.createdAt).toLocaleDateString()}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Publisher: {article.publisher?.Name || "Unknown"}
                  </p>
                  <div className="mt-4">
                    <Link
                      to={`/article/${article._id}`}
                      className="text-indigo-600 flex items-center gap-2"
                    >
                      Read More
                      <MdReadMore />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-lg text-gray-500">No articles found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
