const mongoose = require("mongoose")

const user = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true,
    },
    
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:['Admin','HOD','Faculty'],
        required:true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        validate: {
            validator: function (value) {
                if (this.accountType !== "Admin" && !value) {
                    return false;
                }
                return true;
            },
            message: "Department is required for HOD and Faculty",
        },
    },
   
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile",
    },
    articles:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Article",
    }],
    image:{
        type:String,
        required:true,

    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
     

});


module.exports = mongoose.model("user",user)