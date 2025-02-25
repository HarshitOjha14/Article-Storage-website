const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
   
    hod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",

    },
    faculty: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
});

module.exports = mongoose.model("Department", departmentSchema);