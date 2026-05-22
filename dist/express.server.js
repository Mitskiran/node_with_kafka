import express from "express";
import catalogRouter from "./api/catalog.routes";
const app = express();
app.use(express.json());
app.use("/api", catalogRouter);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("server is listening and can be access on http://localhost:8000");
});
export default app;
