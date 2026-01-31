import asyncHandler from "express-async-handler";
import { uploadWebContentMiddleware } from "../middlewares/uploadWebContentMiddleware.js";
import web from "../models/web.model.js";

export const uploadBanner = asyncHandler(async (req, res) => {
  console.log("image");
  if (!req.file) {
    return res.status(400).json({ message: "No file received" });
  }
  const buffer = req.file;
  const folder = `web/static`;
  const result = await uploadWebContentMiddleware(buffer, folder);
  return res.status(200).json({ path: result });
});

export const updateDatase = asyncHandler(async (req, res) => {
  const { url } = req.body;
  const email = res.user.user.email;
  if (url) {
    const contain = await web.findOne({ contain: "banner" });
    if (contain) {
      contain.url = url;
      contain.updateBy = email;
      contain.save();
    } else {
      const result = await web.create({
        contain: "banner",
        url: url,
        updateBy: email,
      });
    }

    return res.status(200).json({ message: "Updated successfully" });
  }
  return res.status(404).json({ message: "Url not found" });
});

export const getBanner = asyncHandler(async (req, res) => {
  const result = await web.findOne({ contain: "banner" });
  return res.status(200).json({ url: result.url });
});

export const removerBanner = asyncHandler(async (req, res) => {
  const result = await web.findOneAndDelete({ contain: "banner" });
  return res.status(200).json({ message: "Successfully deleted" });
});
