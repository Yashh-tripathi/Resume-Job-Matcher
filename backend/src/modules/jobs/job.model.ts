import {Schema, model, Types} from "mongoose";


interface SkillInterface {
    name: string;
    weight: number;
}

const RequiredSkillSchema = new Schema<SkillInterface>({
    name: {
        type: String,
    },
    weight: {
        type: Number,
        default: 1,
    }
});

interface JobInterface {
    title: string;
    descriptionText?: string;
    requiredSkills?: SkillInterface[];
    minExperience?: number;
    embedding?: number[];
    createdAt?: Date;
}

const JobSchema = new Schema<JobInterface>({
    title: {
        type: String,
        required: true,
    },
    descriptionText: {
        type: String
    },
    requiredSkills: [RequiredSkillSchema],
    minExperience: {
        type: Number,
    },
    embedding: {
        type: [Number],
        index: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export const Job = model<JobInterface>("Job", JobSchema);

