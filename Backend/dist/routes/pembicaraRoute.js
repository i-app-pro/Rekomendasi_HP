"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pembicaraController_1 = require("../controllers/pembicaraController");
const router = express_1.default.Router();
router.get("/", pembicaraController_1.getPembicara);
router.post("/", pembicaraController_1.createPembicara);
router.get("/:id", pembicaraController_1.showPembicara);
router.put("/:id", pembicaraController_1.updatePembicara);
router.delete("/:id", pembicaraController_1.deletePembicara);
exports.default = router;
//# sourceMappingURL=pembicaraRoute.js.map