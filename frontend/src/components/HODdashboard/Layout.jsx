import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = ({ activeTab, handleTabClick, userName, profilePicture }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        handleTabClick={handleTabClick}
        userName={userName}
        profilePicture={profilePicture}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
