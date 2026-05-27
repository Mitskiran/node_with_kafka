"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_server_1 = __importDefault(require("./express.server"));
const PORT = process.env.PORT || 8000;
const startServer = () => {
    express_server_1.default.listen(PORT, () => {
        console.log("server is listening and can be access on http://localhost:8000");
    });
    process.on('uncaughtException', async (err) => {
        console.log(err);
        process.exit(1);
    });
};
exports.startServer = startServer;
(0, exports.startServer)();
