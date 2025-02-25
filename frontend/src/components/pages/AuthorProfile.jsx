import React, { useEffect, useState } from 'react'
import AuthorProfileCard from '../Profile/AuthorProfileCard'
import { fetchAuthorDetails } from '../../services/operations/articleApi';
import { useParams } from 'react-router-dom';
// const author = {
//     name: "John Doe",
//     profileImg: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/d664ddb1-a0c9-41cb-8ad7-53e323e5502d/e9df037a-8347-417b-af5c-0332420122df.png",
//     bio: "John is a software developer and writer who specializes in JavaScript and React. He has over 10 years of experience in the tech industry and enjoys sharing knowledge through articles and tutorials.",
//     email: "johndoe@example.com",
//     articles: [
//         { id: 1, title: "Understanding React Hooks", date: "2023-10-01", excerpt: "An in-depth guide to using hooks in React for better component functionality." },
//         { id: 2, title: "Advanced CSS Techniques", date: "2023-09-15", excerpt: "Explore the latest CSS techniques for creating responsive and dynamic web layouts." },
//         { id: 3, title: "JavaScript Performance Tips", date: "2023-08-30", excerpt: "Optimize your JavaScript code with these essential performance tips." },
//         { id: 4, title: "Mastering Async in JavaScript", date: "2023-07-12", excerpt: "Learn how to handle asynchronous code like a pro." },
//         { id: 5, title: "Styling Components with Tailwind CSS", date: "2023-06-05", excerpt: "A comprehensive guide to using Tailwind CSS in React projects." }
//     ],
//     githuburl: "https://github.com",
//     facebookurl: "https://facebook.com",
//     instagramurl: "https://instagram.com",
//     Linkedinurl: "https://linkedin.com"
// };



const AuthorProfile = () => {
  
  const [author , setAuthor] = useState([]);

  const {authorId} = useParams()
  





  useEffect(() => {
  
    ; (async () => {
      try {
        const res = await fetchAuthorDetails(authorId);
        console.log("ye hai author",res.data);
        setAuthor(res.data)
      } catch (error) {
        console.log("Could not fetch Author Details")
      }
    })()
  }, [authorId])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-300 to-gray-200 py-10">
        <AuthorProfileCard author={author}/>
    </div>
  )
}

export default AuthorProfile