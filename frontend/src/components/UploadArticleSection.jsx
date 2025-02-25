import { Link } from "react-router-dom";

const UploadArticleSection = () => {
    return (
      <section className="py-16 bg-gradient-to-r from-green-100 via-white to-green-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Share Your Research?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Contribute to our growing collection by uploading your articles and let others explore your work.
          </p>
          <div className="relative inline-block">
            <Link to={'/uploadArticle'}>
            <button className="px-8 py-4 bg-green-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-300 ease-in-out">
              Upload Article
            </button>
            </Link>
          
          </div>
          <p className="mt-4 text-sm text-gray-500">
            It's fast, secure, and helps your research reach a wider audience.
          </p>
        </div>
      </section>
    );
  };
  
  export default UploadArticleSection;
  