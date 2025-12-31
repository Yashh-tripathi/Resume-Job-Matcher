import express from "express";
import cors from "cors";



const app = express();

app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({ extended: true, limit: "40kb" }));
app.use(cors());

import resumeRouter from "../src/modules/resumes/resume.routes";
import JobRouter from "../src/modules/jobs/job.routes";
import matchRouter from "../src/modules/matchings/matching.routes";

app.use("/api/resumes", resumeRouter);
app.use("/api/jobs", JobRouter);
app.use("/api/match", matchRouter);


export default app;