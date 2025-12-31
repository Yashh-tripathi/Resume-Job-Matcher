import { Request, Response } from "express";
import mongoose from "mongoose";
import { Job } from "../jobs/job.model";
import Resume from "../resumes/resume.model";
import ApiResponse from "../../utils/Apiresponse/apiResponse";
import { PipelineStage } from "mongoose";

export const matchingResumesToJobs = async (request: Request, response: Response) => {
    const {jobId} = request.params;

    const job = await Job.findById(jobId);
    if(!job){
        return response.status(404).json(
            new ApiResponse(404, null, "Job not found")
        )
    }

    const pipeline: PipelineStage[] = [
        //experience 
        {
            $match: {
                totalExperience: { $gte: job.minExperience || 0 }
            }
        },

        //skills
        {
            $addFields: {
                matchedSkills: {
                    $filter: {
                        input: "$skills",
                        as: "skill",
                        cond: {
                            $in: [
                                "$$skill.name",
                                job.requiredSkills?.map(s => s.name) || []
                            ]
                        }
                    }
                }
            }
        },

        //calculate skills score
        {
            $addFields: {
                skillScore: {
                    $sum: {
                        $map: {
                            input: "$matchedSkills",
                            as: "matched",
                            in: {
                                $let: {
                                    vars: {
                                        jobSkill: {
                                            $arrayElemAt: [
                                                {
                                                    $filter: {
                                                        input: job.requiredSkills,
                                                        as: "req",
                                                        cond: { $eq: ["$$req.name", "$$matched.name"]}
                                                    }
                                                },
                                                0
                                            ]
                                        }
                                    },
                                    in: "$$jobSkill.weight"
                                }
                            }
                        }
                    }
                }
            }
        },

        //final score
        {
            $addFields: {
                finalScore: "$skillScore"
            }
        },

        //sort by best matched
        {
            $sort: { finalScore: -1 }
        },

        //limit results
        {
            $limit: 10
        }
    ];


    interface MatchedResume {
        _id: string;
        skillScore: number;
        totalExperience: number;
      }

    const matchedResumes = await Resume.aggregate<MatchedResume>(pipeline);

    return response.status(200).json(
        new ApiResponse(200, matchedResumes, "Matched resumes")
    )

}
