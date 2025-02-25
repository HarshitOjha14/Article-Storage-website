const PlatformFeaturesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          Powerful Platform Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-2 duration-300">
            <div className="mb-4 text-green-600 text-4xl">
              <i className="fas fa-book"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Department-Wide Article Repository
            </h3>
            <p className="text-gray-600">
              A centralized platform to store and access research articles from across the department, ensuring seamless collaboration and sharing.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-2 duration-300">
            <div className="mb-4 text-orange-600 text-4xl">
              <i className="fas fa-file-alt"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Easy Article Upload with Templates
            </h3>
            <p className="text-gray-600">
              Simplify uploads with pre-designed templates for metadata entry, including fields for keywords, topics, and authorship details.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-2 duration-300">
            <div className="mb-4 text-purple-500 text-4xl">
              <i className="fas fa-filter"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Advanced Filtering and Search
            </h3>
            <p className="text-gray-600">
              Quickly find articles with powerful filtering options by category, keywords, publication year, and more.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-2 duration-300">
            <div className="mb-4 text-blue-600 text-4xl">
              <i className="fas fa-cloud"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Secure Cloud Storage
            </h3>
            <p className="text-gray-600">
              Store research articles securely in the cloud with options for version control and global accessibility.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-2 duration-300">
            <div className="mb-4 text-red-600 text-4xl">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Visit Article Publisher Profile
            </h3>
            <p className="text-gray-600">
              You can view the publisher's profile and their published articles.
            </p>
          </div>


          {/* Feature 6 */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-2 duration-300">
            <div className="mb-4 text-yellow-600 text-4xl">
              <i className="fas fa-users"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Personal Dashboard
            </h3>
            <p className="text-gray-600">
              The Personal Dashboard is designed to give users full control over their profile and content management.

            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PlatformFeaturesSection;
