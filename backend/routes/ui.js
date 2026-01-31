import express from "express";
import multer from "multer";
import { protect } from "../middlewares/authMiddleware.js";
import { getBanner, removerBanner, updateDatase, uploadBanner } from "../controllers/uiController.js";

const router = express.Router();
const upload = multer();

router.post("/bannerUpload", protect, upload.single("file"), uploadBanner);
router.post("/databaseUpdate", protect, updateDatase);
router.get("/getBanner", getBanner);
router.get("/removeBanner", removerBanner);

export default router;
