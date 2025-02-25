import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdArticle } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { logout } from "../../services/operations/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiSolidCategory } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";

const Sidebar = ({ activeTab, handleTabClick, userName, profilePicture, accountType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-gray-800 text-white p-5 fixed h-full">
      <div className="text-center mb-6">
        <img
          src={profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto border-2 border-gray-400"
        />
        <h3 className="text-xl font-semibold mt-2">{userName}</h3>
      </div>
      <nav>
        <ul>
          {/* My Profile */}
          <li>
            <button
              onClick={() => handleTabClick("profile")}
              className={`block w-full text-left px-4 py-2 mb-2 rounded-md ${activeTab === "profile" ? "bg-purple-600" : "hover:bg-gray-700"
                }`}
            >
              <span className="flex items-center gap-2">
                <CgProfile className="text-xl" /> My Profile
              </span>
            </button>
          </li>
          {accountType === "Faculty" && (
          <li>
            <button
              onClick={() => handleTabClick("ManageArticle")}
              className={`block w-full text-left px-4 py-2 mb-2 rounded-md ${activeTab === "ManageArticle" ? "bg-purple-600" : "hover:bg-gray-700"
                }`}
            >
              <span className="flex items-center gap-2">
                <CgProfile className="text-xl" />Manage Articles
              </span>
            </button>
          </li>)}

          {/* Manage Faculty - HOD Specific */}
          {accountType === "HOD" && (
            <li>
              <button
                onClick={() => handleTabClick("manageFaculty")}
                className={`block w-full text-left px-4 py-2 mb-2 rounded-md ${activeTab === "manageFaculty" ? "bg-purple-600" : "hover:bg-gray-700"
                  }`}
              >
                <span className="flex items-center gap-2">
                  <FaUsers className="text-xl" /> Manage Faculty
                </span>
              </button>
            </li>
          )}

          {/* Department Articles - HOD Specific */}
          {accountType === "HOD" && (
            <li>
              <button
                onClick={() => handleTabClick("departmentArticles")}
                className={`block w-full text-left px-4 py-2 mb-2 rounded-md ${activeTab === "departmentArticles" ? "bg-purple-600" : "hover:bg-gray-700"
                  }`}
              >
                <span className="flex items-center gap-2">
                  <MdArticle className="text-xl" /> Department Articles
                </span>
              </button>
            </li>
          )}


          {/* Manage Faculty - HOD Specific */}
          {accountType === "Admin" && (
            <li>
              <button
                onClick={() => handleTabClick("managedepartment")}
                className={`block w-full text-left px-4 py-2 mb-2 rounded-md ${activeTab === "managedepartment" ? "bg-purple-600" : "hover:bg-gray-700"
                  }`}
              >
                <span className="flex items-center gap-2">
                  <BiSolidCategory className="text-xl" /> Manage Department
                </span>
              </button>
            </li>
          )}

          {accountType === "Admin" && (
            <li>
              <button
                onClick={() => handleTabClick("manageHod")}
                className={`block w-full text-left px-4 py-2 mb-2 rounded-md ${activeTab === "manageHod" ? "bg-purple-600" : "hover:bg-gray-700"
                  }`}
              >
                <span className="flex items-center gap-2">
                  <IoIosPeople className="text-xl" /> Manage HOD'S
                </span>
              </button>
            </li>
          )}

          {/* Settings */}
          {accountType !== "Admin" && (
            <li>
              <button
                onClick={() => handleTabClick("settings")}
                className={`block w-full text-left px-4 py-2 mb-2 rounded-md ${activeTab === "settings" ? "bg-purple-600" : "hover:bg-gray-700"
                  }`}
              >
                <span className="flex items-center gap-2">
                  <IoSettingsOutline className="text-xl" /> Settings
                </span>
              </button>
            </li>)}

          {accountType === "Admin" && (
            <li>
              <button
                onClick={() => handleTabClick("changeAdminPassword")}
                className={`block w-full text-left px-4 py-2 mb-2 rounded-md ${activeTab === "changeAdminPassword" ? "bg-purple-600" : "hover:bg-gray-700"
                  }`}
              >
                <span className="flex items-center gap-2">
                  <RiLockPasswordLine className="text-xl" /> Change Password
                </span>
              </button>
            </li>
          )}

          {/* Logout */}
          <li>
            <button
              onClick={() => {
                dispatch(logout(navigate));
              }}
              className="block w-full font-semibold text-left px-4 py-2 mb-2 rounded-md bg-red-500 hover:text-black hover:bg-red-300"
            >
              <span className="flex items-center gap-2">
                <CiLogout className="text-xl font-bold" /> Logout
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
