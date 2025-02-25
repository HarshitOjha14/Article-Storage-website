import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getFilteredArticles } from "../../services/operations/articleApi";
import { Link } from "react-router-dom";
import { MdReadMore } from "react-icons/md";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Bar } from "react-chartjs-2";

// Registering necessary components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const DepartmentArticleAnalysis = ({ selectedFaculty }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const user = useSelector((state) => state.profile.user);
  const selectedDepartment = user.department;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setArticles([]);
      setError("");
      try {
        let start, end;
        const today = new Date();

        if (dateRange === "custom" && startDate && endDate) {
          start = startDate;
          end = endDate;
        } else {
          switch (dateRange) {
            case "lastMonth":
              start = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
              end = today;
              break;
            case "last3Months":
              start = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
              end = today;
              break;
            case "last6Months":
              start = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
              end = today;
              break;
            case "lastYear":
              start = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
              end = today;
              break;
            case "last5Years":
              start = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
              end = today;
              break;
            case "all":
            default:
              start = new Date(today.getFullYear() - 1000, today.getMonth(), today.getDate());
              end = today;
              break;
          }
        }

        const articles = await getFilteredArticles(
          selectedDepartment,
          selectedFaculty,
          start.toISOString(),
          end.toISOString()
        );

        if (articles) {
          setArticles(articles);
        } else {
          setError("No articles found for the selected date range.");
        }
      } catch (err) {
        console.error("Could not fetch articles:", err);
        setError("Failed to load articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedDepartment, selectedFaculty, dateRange, startDate, endDate]);

  const dateOptions = [
    { label: "ALL", value: "all" },
    { label: "Last 1 Month", value: "lastMonth" },
    { label: "Last 3 Months", value: "last3Months" },
    { label: "Last 6 Months", value: "last6Months" },
    { label: "Last 1 Year", value: "lastYear" },
    { label: "Last 5 Years", value: "last5Years" },
    { label: "Custom Range", value: "custom" },
  ];

  const publishersCount = articles.reduce((acc, article) => {
    const publisher = article.publisher?.Name || "Unknown";
    acc[publisher] = (acc[publisher] || 0) + 1;
    return acc;
  }, {});

  const topPublishersData = {
    labels: Object.keys(publishersCount),
    datasets: [
      {
        label: "Top Publishers",
        data: Object.values(publishersCount),
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const articlesByType = articles.reduce((acc, article) => {
    const type = article.type || "Unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(articlesByType),
    datasets: [
      {
        label: "Article Count by Type",
        data: Object.values(articlesByType),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Group articles by year for the previous bar chart
const articlesByYear = articles.reduce((acc, article) => {
  const year = new Date(article.createdAt).getFullYear();
  acc[year] = (acc[year] || 0) + 1;
  return acc;
}, {});

// Sort years in descending order
const sortedYears = Object.keys(articlesByYear).sort((a, b) => b - a);

// Prepare data for the previous bar chart (Article distribution by Year)
const yearBarChartData = {
  labels: sortedYears.map(year => `${year} - ${articlesByYear[year]}`), // Custom label format: "Year - Article Count"
  datasets: [
    {
      label: "Article Distribution by Year",
      data: sortedYears.map(year => articlesByYear[year]), // Article counts per year
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      borderColor: "rgba(153, 102, 255, 1)",
      borderWidth: 1,
    },
  ],
};

  const articlesToShow = showAll ? articles : articles.slice(0, 4);

  return (
    <div className="w-[70%] ml-[20%] h-full p-6 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-indigo-900">
        Department Articles
      </h1>

      <div className="mb-6">
        <p className="text-lg text-gray-700">
          Total Articles Found:{" "}
          <span className="font-semibold text-indigo-600">{articles.length}</span>
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold text-indigo-700">
          Date Range:
        </label>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="mt-3 p-4 w-full border-2 border-indigo-400 rounded-lg shadow-sm focus:ring-4 focus:ring-indigo-300"
        >
          {dateOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {dateRange === "custom" && (
        <div className="mb-6">
          <label className="block text-lg font-semibold text-indigo-700">
            Select Custom Date Range:
          </label>
          <div className="flex gap-4">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="mt-3 p-4 border-2 border-indigo-400 rounded-lg"
              dateFormat="yyyy/MM/dd"
              placeholderText="Start Date"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="mt-3 p-4 border-2 border-indigo-400 rounded-lg"
              dateFormat="yyyy/MM/dd"
              placeholderText="End Date"
            />
          </div>
        </div>
      )}

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-indigo-800 mb-4">
          Article By Publisher Selected Date Range
        </h2>
        {Object.keys(publishersCount).length > 0 ? (
          <div className="flex justify-center">
            <div className="w-full sm:w-[60%] lg:w-[50%]">
              <Doughnut data={topPublishersData} />
            </div>
          </div>
        ) : (
          <p>No data available for the selected date range.</p>
        )}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-indigo-800 mb-4">
          Articles by Type
        </h2>
        <div className="flex justify-center">
          <div className="w-full sm:w-[60%] lg:w-[50%]">
            <Bar data={barChartData} />
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-indigo-800 mb-4">
          Articles by Year (Last 5 Years)
        </h2>
        <div className="flex justify-center">
          <div className="w-full sm:w-[60%] lg:w-[50%]">
            <Bar data={yearBarChartData} />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-indigo-800 mb-4">
          Articles List
        </h2>
        {loading && <p>Loading articles...</p>}
        {error && <p className="text-red-600">{error}</p>}
        <ul className="space-y-6">
          {articlesToShow.map((article, idx) => (
            <li key={idx} className="border-2 p-4 rounded-lg">
              <h3 className="font-semibold text-xl text-indigo-800">
                {article.title}
              </h3>
              <p>{article.description}</p>
              <Link to={`/articles/${article.id}`} className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2">
                <MdReadMore /> Read More
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-6 text-indigo-600 font-semibold"
        >
          {showAll ? "Show Less" : "Show All"}
        </button>
      </div>
    </div>
  );
};

export default DepartmentArticleAnalysis;
