import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { AddDepartment, deleteDepartment } from "../../services/operations/DepartmentApi";
import { apiConnector } from "../../services/apiconnector";
import { departmentEndpoints } from "../../services/apis";
import { RiDeleteBin5Fill } from "react-icons/ri";
import CustomConfirmDialog from "../common/CustomConfirmDialog";

const ManageDepartment = () => {
    const { token } = useSelector((state) => state.auth);
    const [departmentList, setDepartmentList] = useState([]);
    const [newDepartmentName, setNewDepartmentName] = useState("");
    const [loading, setLoading] = useState(false);

    // State to manage confirmation dialog
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [departmentToDelete, setDepartmentToDelete] = useState(null);

    // Fetch all departments
    const fetchDepartments = async () => {
        try {
            const res = await apiConnector("GET", departmentEndpoints.SHOW_ALL_DEPARTMENT);
            console.log("Fetched departments: ", res.data);
            setDepartmentList(res.data.departments);
        } catch (error) {
            console.error("Could not fetch department names.", error);
            toast.error("Error fetching departments.");
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    // Add a new department
    const handleAddDepartment = async () => {
        if (!newDepartmentName) {
            toast.error("Department name cannot be empty.");
            return;
        }

        setLoading(true);
        try {
            const res = await AddDepartment(newDepartmentName, token);
            if (res && res.data) {
                const newDepartment = {
                    _id: res.data._id,
                    name: newDepartmentName,
                };
                setDepartmentList((prevList) => [...prevList, newDepartment]);
                toast.success("Department added successfully!");
            }

            await fetchDepartments();
            setNewDepartmentName("");
        } catch (error) {
            console.error("Error adding department:", error);
            toast.error("Error adding department.");
        } finally {
            setLoading(false);
        }
    };

    // Delete a department with confirmation
    const handleDeleteDepartment = (departmentId) => {
        setDepartmentToDelete(departmentId);
        setDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        setDialogOpen(false);

        // Optimistically update UI
        const previousList = [...departmentList];
        setDepartmentList((prev) => prev.filter((department) => department._id !== departmentToDelete));

        try {
            const response = await deleteDepartment(departmentToDelete, token);
            if (!response || !response.success) {
                throw new Error("Deletion failed");
            }
            toast.success("Department deleted successfully!");
        } catch (error) {
            console.error("Error deleting department:", error);
   
        } finally {
            setDepartmentToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setDialogOpen(false);
        setDepartmentToDelete(null);
    };

    return (
        <div className="p-8 max-w-5xl ml-[20%] bg-gradient-to-r from-purple-300 via-pink-200 to-red-200 min-h-screen text-gray-900">
            <h1 className="text-4xl font-semibold mb-8 text-center">Manage Departments</h1>
            <div className="text-lg font-medium mb-6 text-center">
                Total Departments: <span className="font-semibold">{departmentList.length}</span>
            </div>

            {/* Add New Department Form */}
            <div className="bg-white px-5 py-8 rounded-lg shadow-lg mb-8 max-w-5xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Department</h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        className="border border-gray-300 px-4 py-2 rounded-md w-[90%] focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200 text-gray-900 placeholder-gray-500 bg-white"
                        placeholder="Enter department name"
                        value={newDepartmentName}
                        onChange={(e) => setNewDepartmentName(e.target.value)}
                    />
                    <button
                        onClick={handleAddDepartment}
                        disabled={loading}
                        className={`${loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
                            } text-white px-10 py-2 rounded-md transition duration-300`}
                    >
                        {loading ? "Adding..." : "AddDepartment"}
                    </button>
                </div>
            </div>

            {/* Custom Confirmation Dialog */}
            <CustomConfirmDialog
                isOpen={isDialogOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                message={"Are you sure you want to delete this department?"}
            />

            {/* Departments Table */}
            {departmentList.length === 0 ? (
                <p className="text-gray-600 text-center">No departments available.</p>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Departments</h2>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left">Department Name</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {departmentList.map((department) => (
                                <tr key={department._id} className="hover:bg-gray-50 transition duration-200">
                                    <td className="border border-gray-300 px-6 py-4">{department.name}</td>
                                    <td className="border border-gray-300 px-6 py-4 flex gap-6 justify-center items-center">
                                        <button
                                            onClick={() => handleDeleteDepartment(department._id)}
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

export default ManageDepartment;
