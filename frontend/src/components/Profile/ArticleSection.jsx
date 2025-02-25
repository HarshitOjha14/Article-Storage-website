import React from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom';


const ArticlesSection = ({ uploadedArticles, handleDeleteArticle }) => {
  
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white">
      <h2 className="text-3xl font-semibold text-purple-700 text-center mb-4">
        My Articles
      </h2>
      <p className="text-lg text-gray-600 mt-2 text-center">
        Total Articles:{" "}
        <span className="font-bold text-purple-600">
          {uploadedArticles?.length}
        </span>
      </p>
      <div className="mt-6 space-y-6">
        {uploadedArticles.length === 0 ? (
          <p className="text-gray-500 text-center">No articles uploaded yet.</p>
        ) : (
          uploadedArticles.map((article) => (
            <div
              key={article.id}
              className="flex justify-between items-center bg-gray-50 p-6 rounded-lg shadow-md duration-300 transition-all hover:shadow-lg border-l-4 border-purple-600"
            >
              <div>
                <h4 className="text-xl font-semibold text-gray-800">
                  {article.title}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  Published on:{" "}
                  <span className="font-medium text-gray-700">
                    {new Date(article?.createdAt).toLocaleDateString()}
                  </span>
                </p>
              </div>
              <div className="flex space-x-6">
                <button className="text-yellow-500 font-semibold hover:text-yellow-600 transition-colors duration-200">
                  <Link to={`/article/${article?._id}`}>
                    <FaRegEye className="text-2xl" />
                  </Link>
                </button>
                <button className="text-purple-600 font-semibold hover:text-purple-800 transition-colors duration-200">
                  <FaRegEdit className="text-2xl" />
                </button>
                <button
                  className="text-red-500 font-semibold hover:text-red-700 transition-colors duration-200"
                  onClick={() => handleDeleteArticle(article?._id)} 
                >
                  <MdDeleteOutline className="text-2xl" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArticlesSection;

