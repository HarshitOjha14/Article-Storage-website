import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"

import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"
import { setUser } from "../../slices/profileSlice"
import { Navigate } from "react-router-dom"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/VerifyEmail")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

// export function signUp(
//   Name,
//       email,
//       password,
//       confirmPassword,
//       department,
//       role,
// ) {
//   return async (dispatch) => {
//     console.log("Role is being passed correctly to signUp:",Name,
//       email,
//       password,
//       confirmPassword,
//       department, role); 

//     // Show loading toast
//     const toastId = toast.loading("Loading...");
//     dispatch(setLoading(true));

//     try {
//       // API call for signup
//       const response = await apiConnector("POST", SIGNUP_API, {
//         Name,
//         email,
//         password,
//         confirmPassword,
//         accountType:role, 
//         department,

//       });

//       console.log("SIGNUP API RESPONSE:", response); // Debug response

//       // Check if response is successful
//       if (!response.data.success) {
//         throw new Error(response.data.message || "Unknown error occurred");
//       }

//       // Show success message and navigate
//       toast.success("Signup Successful");
//       Navigate("/login");
//     } catch (error) {
//       console.error("SIGNUP API ERROR:", error); // Debug error
//       toast.error("Signup Failed: " + (error.message || "Something went wrong"));
//     } finally {
//       dispatch(setLoading(false)); // Stop loading
//       toast.dismiss(toastId); // Dismiss toast
//     }
//   };
// }

export function signUp(
  Name,
  email,
  password,
  confirmPassword,
  department,
  role,
  otp,

) {
  console.log(Name,
    email,
    password,
    confirmPassword,
    department,
    role,
    otp,)
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        Name,
        email,
        password,
        confirmPassword,
        accountType: role,
        department,
        otp,
      })


      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      // navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      // navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}



export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.Name} `
      dispatch(setUser({ ...response.data.user, image: userImage }))

      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/myProfile")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))

    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}