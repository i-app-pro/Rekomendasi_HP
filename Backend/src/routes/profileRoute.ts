import { Router } from "express";
import {getProfile, updateProfile, deleteProfile,} from "../controllers/profileController";

import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);
router.delete("/profile", authenticate, deleteProfile);

export default router;