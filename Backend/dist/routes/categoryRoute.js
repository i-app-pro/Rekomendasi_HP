"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const router = express_1.default.Router();
router.get("/", categoryController_1.getCategories);
router.post("/", categoryController_1.createCategories);
router.get("/:id", categoryController_1.showCategories);
router.put("/:id", categoryController_1.updateCategories);
router.delete("/:id", categoryController_1.deleteCategories);
exports.default = router;
//# sourceMappingURL=categoryRoute.js.map