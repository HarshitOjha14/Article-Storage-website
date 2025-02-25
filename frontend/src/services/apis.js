const BASE_URL = "http://localhost:5000/api/v1"


// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}


// Article ENDPOINTS
export const articleEndpoints = {
  GET_ALL_ARTICLE_API: BASE_URL + "/article/getArticles",
  GET_RECENT_ARTICLE_API: BASE_URL + "/article/getRecentArticle",

  GET_ARTICLE_Details_API: BASE_URL + "/article/getArticleDetails",
  GET_AUTHOR_Details_API: BASE_URL + "/article/getAuthorDetails",
  EDIT_ARTICLE_API: BASE_URL + "/article/editArticle",

  CREATE_ARTICLE_API: BASE_URL + "/article/UploadArticle",

  DELETE_ARTICLE_API: BASE_URL + "/article/deleteArticle",
  GET_FILTERED_ARTICLE_API :BASE_URL + "/article/SearchArticles",



}

//profile endpoints 

export const profileEndpoints = {
  GET_USER_ALL_DETAILS_API : BASE_URL + "/profile/getUserDetails",
  GET_FACULTY_ALL_DETAILS_BYID : BASE_URL + "/profile/getUserDetailsById",
}

export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteAccount",
 
}


export const departmentEndpoints = {
  SHOW_ALL_DEPARTMENT: BASE_URL + "/department/FetchDepartmentNames",
  SHOW_ALL_DEPARTMENT_HOD: BASE_URL + "/department/FetchDepartmentHODNames",
  Add_Department_API: BASE_URL + "/department/AddDepartment",
  DELETE_Department_API: BASE_URL + "/department/deleteDepartment",
  Add_HOD_API: BASE_URL + "/department/AddDepartmentHOD",
  DELETE_HOD_API: BASE_URL + "/department/DeleteDepartmentHOD",
 
}


export const facultyEndpoints = {
  UPDATE_FACULTY_STATUS_API: BASE_URL +"/department/updateFacultyRegistrationStatus",
  GET_FACULTY_LIST_API: BASE_URL + "/department/getFaculty",
  DELETE_FACULTY_API : BASE_URL + "/department/deleteFaculty",
  SHOW_ALL_FacultyById: BASE_URL + "/department/getFacultyByDepartment",
 
 
}