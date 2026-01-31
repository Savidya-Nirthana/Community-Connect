import express from "express";
import multer from "multer";
import { protect } from "../middlewares/authMiddleware.js";
import { createEvent, eventUploadBanner } from "../controllers/eventController.js";


const router = express.Router();
const upload = multer();


router.post("/createEvent", protect, upload.single("banner"), createEvent);
router.post("/uploadBanner", protect, upload.single("banner"), eventUploadBanner);

export default router;