const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [{ type: String, required: true }],
  type: { type: String, enum: ["Journal", "Conference"], required: true },

  journalName: { type: String, required: function () { return this.type === "Journal"; } },
  volume: { type: String },
  location: { type: String },
  issue: { type: String },
  pageNoStart: { type: String },
  pageNoEnd: { type: String },

  conferenceName: { type: String, required: function () { return this.type === "Conference"; } },
  link: { type: String },
  
  month: { type: String, required: true }, 
  year: { type: Number, required: true }, 

  publisher: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
  department:{type: mongoose.Schema.Types.ObjectId, required: true, ref: "Department" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Article", articleSchema);
