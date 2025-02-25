import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  return (
    <Link to={`/article/${article._id}`}>
      <div className="p-6 border border-red-300 rounded-lg shadow-lg bg-white shadow-teal-50 hover:shadow-xl hover:shadow-teal-100 hover:scale-95 transition-all duration-300">
        <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>

        <div className="flex items-center mb-4">
          {/* Author Image */}
          <Link to={`/authorProfile/${article.publisher?._id}`}>
            <img
              src={article.publisher?.image || 'https://via.placeholder.com/40'} // Fallback to placeholder image
              alt="author"
              className="w-10 h-10 rounded-full mr-3 bg-blue-300 hover:scale-110 transition-all duration-300"
            />
          </Link>

          <div>
            <span className="text-md text-gray-500">By </span>
            {/* Author Name */}
            <Link to={`/authorProfile/${article.publisher?._id}`}>
              <span className="text-md font-semibold text-gray-700">
                {article.publisher?.Name || 'Unknown Author'}
              </span>
            </Link>
            <span className="text-md ml-2 text-gray-500">
              on {new Date(article.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <div className="font-semibold text-gray-700 mb-1">Authors:</div>
          <div className="text-md text-gray-600">
            {article.authors && article.authors.length > 0 ? (
              article.authors
                .map((author, key) => author) 
                .join(', ') 
            ) : (
              <span>No additional authors</span>
            )}
          </div>
        </div>

        {/* Read More Button */}
        <Link to={`/article/${article._id}`}>
          <button className="mt-4 text-blue-500 hover:text-blue-700 font-medium transition-colors duration-200">
            See More  details
          </button>
        </Link>
      </div>
    </Link>
  );
};

export default ArticleCard;
