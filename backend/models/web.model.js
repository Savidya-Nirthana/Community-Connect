import mongoose from "mongoose";

const webSchema = mongoose.Schema(
  {
    contain: {
      type: String,
    },

    url: {
      type: String,
    },

    updateBy: {
        type: String,
    }

  },
  { timestamps: true }
);

const web = mongoose.model("Web", webSchema);
export default web;
