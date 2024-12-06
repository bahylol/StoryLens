const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imagelink: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false 
  }
);

// // Define the models
const blogModel = mongoose.model("blog", blogSchema);

// // Export the models
module.exports = {
  blogModel,
}