import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedArticleCard = ({ article }) => {
  
  const truncateAbstract = (text, wordLimit) => {
    const words = text?.split(' ');
    if (words?.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105">
    
      <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
      <div className='flex items-center gap-3'>
        <img
          src={article.Author?.image}
          alt="author"
          className="w-12 h-12 rounded-full border border-gray-300 hover:scale-105 transition-transform duration-300"
        />
        <div>
          <p className="text-gray-700">By {article.Author?.Name}</p>
          
          <p className="text-gray-500 text-sm">{new Date (article.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <p className="mt-4 text-gray-600">{truncateAbstract(article.introduction, 6)}</p>

      <Link to={`/article/${article._id}`}>
      <button className="mt-6 inline-block px-5 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors">
        View Article
      </button>
      </Link>
    </div>
  );
};

export default FeaturedArticleCard;
