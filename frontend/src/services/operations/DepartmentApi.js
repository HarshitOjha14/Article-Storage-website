import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { departmentEndpoints } from "../apis";

const {Add_Department_API ,DELETE_Department_API,Add_HOD_API,DELETE_HOD_API} =departmentEndpoints






export const AddDepartment = async (DepartmentName, token) => {
    console.log("ye hai hamra token or data ",DepartmentName ,token )
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
    

        // Validate required fields
        if (!DepartmentName) {
            throw new Error("department name is mandatory ");
        }

        const response = await apiConnector("POST", Add_Department_API, {name:DepartmentName}, {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        });

        console.log("Add Department  API RESPONSE............", response);

        // Check if the response was successful
        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Could not add department ");
        }

        toast.success("Department Added Successfully");
        result = response?.data?.data;

    } catch (error) {
        console.log("Add Dpartment API ERROR............", error);
        toast.error(error.message || "Failed to add department");
    }

    toast.dismiss(toastId);
    return result;
};





export const deleteDepartment = async (deptId, token) => {

  try {
    console.log("dekhe token ko hi aaj ", token, deptId)
    const response = await apiConnector(
      "DELETE", DELETE_Department_API,
      { deptId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    toast.success("Department delete Successfully");
    return response.data;
  } catch (error) {
    console.error("Error in delete department  API:", error);
    throw error;
  }
};


  export const AddDepartmentHOD = async (HODEMAIL, token) => {
    console.log("ye hai hamra token or data ",HODEMAIL ,token )
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
    

        // Validate required fields
        if (!HODEMAIL) {
            throw new Error("HOD name is mandatory ");
        }

        const response = await apiConnector("POST", Add_HOD_API, {email:HODEMAIL}, {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        });

        console.log("Add HOD  API RESPONSE............", response);

        // Check if the response was successful
        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Could not add HOD Email");
        }

        toast.success("HOD Email Added Successfully");
        result = response?.data?.data;

    } catch (error) {
        console.log("Add HOD Email API ERROR............", error);
        toast.error(error.message || "Failed to add HOD Email");
    }

    toast.dismiss(toastId);
    return result;
}


export const deleteHOD = async (HODId, token) => {

  try {
    console.log("dekhe token ko ", token ,HODId)
    const response = await apiConnector(
      "DELETE", DELETE_HOD_API,
      { HODId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    toast.success("HOD delete Successfully");
    return response.data; 
  } catch (error) {
    console.error("Error in delete HOD  API:", error);
    throw error;
  }
};
