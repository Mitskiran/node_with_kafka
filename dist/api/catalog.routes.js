"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catalogService = void 0;
const express_1 = __importDefault(require("express"));
const catalog_repository_1 = require("../repository/catalog.repository");
const catalogService_1 = require("../services/catalogService");
const router = express_1.default.Router();
exports.catalogService = new catalogService_1.CatalogService(new catalog_repository_1.CatalogRepository());
router.post("/products", async (req, res, next) => {
    if (!req.body.name) {
        res.status(400).json({ message: "name is required" });
    }
    const data = await exports.catalogService.createProduct(req.body);
    return res.status(201).json(data);
});
router.get("/products", async (req, res, next) => {
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);
    console.log(limit);
    console.log(offset);
    const productArray = await exports.catalogService.getProducts(limit, offset);
    return res.status(200).json(productArray);
});
exports.default = router;
