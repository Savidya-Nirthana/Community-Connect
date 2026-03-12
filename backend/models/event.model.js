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
    start_time: {
      type: String,
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
    price: {
      type: String,
      default: "Free",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    participations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
