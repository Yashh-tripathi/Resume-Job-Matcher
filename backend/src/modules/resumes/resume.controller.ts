import { Request, Response } from "express";
import ApiError from "../../utils/APiError/apiError";
import Resume from "./resume.model";
import ApiResponse from "../../utils/Apiresponse/apiResponse";

//add resume 
export const addResume = async (request: Request, response: Response) => {

    try {
        const {candidateId, rawText, skills, experience, totalExperience, embedding} = request.body;

        const resume = await Resume.findOneAndUpdate(
            {candidateId},
            { rawText, skills, experience, totalExperience, embedding},
            {new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return response
        .status(200)
        .json(
            new ApiResponse(
                200,
                resume,
                "Succesfully saved resume"
            )
        )

    } catch (error) {
        throw new ApiError(500, "Internal server error uploading resume")
    }

}

//get all resumes

export const getAllResumes = async (request: Request, response: Response) => {
    try {
        const resumes = await Resume.find();
        return response.status(200).json( new ApiResponse(200, resumes, "fetched all resumes"))
    } catch (error) {
        return response.status(400).json(
            new ApiResponse(400, null, "Failed to fetch resumes")
        )
    }
}