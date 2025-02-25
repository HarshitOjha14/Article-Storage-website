import React, { useEffect, useState } from 'react'
import ArticleDetailCard from '../Article/ArticleDetailCard'
import { fetchArticleDetails } from '../../services/operations/articleApi';
import { useParams } from 'react-router-dom';
// import { article } from '../../constantss/Article'


const ArticleDetail = () => {
  const [article , setArticle] = useState([]);

  const {articleId} = useParams()

  console.log("ye hai article id" , articleId)


  useEffect(() => {
   
    ; (async () => {
      try {
        const res = await fetchArticleDetails(articleId)
      //  console.log("hello ji ",res.data.articleDetails.title)
        setArticle(res.data.articleDetails)
      } catch (error) {
        console.log("Could not fetch Article Details")
      }
    })()
  }, [articleId])

  return (
    <div>
        <ArticleDetailCard article={article}/>
    </div>
  )
}

export default ArticleDetail