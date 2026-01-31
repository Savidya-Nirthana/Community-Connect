import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: [Date],
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
    bannerUrl: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);


const Event = mongoose.model("Event", eventSchema);
export default Event;