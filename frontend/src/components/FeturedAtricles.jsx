import { useEffect, useState } from "react";
import FeaturedArticleCard from "./Article/FeaturedArticleCard";
import { getRecentArticles } from "../services/operations/articleApi";

const FeaturedArticles = () => {


  const [articles, setArticles] = useState([]);
  const fetchRecentArticle = async () => {
    const res = await getRecentArticles();
    console.log("ye hai appka recent articles res", res)
    setArticles(res)


  }

  useEffect(() => {
    fetchRecentArticle()
  }, [])

  const displayedArticles = articles.slice(0, 6);

  return (
    <section className="py-16 border-2 bg-gradient-to-b from-white to-gray-500 relative">
      <div className="absolute inset-0 opacity-50">
        <img
          src="https://thumbs.wbm.im/pw/small/944b0f658596e157096c4714df6f790e.jpg"
          alt="Books"
          className="w-full h-full "
        />
      </div>
      <div className="absolute inset-0 opacity-50 bg-black ">

      </div>
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Recent Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArticles?.map((article, index) => (
            <div key={index}>
              <FeaturedArticleCard article={article} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
