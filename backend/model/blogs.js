const mongoose = require("mongoose");
const { Schema } = mongoose;
// add description
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
    summary: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    draft: {
      type: Boolean,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    }
  },
  {
    versionKey: false
  }
);

// Define the models
const blogModel = mongoose.model("blog", blogSchema);

// Export the models
module.exports = {
  blogModel,
}