import { Router } from "express";
import { createJob, getAllJob } from "./job.controller";

const router = Router();

router.route("/").post(createJob);
router.route("/").get(getAllJob);

export default router;