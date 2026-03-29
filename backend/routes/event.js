import express from "express";
import multer from "multer";
import { protect } from "../middlewares/authMiddleware.js";
import { createEvent, eventUploadBanner, getDataMonth, getEventById } from "../controllers/eventController.js";

const router = express.Router();
const upload = multer();


router.post("/createEvent", protect, upload.single("banner"), createEvent);
router.post("/uploadBanner", protect, upload.single("banner"), eventUploadBanner);
router.get("/getDataMonth", getDataMonth);
router.get("/getEventById/:id", getEventById);


export default router; 