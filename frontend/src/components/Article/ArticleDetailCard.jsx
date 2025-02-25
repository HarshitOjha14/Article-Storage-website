import React from 'react';
import { FaFacebookF, FaTwitter, FaPinterestP } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ArticleDetailCard = ({ article }) => {
  console.log("ye dekh smajh jayega" , article)
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white via-gray-100 to-gray-50 shadow-lg rounded-2xl border border-gray-200 mt-8 mb-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
        {article?.title}
      </h1>

      <div className="flex items-center space-x-4 mb-8">
        <Link to={`/authorProfile/${article.publisher?._id}`}>
          <img
            src={article.publisher?.image}
            alt="author"
            className="w-16 h-16 rounded-full border-4 border-gray-200 shadow-md hover:shadow-lg transition-shadow"
          />
        </Link>
        <div>
          <Link to={`/authorProfile/${article.publisher?._id}`}>
            <p className="text-lg font-semibold text-gray-800 hover:text-gray-900 transition">
              {article?.publisher?.Name}
            </p>
          </Link>
          <p className="text-sm text-gray-500">
            Published on {new Date(article?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <span className="font-semibold text-gray-800">Authors: </span>
        {article.authors && article.authors.length > 0 ? (
          <span className="text-gray-600">{article.authors.join(', ')}</span>
        ) : (
          <span className="text-gray-500">No additional authors</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <span className="font-semibold text-gray-800">
            {article.type === 'Conference' ? 'Conference Name:' : 'Journal Name:'}
          </span>
          <span className="text-gray-700"> {article.conferenceName || article.journalName}</span>
        </div>
        {
          article.type !== "Conference" && ( 
          <div>
            <span className="font-semibold text-gray-800">Volume:</span>
            <span className="text-gray-700"> {article.volume}</span>
          </div>)
        }

{
          article.type === "Conference" && ( 
          <div>
            <span className="font-semibold text-gray-800">Location:</span>
            <span className="text-gray-700"> {article.location
            }</span>
          </div>)
        }
        
        {article.type === 'Journal' && (
          <div>
            <span className="font-semibold text-gray-800">Issue:</span>
            <span className="text-gray-700"> {article.issue}</span>
          </div>
        )}
        <div>
          <span className="font-semibold text-gray-800">Pages:</span>
          <span className="text-gray-700">
            {article.pageNoStart} - {article.pageNoEnd}
          </span>
        </div>
        <div>
          <span className="font-semibold text-gray-800">Publication Year:</span>
          <span className="text-gray-700"> {article.year}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-800">Publication Month:</span>
          <span className="text-gray-700"> {article.month}</span>
        </div>
      </div>

      <div className="mb-8">
        <Link
          to={`${article.link}`}
          className="text-blue-600 hover:underline font-medium text-lg"
        >
          View Full Article
        </Link>
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Share this article</h3>
        <div className="flex space-x-4">
          <button
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
            title="Share on Facebook"
            onClick={() =>
              window.open(
                `https://facebook.com/sharer/sharer.php?u=${window.location.href}`,
                '_blank'
              )
            }
          >
            <FaFacebookF />
          </button>
          <button
            className="bg-blue-400 text-white p-4 rounded-full shadow-lg hover:bg-blue-500 transition duration-200"
            title="Share on Twitter"
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?url=${window.location.href}`,
                '_blank'
              )
            }
          >
            <FaTwitter />
          </button>
          <button
            className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition duration-200"
            title="Share on Pinterest"
            onClick={() =>
              window.open(
                `https://pinterest.com/pin/create/button/?url=${window.location.href}`,
                '_blank'
              )
            }
          >
            <FaPinterestP />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailCard;
