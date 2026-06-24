import express from "express";

import { createPembicara, deletePembicara, getPembicara, showPembicara, updatePembicara } from "../controllers/pembicaraController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", getPembicara);
router.post("/", authenticate, createPembicara);
router.get("/:id", showPembicara);
router.put("/:id", authenticate, updatePembicara);
router.delete("/:id", authenticate, deletePembicara);

export default router;