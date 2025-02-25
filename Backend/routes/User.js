
const express = require("express")
const router = express.Router()

const {
 
  sendOTP,
  signup,
  login,
  changePassword,
 
 
} = require("../controllers/Auth")
const { auth } = require("../middleware/auth")
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword")





// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP)
router.post("/signup", signup)
router.post("/login", login)
router.post("/changePassword",auth, changePassword)






module.exports = router