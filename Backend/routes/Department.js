
const express = require("express")
const router = express.Router()




const { auth, isAdmin, isHOD } = require("../middleware/auth")
const { AddDepartment, fetchDepartmentNames, deleteFaculty, approveFacultyRegistration, getFaculty, getFacultyByDepartment, AddDepartmentHOD, fetchDepartmentHODNames, deleteDepartment, deleteHOD } = require("../controllers/Deparment")


// article

router.post('/AddDepartment' ,auth, isAdmin, AddDepartment)
router.post('/AddDepartmentHOD' ,auth, isAdmin, AddDepartmentHOD)
router.get('/FetchDepartmentNames' , fetchDepartmentNames)
router.get('/FetchDepartmentHODNames' , fetchDepartmentHODNames)
router.delete('/deleteFaculty' ,auth,isHOD,  deleteFaculty)
router.delete('/deleteDepartment' ,auth,isAdmin,  deleteDepartment)
router.delete('/DeleteDepartmentHOD' ,auth,isAdmin,  deleteHOD)
router.put('/updateFacultyRegistrationStatus', auth ,isHOD, approveFacultyRegistration)
router.get('/getFaculty',auth,isHOD,getFaculty)
router.get('/getFaculty',auth,isHOD,getFaculty)
router.post('/getFacultyByDepartment',getFacultyByDepartment)
module.exports = router