const mongoose = require("mongoose");

const pendingFacultyRegistrationSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    
     createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("PendingFacultyRegistration", pendingFacultyRegistrationSchema);
