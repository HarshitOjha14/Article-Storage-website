import React, { useEffect, useState } from 'react';
import { getAllArticles } from '../../services/operations/articleApi';
import ArticleCard from '../Article/ArticleCard';
import { IoSearch } from "react-icons/io5";

const ArticleListing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortOption, setSortOption] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesData, setArticlesData] = useState([]); 
  const articlesPerPage = 9;

  useEffect(() => {
    ; (async () => {
      try {
        const res = await getAllArticles();
        console.log("article details res: ", res.publisher);
        setArticlesData(res);  // Setting the state correctly
      } catch (error) {
        console.log("Could not fetch articles");
      }
    })();
  }, []);

  const filteredArticles = articlesData
    .filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.authors.Name?.toLowerCase().includes(searchQuery.toLowerCase())||
      article.publisher?.Name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);  // Using 'createdAt' for sorting by recent
    
      if (sortOption === 'alphabetical') return a.title.localeCompare(b.title);
      return 0;
    });

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-10 ">
      <div className="mb-8 flex justify-center">
        <div className="flex items-center w-full sm:w-2/3 border-2 border-neutral-300 rounded-lg shadow-md focus-within:ring-2 focus-within:ring-blue-400">
          <input
            type="text"
            placeholder="Search articles by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-l-lg px-4 py-2 focus:outline-none"
          />
          <div className="py-3 px-4 bg-blue-500 text-white rounded-r-lg cursor-pointer">
            <IoSearch className="text-xl" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
       

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="recent">Sort by Recent</option>
          
          <option value="alphabetical">Sort Alphabetically</option>
        </select>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {currentArticles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
      
      <div className="flex items-center justify-center mt-12 space-x-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 rounded-full text-lg font-semibold transition-colors ${i + 1 === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ArticleListing;
