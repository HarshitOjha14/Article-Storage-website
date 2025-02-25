import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Profile/Sidebar";
import ProfileSection from "../Profile/ProfileSection";
import ArticlesSection from "../Profile/ArticleSection";
import ManageArticlesSection from "../Profile/ManageArticleSection";
import SettingsSection from "../Profile/SettingSection";
import { fetchUserAllDetails } from "../../services/operations/profileApi";
import { deleteArticle } from "../../services/operations/articleApi";
import { toast } from "react-hot-toast";
import ManageFaculty from "../HODdashboard/ManageFaculty";
import DepartmentArticleAnalysis from "../HODdashboard/DepartmentArticleAnalysis";
import ManageDepartment from "../AdminDashboard/ManageDepartment";
import AdminSetting from "../AdminDashboard/AdminSetting";
import ManageHod from "../AdminDashboard/ManageHod";

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userDetails, setUserDetails] = useState(null); // Default to null to avoid rendering before data is fetched
  const [uploadedArticles, setUploadedArticles] = useState([]);

  const { token } = useSelector((state) => state.auth); 
  const user = useSelector((state) => state.profile.user); // User details from Redux store
//  console.log("ye hai user ji ",user.accountType)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch user details using Redux action and update local state
  const getUserDetails = async () => {
    try {
      await dispatch(fetchUserAllDetails(token, navigate));
    } catch (error) {
      console.error("Could not fetch user details:", error);
    }
  };

  // Handle delete article
  const handleDeleteArticle = async (articleId) => {
    try {
      
      const response = await deleteArticle(articleId, token);
      if (response?.success) {
    
        setUploadedArticles((prevArticles) =>
          prevArticles.filter((article) => article._id !== articleId)
        );
      } 
    } catch (error) {
      console.log("Error deleting article:", error);
      
    }
  };

  useEffect(() => {
    if (token) {
      getUserDetails();
    }
  }, [token]); 

  useEffect(() => {
    if (user) {
      setUserDetails(user); 
      setUploadedArticles(user.articles || []); 
    }
  }, [user]); 

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleEditProfile = () => {
    setActiveTab("settings"); // Switch to the Settings section
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar Component */}
      <Sidebar
       accountType={user.accountType}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
        userName={userDetails?.Name} // Optional chaining to avoid errors before data is loaded
        profilePicture={userDetails?.image}
      />

      {/* Main Content Section */}
      <div className="flex-1 p-10">
        {activeTab === "profile" && userDetails && (
          <ProfileSection
            userDetails={userDetails}
            onEditProfile={handleEditProfile}
          />

        )}
       {activeTab === "ManageArticle" && <ArticlesSection uploadedArticles={uploadedArticles} handleDeleteArticle={handleDeleteArticle} />}
        {activeTab === "settings" && <SettingsSection userDetails={userDetails} />}
        {activeTab === "manageFaculty" && <ManageFaculty/>}
        {activeTab === "departmentArticles" && <DepartmentArticleAnalysis/>}
        {activeTab === "managedepartment" && <ManageDepartment/>}
        {activeTab === "changeAdminPassword" && <AdminSetting/>} 
        {activeTab === "manageHod" && <ManageHod/>} 
      </div>
    </div>
  );
};

export default UserProfilePage;
