import { uploadWebContentMiddleware } from "../middlewares/uploadWebContentMiddleware.js";
import Event from "../models/event.model.js";

export const eventUploadBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file received" });
    }
    const buffer = req.file;
    const folder = `web/static`;
    const result = await uploadWebContentMiddleware(buffer, folder);
    return res.status(200).json({ bannerUrl: result });
  } catch (error) {
    console.error("Error uploading banner:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const response = await Event.create({
      title: eventData.event_name,
      description: eventData.description,
      date: eventData.selected_dates,
      location: eventData.select_location,
      bannerUrl: eventData.banner,
      category: eventData.select_category,
    });
    return res.status(201).json(response);
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
