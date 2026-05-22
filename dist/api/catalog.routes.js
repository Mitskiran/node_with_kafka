import express, {} from "express";
const router = express.Router();
router.post("/product", async (req, res, next) => {
    return res.status(200).json({ message: "implemented" });
});
export default router;
