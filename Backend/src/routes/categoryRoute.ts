import express from "express";
import { createCategories, deleteCategories, getCategories, showCategories, updateCategories } from "../controllers/categoryController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", getCategories); //menampilkan semua data category
router.post("/",authenticate, createCategories); //menambahkan data category, hanya bisa dilakukan oleh admin yang sudah login, maka dari itu kita tambahkan middleware authenticate untuk memeriksa token JWT yang dikirimkan oleh client. Jika token valid, maka request akan diteruskan ke controller createCategories untuk menambahkan data category baru. Jika token tidak valid atau tidak ada, maka server akan merespon dengan status 401 Unauthorized.
router.get("/:id", showCategories);
router.put("/:id", authenticate, updateCategories);
router.delete("/:id", authenticate, deleteCategories);

export default router;
