import { Router } from "express";
import { matchingResumesToJobs } from "./matching.controller";

const router = Router();

router.route("/job/:jobId").get(matchingResumesToJobs)

export default router;