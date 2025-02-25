
const express = require("express")
const router = express.Router()


const { auth, isHOD } = require("../middleware/auth")
const { getUserAllDetails, deleteAccount, updateProfile, getUserAllDetailsbyId } = require("../controllers/Profile")




router.get('/getUserDetails' , auth , getUserAllDetails)
router.delete('/deleteAccount', auth , deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.post("/getUserDetailsById", auth,isHOD, getUserAllDetailsbyId)

module.exports = router