const NewsletterSignup = () => {
    return (
      <section className="py-12 bg-gradient-to-r from-blue-100 via-white to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated!</h2>
          <p className="text-lg text-gray-700 mb-6">
            Join our newsletter for the latest research articles .
          </p>
          <div className="flex justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-1/2 px-4 py-3 border-2 border-blue-400 rounded-l-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md transition-all duration-300 ease-in-out"
            />
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-r-lg shadow-lg hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out">
              Subscribe
            </button>
          </div>
         
        </div>
      </section>
    );
  };
  
  export default NewsletterSignup;
  