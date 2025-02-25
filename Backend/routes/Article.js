
const express = require("express")
const router = express.Router()



const { createArticle, editArticle, getAllArticles, deleteArticle, getArticleDetails, getAuthorDetails, getRecentArticles, searchArticles} = require("../controllers/Article")
const { auth } = require("../middleware/auth")


// article

router.post('/UploadArticle' ,auth, createArticle)
router.put('/editArticle' ,auth, editArticle)
router.get('/getArticles' , getAllArticles)
router.get('/getRecentArticle' , getRecentArticles)
router.post('/getArticleDetails' , getArticleDetails)
router.post('/getAuthorDetails' , getAuthorDetails)
router.post('/deleteArticle' , auth , deleteArticle)
router.post('/SearchArticles' , searchArticles)
module.exports = router