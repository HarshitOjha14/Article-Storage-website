const Profile = require("../models/Profile");
const user = require("../models/user");




exports.getUserAllDetails = async (req, res) => {

  try {

    const id = req.user.id;

    const userDetails = await user.findById(id).populate("articles").populate("additionalDetails").exec();


    //return response 

    return res.status(200).json({
      success: true,
      message: 'User data fetched successfully',
      data: userDetails
    })


  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

}

exports.getUserAllDetailsbyId = async (req, res) => {
  try {
    const { id } = req.body; // Extract the `id` from `req.body`

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const userDetails = await user
      .findById(id)
      .populate("articles")
      .populate("department")
      .populate("additionalDetails")
      .exec();

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return response
    return res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const {
      Name = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
      facebookUrl = "",
      instagramUrl = "",
      twitterUrl = "",
      linkedinUrl = "",
    } = req.body;
    const id = req.user.id;

    // Find the user by id
    const userDetails = await user.findById(id); // Existing `user` model
    const profile = await Profile.findById(userDetails.additionalDetails);

    // Update the user fields
    userDetails.Name = Name;
    await userDetails.save();

    // Update the profile fields
    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;
    profile.gender = gender;
    profile.instagramUrl = instagramUrl;
    profile.facebookUrl = facebookUrl;
    profile.twitterUrl = twitterUrl;
    profile.linkedinUrl = linkedinUrl;

    // Save the updated profile
    await profile.save();

    const updatedUserDetails = await user
      .findById(id)
      .populate("additionalDetails")
      .exec();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


//delete account

exports.deleteAccount = async (req, res) => {
  try {

    const id = req.user.id;

    const userDetails = await user.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });


    await user.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      message: 'User Deleted Successfully'
    })

  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "User cannot be deleted successfully"
    })

  }


}