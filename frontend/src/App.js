import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Error from './components/Error'
import Login from './components/pages/Login'
import UploadArticle from './components/pages/UploadArticle'
import ArticleListing from './components/pages/ArticleListing'
import Signup from './components/pages/Signup'
import AuthorProfile from './components/pages/AuthorProfile'
import ArticleDetail from './components/pages/ArticleDetail'
import Navbar from './components/common/Navbar'
import HomePage from './components/Home'
import UserProfilePage from './components/pages/UserProfilePage'
import Footer from './components/common/Footer'
import VerifyEmail from './components/pages/VerifyEmail'
import ArticleList from './components/Article/ArticleList'
import JournalResearchArticleForm from './components/pages/UploadJournal'
import ConfrenceResearchArticleForm from './components/pages/UploadConfrence'
import SearchFilter from './components/pages/SearchFilter'
import UserFacultyDetailPage from './components/pages/UserFacultyDetailPage'



const App = () => {
  return (
    <div >
       <Navbar/>
      <Routes>
       
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/uploadArticle' element={<UploadArticle/>}/>
        <Route path='/articles' element={<ArticleListing/>}/>
        <Route path='/authorProfile/:authorId' element={<AuthorProfile/>}/>
        <Route path='/article/:articleId' element={<ArticleDetail/>}/>
        <Route path='/uploadArticle/Journal' element={<JournalResearchArticleForm/>}/>
        <Route path='/uploadArticle/Confrence' element={<ConfrenceResearchArticleForm/>}/>
        <Route path='/myProfile' element={<UserProfilePage/>}/>
        <Route path='/VerifyEmail' element={<VerifyEmail/>}/>
        <Route path='/tt' element={<ArticleList/>}/>
        <Route path='/SearchArticle' element={<SearchFilter/>}/>
        <Route path='/facultyPage/:facultyId'  element={<UserFacultyDetailPage/>}/>
        <Route path='*' element={<Error />} />
      </Routes>
      {/* <Footer/> */}
    </div>
  )
}

export default App