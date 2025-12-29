import {Request, Response } from "express";
import ApiError from "../../utils/APiError/apiError";
import { Job } from "./job.model";
import ApiResponse from "../../utils/Apiresponse/apiResponse";



//create job 
export const createJob = async (request:Request, response: Response) => {

    try {
        const { title, descriptionText, requiredSkills, minExperience, embedding } = request.body;

        if(!title){
            throw new ApiError(400, "Job title is required")
        }

        const job = await Job.create({
            title,
            descriptionText,
            requiredSkills,
            minExperience,
            embedding
        });

        return response.status(201).json(new ApiResponse(201, job, "job uploaded successfully"))
    } catch (error) {
        return response.status(500).json(new ApiResponse(500, null, "Failed to craete job"))
    }
}

//get all job 
export const getAllJob = async (request: Request, response: Response) => {
   try {
     const jobs = await Job.find();
     return response.status(200).json(new ApiResponse(200, jobs, "Fetched alll jobs"))
   } catch (error) {
    return response.status(500).json(
        new ApiResponse(500, null, "Failed to fetch jobs")
    )
   }
}
