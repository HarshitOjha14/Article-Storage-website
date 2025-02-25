const User = require('../models/user');
const otpGenerrator = require('otp-generator')
const bcrypt = require('bcrypt')
const OTP = require('../models/OTP')
const Profile = require('../models/Profile')
const jwt = require('jsonwebtoken')
const mailSender = require('../utils/mailSender');
const user = require('../models/user');
const Department = require('../models/Department');
const PendingFacultyRegistration = require("../models/Pendingfaculty");
//sendOTP
exports.sendOTP = async (req, res) => {

    try {

        console.log("hii", req.body);
        //fetch email from request ki body

        const { email } = req.body;

        //check if user already exist 

        const checkUserPresent = await User.findOne({ email });

        //if user already exist , then return a response

        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered",
            })
        }

        //generate otp
        var otp = otpGenerrator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })
        console.log("otp generated", otp);

        //check unique otp or not

        const result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = otpGenerrator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            })
            result = await OTP.findOne({ otp: otp });
        }

        const otpPayload = { email, otp };

        //create an entry for otp
        const otpBody = await OTP.create(otpPayload)
        console.log(otpBody);

        //return response successful
        res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            otp,
        })








    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }
};


exports.signup = async (req, res) => {
    try {
        // Data fetch from request body
        const {
            Name,
            email,
            password,
            confirmPassword,
            accountType,
            department,
            otp,
        } = req.body;

        console.log(
            "Account Details: ",
            Name,
            email,
            password,
            confirmPassword,
            accountType,
            department,
            otp
        );

        // Validate input fields
        if (
            !Name ||
            !email ||
            !password ||
            !confirmPassword ||
            !otp ||
            (accountType !== "Admin" && !department)
        ) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match, please try again",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already registered",
            });
        }

        // Find most recent OTP stored for the user
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (recentOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP Not found",
            });
        } else if (otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create profile entry
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
            facebookUrl: null,
            instagramUrl: null,
            linkedInUrl: null,
            twitterUrl: null,
        });

        // Save faculty as pending registration
        if (accountType === "Faculty") {
            const pendingRegistration = await PendingFacultyRegistration.create({
                Name,
                email,
                department,
                password: hashedPassword,
                status: "Pending",
            });

            return res.status(200).json({
                success: true,
                message: "Faculty registration is pending approval by the HOD",
                pendingRegistration,
            });
        }

        const user = await User.create({
            Name,
            email,
            password: hashedPassword,
            accountType,
            department: accountType === "Admin" ? null : department,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${Name}`,
        });

        // If account type is not Admin, handle HOD and Faculty cases
        if (accountType !== "Admin") {
            const dept = await Department.findOne({ _id: department });
            if (!dept) {
                return res.status(404).json({
                    success: false,
                    message: `Department ${department} not found`,
                });
            }

            if (accountType === "HOD") {
                // Check if HOD already exists
                if (dept.hod) {
                    return res.status(400).json({
                        success: false,
                        message: `Department ${department} already has an HOD assigned`,
                    });
                }
                dept.hod = user._id;
            } else if (accountType === "Faculty") {
                // Add user to faculty list
                dept.faculty.push(user._id);
            }

            // Save the updated department
            await dept.save();
        }

        return res.status(200).json({
            success: true,
            message: "User is registered successfully",
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again",
        });
    }
};



// exports.signup = async (req, res) => {
//     try {
//         // Data fetch from request body
//         const {
//             Name,
//             email,
//             password,
//             confirmPassword,
//             accountType,
//             department,
//             otp,
//         } = req.body;

//         // Validate input fields
//         if (!Name || !email || !password || !confirmPassword || !otp || (accountType !== 'Admin' && !department)) {
//             return res.status(403).json({
//                 success: false,
//                 message: "All fields are required",
//             });
//         }

//         // Check if passwords match
//         if (password !== confirmPassword) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Password and ConfirmPassword value do not match, please try again",
//             });
//         }

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User is already registered",
//             });
//         }

//         // Find most recent OTP stored for the user
//         const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
//         if (recentOtp.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "OTP Not found",
//             });
//         } else if (otp !== recentOtp[0].otp) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid OTP",
//             });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create profile entry
//         const profileDetails = await Profile.create({
//             gender: null,
//             dateOfBirth: null,
//             about: null,
//             contactNumber: null,
//             facebookUrl: null,
//             instagramUrl: null,
//             linkedInUrl: null,
//             twitterUrl: null,
//         });

//         // Save faculty as pending registration
//         if (accountType === 'Faculty') {
//             const pendingRegistration = await PendingFacultyRegistration.create({
//                 Name,
//                 email,
//                 department,
//                 status: 'Pending', // Initially set to pending
//             });

//             return res.status(200).json({
//                 success: true,
//                 message: "Faculty registration is pending approval by the HOD",
//                 pendingRegistration,
//             });
//         }

//         // If account type is Admin or HOD, create the user normally
//         const user = await User.create({
//             Name,
//             email,
//             password: hashedPassword,
//             accountType,
//             department: accountType === "Admin" ? null : department, // Skip department for Admin
//             additionalDetails: profileDetails._id,
//             image: `https://api.dicebear.com/5.x/initials/svg?seed=${Name}`,
//         });

//         // If account type is not Admin, handle HOD and Faculty cases
//         if (accountType !== "Admin") {
//             const dept = await Department.findOne({ _id: department });
//             if (!dept) {
//                 return res.status(404).json({
//                     success: false,
//                     message: `Department ${department} not found`,
//                 });
//             }

//             if (accountType === "HOD") {
//                 // Check if HOD already exists
//                 if (dept.hod) {
//                     return res.status(400).json({
//                         success: false,
//                         message: `Department ${department} already has an HOD assigned`,
//                     });
//                 }
//                 dept.hod = user._id;
//             } else if (accountType === "Faculty") {
//                 // Add user to faculty list
//                 dept.faculty.push(user._id);
//             }

//             // Save the updated department
//             await dept.save();
//         }

//         return res.status(200).json({
//             success: true,
//             message: "User is registered successfully",
//             user,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "User cannot be registered. Please try again",
//         });
//     }
// };



//login

exports.login = async (req, res) => {
    try {
        //get data from req body
        const { email, password } = req.body;

        //validation data
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again",

            })
        }
        //user check exist or not 
        const user = await User.findOne({ email }).populate('additionalDetails');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user is not registered , please signup first"
            })
        }
        //generate JWT ,after password matching
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '24h'
            })
            user.token = token;
            user.password = undefined;


            //create cookie and send response
            const Options = {
                expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token", token, Options).status(200).json({
                success: true,
                token,
                user,
                message: 'logged in successfully',
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            })
        }



    }

    catch (error) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Login Faliure ,Please try again',
        })
    }

}


//changePassword
exports.changePassword = async (req, res) => {
    try {
        // Get user data from req.user
        const userDetails = await user.findById(req.user.id)



        // Get old password, new password, and confirm new password from req.body
        const { oldPassword, newPassword } = req.body


        // Validate old password
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        )
        if (!isPasswordMatch) {
            // If old password does not match, return a 401 (Unauthorized) error
            return res
                .status(401)
                .json({ success: false, message: "The password is incorrect" })
        }

        // Update password
        const encryptedPassword = await bcrypt.hash(newPassword, 10)
        const updatedUserDetails = await user.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        )

        // Send notification email
        // try {
        //     const emailResponse = await mailSender(
        //         updatedUserDetails.email,
        //         "Password for your account has been updated",


        //             `${updatedUserDetails.email}, Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`

        //     )
        //     console.log("Email sent successfully:", emailResponse.response)
        // } catch (error) {
        //     // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
        //     console.error("Error occurred while sending email:", error)
        //     return res.status(500).json({
        //         success: false,
        //         message: "Error occurred while sending email",
        //         error: error.message,
        //     })
        // }

        // Return success response
        return res
            .status(200)
            .json({ success: true, message: "Password updated successfully" })
    } catch (error) {
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while updating password:", error)
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        })
    }
}
