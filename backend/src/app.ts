import express from "express";
import cors from "cors";



const app = express();

app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({ extended: true, limit: "40kb" }));
app.use(cors());

import resumeRouter from "../src/modules/resumes/resume.routes";
app.use("/api/resumes", resumeRouter);


export default app;