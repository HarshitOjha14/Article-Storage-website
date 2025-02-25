import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { facultyEndpoints } from "../apis";


const {

  GET_FACULTY_LIST_API,
  UPDATE_FACULTY_STATUS_API,
  DELETE_FACULTY_API,
 
} = facultyEndpoints



export function fetchFacultyList(token, navigate) {
  return async () => {
    const toastId = toast.loading("Loading Faculty List...");

    try {
      const response = await apiConnector("GET", GET_FACULTY_LIST_API, null, {
        Authorization: `Bearer ${token}`,
      });

      console.log("GET_FACULTY_LIST API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // If the API response is successful, show the success message
      toast.success("Faculty List fetched successfully!");
      // console.log("Fetched Faculty List:", response.data);

      // Return the faculty data to be handled by the calling function
      return response.data;
    } catch (error) {
      console.log("GET_FACULTY_LIST API ERROR:", error);
      toast.error("Failed to fetch faculty list.");
      return []; // Return an empty array in case of error
    } finally {
      toast.dismiss(toastId);
    }
  };
}




export function updateFacultyStatus(facultyId, newStatus, token) {
  return async () => {
    const toastId = toast.loading(`Updating Faculty Status...`);

    try {
      // Prepare the request body
      const requestBody = {
        registrationId: facultyId, // backend expects this key
        action: newStatus, // backend expects "approve" or "reject"
      };

      console.log("Request Body:", requestBody);

      // Send the PUT request
      const response = await apiConnector(
        "PUT",
        UPDATE_FACULTY_STATUS_API,
        requestBody,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("API Response:", response);

      // Handle backend response
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Unknown error");
      }

      toast.success(`Faculty status updated to ${newStatus}`);
      return response.data;
    } catch (error) {
      console.error("Error:", error); // Log the error for debugging
      toast.error("Failed to update faculty status.");
      return null;
    } finally {
      toast.dismiss(toastId); // Dismiss loading toast
    }
  };
}

export const deleteFaculty = async (facultyId, token) => {

  try {
    // console.log("dekhe token ko hi aaj ", token)
    const response = await apiConnector(
      "DELETE", DELETE_FACULTY_API,
      { facultyId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in deleteFaculty API:", error);
    throw error;
  }
};



