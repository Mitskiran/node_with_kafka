import app from "./express.server";
const PORT = process.env.PORT || 8000;
export const startServer = () => {
    app.listen(PORT, () => {
        console.log("server is listening and can be access on http://localhost:8000");
    });
    process.on('uncaughtException', async (err) => {
        console.log(err);
        process.exit(1);
    });
};
startServer();
