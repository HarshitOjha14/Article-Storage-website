const mongoose = require("mongoose");

const hodEmailSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model("HODEmail", hodEmailSchema);