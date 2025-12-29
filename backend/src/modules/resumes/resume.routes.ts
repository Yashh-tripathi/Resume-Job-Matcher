import { Router } from "express";
import { addResume, getAllResumes } from "./resume.controller";

const router = Router();

router.route("/").post(addResume);
router.route("/").get(getAllResumes);

export default router;