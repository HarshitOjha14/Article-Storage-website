import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-16">
      <div className="container mx-auto px-4 text-center">
       
        <h1 className="text-5xl font-extrabold mb-6  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Store and Share Your Department's Research Easily
        </h1>
       
        <p className="mt-4 text-xl font-light mb-8 max-w-2xl mx-auto">
          Browse a growing collection of research articles or upload your own.
        </p>
       
        
       <Link to={'/articles'}>
        <button className="mt-6 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-lg font-semibold shadow-lg transition duration-300 transform hover:scale-105">
          Explore Articles
        </button></Link>
      </div>
    
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-10 left-10 bg-white h-72 w-72 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 right-10 bg-purple-400 h-72 w-72 rounded-full filter blur-3xl opacity-20"></div>
      </div>
    </section>
  );
};

export default HeroSection;
