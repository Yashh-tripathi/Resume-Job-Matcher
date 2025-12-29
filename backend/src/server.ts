import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config({
    path: "./.env"
});

connectDB()
.then(
    () => {
        const server = app.listen(4000, () => {
            console.log("Server is runnig on the port 4000");
        });

        server.on("error", (error) => {
            console.log("error")
        })
    }
)
.catch((error) => {
    console.log(error)
});

