import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";  // Assuming you're still using this for token access
import { deleteFaculty, fetchFacultyList, updateFacultyStatus } from "../../services/operations/facultyApi";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
const ManageFaculty = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [pendingFacultyList, setPendingFacultyList] = useState([]);
  const { token } = useSelector((state) => state.auth);

  

  // Fetch Faculty List
  const getFacultyList = async () => {
    try {
      if (token) {
        // Call fetchFacultyList and await the result
        const response = await fetchFacultyList(token)();
        const { faculty, pendingFaculty } = response;

        if (faculty && faculty.length > 0) {
          setFacultyList(faculty);  // Update approved faculty list
        } else {
          setFacultyList([]);
        }

        if (pendingFaculty && pendingFaculty.length > 0) {
          setPendingFacultyList(pendingFaculty);  // Update pending faculty list
        } else {
          setPendingFacultyList([]);
        }
      } else {
        toast.error("Token is missing.");
      }
    } catch (error) {
      console.error("Error fetching faculty list:", error);
      toast.error("An error occurred while fetching faculty data.");
    }
  };

  const handleUpdateStatus = async (facultyId, newStatus) => {
    try {
      const response = await updateFacultyStatus(facultyId, newStatus, token)();
  
      // Debug response
      console.log("API Response in handleUpdateStatus:", response);
  
      if (response?.success) {
        toast.success(`Faculty ${newStatus} successfully!`);
  
        // Optionally update local state to reflect changes
        if (newStatus === "approve") {
          // Move faculty from pending list to approved list
          setFacultyList((prev) => {
            const approvedFaculty = pendingFacultyList.find(
              (faculty) => faculty._id === facultyId
            );
            return approvedFaculty ? [...prev, approvedFaculty] : prev;
          });
  
          // Remove faculty from pending list
          setPendingFacultyList((prev) =>
            prev.filter((faculty) => faculty._id !== facultyId)
          );
        } else if (newStatus === "reject") {
          // Remove faculty from pending list only
          setPendingFacultyList((prev) =>
            prev.filter((faculty) => faculty._id !== facultyId)
          );
        }
      }
    } catch (error) {
      console.error("Error updating faculty status:", error);
    }
  };

  const handleDeleteFaculty = async (facultyId) => {
    try {
      const confirmation = window.confirm("Are you sure you want to delete this faculty?");
      if (!confirmation) return;
  
      // Assuming you have a service to delete faculty
      const response = await deleteFaculty(facultyId, token); // Make sure to implement `deleteFacultyById` in your API service
      
       // Remove the deleted faculty from both lists
        setFacultyList((prev) => prev.filter((faculty) => faculty._id !== facultyId));
        setPendingFacultyList((prev) => prev.filter((faculty) => faculty._id !== facultyId));
      
    } catch (error) {
      console.error("Error deleting faculty:", error);
      toast.error("An error occurred while deleting faculty.");
    }
  };
  
  
  
  

  useEffect(() => {
    if (token) {
      getFacultyList();
    }
  }, [token]);

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-100 min-h-screen">
  <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">Manage Faculty</h1>
  <div className="text-lg font-medium mb-6 text-gray-700 text-center">
      Total Faculty:  <span className="text-lg font-semibold text-purple-600">{facultyList.length}</span> 
    </div>
  {/* Approved Faculty Table */}
  {facultyList.length === 0 ? (
    <p className="text-gray-700 text-center">No approved faculty data available.</p>
  ) : (
    <div className="bg-white p-6 rounded-lg shadow-xl mb-8">

      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Approved Faculty</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-6 py-3 text-left text-gray-700">Name</th>
            <th className="border border-gray-300 px-6 py-3 text-left text-gray-700">Email</th>
            <th className="border border-gray-300 px-6 py-3 text-left text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {facultyList.map((faculty) => (
            <tr key={faculty._id} className="hover:bg-gray-50 transition duration-300">
              <td className="border border-gray-300 px-6 py-4">{faculty.Name}</td>
              <td className="border border-gray-300 px-6 py-4">{faculty.email}</td>
              <td className="border border-gray-300 px-6 py-4 flex gap-7 justify-center items-center">
                <div  className="text-2xl text-yellow-700 border p-1 rounded-full bg-yellow-100 hover:scale-105 transition-all duration-200"><Link to={`/facultyPage/${faculty._id}`} ><FaEye   /></Link></div>
                <div className="text-2xl text-red-400 border p-1 rounded-full bg-red-100 hover:scale-105 transition-all duration-200"><MdDelete onClick={() => handleDeleteFaculty(faculty._id)} /></div>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {/* Pending Faculty Table */}
  {pendingFacultyList.length === 0 ? (
    <p className="text-gray-700 text-center">No pending faculty data available.</p>
  ) : (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Pending Faculty</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-6 py-3 text-left text-gray-700">Name</th>
            <th className="border border-gray-300 px-6 py-3 text-left text-gray-700">Email</th>
            <th className="border border-gray-300 px-6 py-3 text-left text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingFacultyList.map((faculty) => (
            <tr key={faculty._id} className="hover:bg-gray-50 transition duration-300">
              <td className="border border-gray-300 px-6 py-4">{faculty.Name}</td>
              <td className="border border-gray-300 px-6 py-4">{faculty.email}</td>
              <td className="border border-gray-300 px-6 py-4">
                <select
                  className="border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-indigo-500 transition duration-200"
                  onChange={(e) => handleUpdateStatus(faculty._id, e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Action
                  </option>
                  <option value="approve">Approve</option>
                  <option value="reject">Reject</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  );
};

export default ManageFaculty;
