import { apiConnector } from "../apiconnector";
import { articleEndpoints } from "../apis";
import toast from "react-hot-toast";


const {
    GET_ALL_ARTICLE_API,
    EDIT_ARTICLE_API,
    CREATE_ARTICLE_API,
    DELETE_ARTICLE_API,
    GET_ARTICLE_Details_API,
    GET_AUTHOR_Details_API,
    GET_RECENT_ARTICLE_API,
    GET_FILTERED_ARTICLE_API
} = articleEndpoints


export const addArticle = async (data, token) => {
  console.log("ye hai hamra token or data " , data.type)
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const {
      title,
      authors,
      type,
      journalName,
      conferenceName,
      volume,
      issue,
      pageNoStart,
      pageNoEnd,
      link,
      month,
      year,
    } = data;

    // Validate required fields
    if (!title || !authors || !type) {
      throw new Error("Title, Authors, and Type are mandatory fields");
    }

    // Validate type-specific fields
    if (type === "Journal") {
      if (!journalName) {
        throw new Error("Journal name is required for journal articles");
      }
      
    }

    if (type === "Conference") {
      if (!conferenceName) {
        throw new Error("Conference name is required for conference articles");
      }
    }

    // Send data to the backend API
    const response = await apiConnector("POST", CREATE_ARTICLE_API, data, {
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}`,
    });

    console.log("CREATE ARTICLE API RESPONSE............", response);

    // Check if the response was successful
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not add article details");
    }

    toast.success("Article Uploaded Successfully");
    result = response?.data?.data;

  } catch (error) {
    console.log("CREATE ARTICLE API ERROR............", error);
    toast.error(error.message || "Failed to upload article");
  }

  toast.dismiss(toastId);
  return result;
};




export const getAllArticles = async () => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      const response = await apiConnector("GET", GET_ALL_ARTICLE_API)
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Article")
      }
      result = response?.data?.data
    } catch (error) {
      console.log("GET_ALL_ARTICLE_API API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

export const fetchArticleDetails = async (articleId) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
      const response = await apiConnector("POST", GET_ARTICLE_Details_API, {
        articleId,
      })
      console.log("ARTICLE_DETAILS_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data
    } catch (error) {
      console.log("ARTICLE_DETAILS_API API ERROR............", error)
      result = error.response.data
      // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
  }

  export const fetchAuthorDetails = async (authorId) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
      const response = await apiConnector("POST", GET_AUTHOR_Details_API, {
        authorId,
      })
      console.log("AUTHOR_DETAILS_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data
    } catch (error) {
      console.log("AUTHOR_DETAILS_API API ERROR............", error)
      result = error.response.data
      // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
  }


  export const getRecentArticles = async () => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      const response = await apiConnector("GET", GET_RECENT_ARTICLE_API)
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Recent Article")
      }
      result = response?.data?.data
    } catch (error) {
      console.log("GET_RECENT_ARTICLE_API API ERROR............", error)
      // toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  // delete a article
  export const deleteArticle = async (ArticleId, token) => {
    const toastId = toast.loading("Loading...");
    console.log("hii mein hu ", ArticleId, token);
  
    try {
      const response = await apiConnector("POST", DELETE_ARTICLE_API, {ArticleId},{
        
        Authorization: `Bearer ${token}`,
      });
      console.log("DELETE ARTICLE API RESPONSE............", response);
  
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Article");
      }
  
      toast.success("Article Deleted");
    } catch (error) {
      console.log("DELETE ARTICLE API ERROR............", error);
      // Using error?.response?.data?.message is better for detailed errors from the server
      toast.error(error?.message || "An unexpected error occurred.");
    }
  
    toast.dismiss(toastId);
  };
  

  export const getFilteredArticles = async (departmentId,facultyId,fromDate,toDate,type) => {
    // console.log("ye sb to arh h bhai ",departmentId,facultyId,fromDate,toDate,type)
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      const response = await apiConnector("POST", GET_FILTERED_ARTICLE_API , {departmentId,facultyId,fromDate,toDate,type})
      console.log("ye hai response ",response.data.articles)
      
      result = response?.data?.articles
    } catch (error) {
      console.log("GET_FILTERED_ARTICLE_API API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }