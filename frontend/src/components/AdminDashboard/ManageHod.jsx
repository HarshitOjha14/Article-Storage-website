import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { apiConnector } from "../../services/apiconnector";
import { departmentEndpoints } from "../../services/apis";
import { RiDeleteBin5Fill } from "react-icons/ri";
import CustomConfirmDialog from "../common/CustomConfirmDialog";
import { AddDepartmentHOD, deleteHOD } from "../../services/operations/DepartmentApi";

const ManageHOD = () => {
  const { token } = useSelector((state) => state.auth);
  const [hodList, setHODList] = useState([]);
  const [newHODEmail, setNewHODEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [hodToDelete, setHODToDelete] = useState(null);

  // Fetch all HODs
  const fetchHODs = async () => {
    try {
      const res = await apiConnector("GET", departmentEndpoints.SHOW_ALL_DEPARTMENT_HOD);
      if (res && res.data && res.data.departmentsHOD) {
        setHODList(res.data.departmentsHOD);
      } 
    } catch (error) {
      console.error("Could not fetch HOD emails:", error);
      
    }
  };

  useEffect(() => {
    fetchHODs();
  }, []);

  // Add a new HOD
  const handleAddHOD = async () => {
    if (!newHODEmail.trim()) {
      toast.error("HOD email cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      const res = await AddDepartmentHOD(newHODEmail, token);
      if (res && res.data) {

        const newHODEmailh = {
          _id: res.data._id,
          name: newHODEmail,
        };
        setNewHODEmail((prevList) => [...prevList, newHODEmailh]);
        toast.success("Hod added successfully!");


      }
      await fetchHODs();

      setNewHODEmail("");

    } catch (error) {
      console.error("Error adding HOD:", error);
      toast.error("Error adding HOD.");
    } finally {
      setLoading(false);
    }
  };

  // Delete an HOD with confirmation
  const handleDeleteHOD = (hodId) => {
    setHODToDelete(hodId);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDialogOpen(false);

    // Optimistically update the UI
    const previousList = [...hodList];
    setHODList((prev) => prev.filter((hod) => hod._id !== hodToDelete));

    try {
      const response = await deleteHOD(hodToDelete, token);
      if (!response || !response.success) {
        throw new Error("Deletion failed");
      }
   
    } catch (error) {
      console.error("Error deleting HOD:", error);
     

      setHODList(previousList);
    } finally {
      setHODToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
    setHODToDelete(null);
  };

  return (
    <div className="p-8 max-w-5xl ml-[20%] bg-gradient-to-r from-blue-300 via-green-200 to-yellow-200 min-h-screen text-gray-900">
      <h1 className="text-4xl font-semibold mb-8 text-center">Manage HODs</h1>
      <div className="text-lg font-medium mb-6 text-center">
        Total HODs: <span className="font-semibold">{hodList.length}</span>
      </div>

      {/* Add New HOD Form */}
      <div className="bg-white px-5 py-8 rounded-lg shadow-lg mb-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New HOD</h2>
        <div className="flex gap-4">
          <input
            type="email"
            className="border border-gray-300 px-4 py-2 rounded-md w-[90%] focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 text-gray-900 placeholder-gray-500 bg-white"
            placeholder="Enter HOD email"
            value={newHODEmail}
            onChange={(e) => setNewHODEmail(e.target.value)}
          />
          <button
            onClick={handleAddHOD}
            disabled={loading}
            className={`${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              } text-white px-10 py-2 rounded-md transition w-[20%] duration-300`}
          >
            {loading ? "Adding..." : "Add HOD"}
          </button>
        </div>
      </div>

      {/* Custom Confirmation Dialog */}
      <CustomConfirmDialog
        isOpen={isDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message={"Are you sure you want to delete this HOD?"}
      />

      {/* HODs Table */}
      {hodList.length === 0 ? (
        <p className="text-gray-600 text-center">No HODs available.</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">HODs</h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">HOD Email</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {hodList.map((hod) => (
                <tr key={hod._id} className="hover:bg-gray-50 transition duration-200">
                  <td className="border border-gray-300 px-6 py-4">{hod.email}</td>
                  <td className="border border-gray-300 px-6 py-4 flex gap-6 justify-center items-center">
                    <button
                      onClick={() => handleDeleteHOD(hod._id)}
                      className="text-2xl text-red-600 border p-2 rounded-full bg-red-100 hover:bg-red-200 hover:scale-105 transition-all duration-200"
                    >
                      <RiDeleteBin5Fill />
                    </button>
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

export default ManageHOD;
