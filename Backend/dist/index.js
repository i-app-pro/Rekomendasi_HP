"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const eventRoute_1 = __importDefault(require("./routes/eventRoute"));
const categoryRoute_1 = __importDefault(require("./routes/categoryRoute"));
const pembicaraRoute_1 = __importDefault(require("./routes/pembicaraRoute"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)({
    origin: "https://utsskbpemweb.vercel.app",
    credentials: true
}));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Ini adalah API untuk Invofest');
});
app.use('/events', eventRoute_1.default);
app.use('/categories', categoryRoute_1.default);
app.use('/speeker', pembicaraRoute_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map