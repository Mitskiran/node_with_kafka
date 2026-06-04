 import app from "./express-app"

const PORT = process.env.APP_PORT || 9003

export const startServer=()=>{


    app.listen(PORT, ()=>{
    console.log("server is listening and can be access on http://localhost:9003/api");
})
process.on('uncaughtException', async(err)=>{
    console.log(err);
    process.exit(1);
})
}



startServer();
