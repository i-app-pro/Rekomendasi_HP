import express from "express";
import { createEvent, deleteEvent, getEvent, showEvent, updateEvent } from "../controllers/eventController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", getEvent);
router.post("/", authenticate, createEvent);
router.get("/:id", showEvent);
router.put("/:id", authenticate, updateEvent);
router.delete("/:id", authenticate, deleteEvent);

export default router;
