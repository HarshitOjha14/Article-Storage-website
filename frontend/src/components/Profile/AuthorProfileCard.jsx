import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin , FaFacebook , FaInstagram , FaTwitter} from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

const truncateContent = (content, maxWords) => {
    const words = content.split(" ");
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(" ") + " ...";
    }
    return content;
};

const AuthorProfileCard = ({ author }) => {
    const [showAll, setShowAll] = useState(false);

    const displayedArticles = showAll ? author.articles : author?.articles?.slice(0, 3);

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col items-center text-center mb-8">
                <img
                    src={author.image}
                    alt="Author"
                    className="w-36 h-36 rounded-full border-4 border-teal-500 shadow-cyan-300 shadow-md mb-4 transition-transform duration-200 hover:scale-105"
                />
                <h2 className="text-4xl font-semibold text-gray-800">{author.Name}</h2>
                <p className="text-gray-600 mt-3 max-w-lg text-lg leading-relaxed">
                    {author?.additionalDetails?.about}
                </p>
            </div>

            <div className="mt-10">
                <h3 className="text-2xl font-semibold text-gray-700 mb-5">Published Articles</h3>
                <ul className="space-y-5">
                    {displayedArticles?.map((article) => (
                        <li
                            key={article.id}
                            className="border p-5 shadow-sm rounded-xl hover:shadow-lg transition-shadow duration-300"
                        >
                            <Link
                                to={`/article/${article._id}`}
                                className="text-lg font-semibold text-blue-600 hover:text-blue-800"
                            >
                                {article.title}
                            </Link>
                            <p className="text-sm text-gray-500">
                                Published on {new Date(article.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600 mt-1">
                                {/* {truncateContent(article.introduction, 35)} */}
                            </p>
                        </li>
                    ))}
                </ul>

                <div className="mt-5 text-center">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-blue-600 font-semibold hover:text-blue-800 transition duration-200"
                    >
                        {showAll ? "Show Less" : "See More"}
                    </button>
                </div>
            </div>

            <div className="mt-12 text-center">
                <h4 className="text-xl font-semibold text-gray-700 mb-5">Follow {author.name}</h4>
                <div className="flex justify-center space-x-6 mb-5">
                    <Link
                        to={author?.additionalDetails?.linkedinUrl}
                        target="_blank"
                        className="text-blue-700 hover:text-blue-800 text-3xl transition-all duration-300 hover:scale-110"
                    >
                        <FaLinkedin />
                    </Link>
                    <Link
                        to={author?.additionalDetails?.facebookUrl}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-800 text-3xl transition-all duration-300 hover:scale-110"
                    >
                        <FaFacebook />
                    </Link>
                    <Link
                        to={author?.additionalDetails?.instagramUrl}
                        target="_blank"
                        className="text-pink-500 hover:text-pink-700 text-3xl transition-all duration-300 hover:scale-110"
                    >
                        <FaInstagram />
                    </Link>
                    <Link
                        to={author?.additionalDetails?.twitterUrl}
                        target="_blank"
                        className="text-cyan-400 hover:text-cyan-500 text-3xl transition-all duration-300 hover:scale-110"
                    >
                        <FaTwitter />
                    </Link>
                </div>

                <div className="mt-6 text-center flex justify-center items-center gap-3">
                    <p className="text-gray-700 text-lg">Contact Publisher:</p>
                    <Link
                        to={`mailto:${author.email}`}
                        className="flex items-center justify-center text-teal-500 hover:text-teal-700 text-3xl transition-all duration-300 hover:scale-110"
                    >
                        <MdMailOutline className="" />
                        <span className="text-lg font-semibold">Send Email</span>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default AuthorProfileCard;
