import {Schema, model, Types, ObjectId} from "mongoose";

interface Skills{
    name: string;
    level: "beginner" | "intermeditae" | "advanced" | string
}

const skillSchema = new Schema<Skills>({
    name: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"]
    }
});

interface Experience{
    company: string;
    roles: string;
    years: number;
}

const experienceSchema = new Schema<Experience>({
    company: {
        type: String,
    },
    roles: {
        type: String
    },
    years: {
        type: Number
    }
});

interface ResumeInterface {
    candidateId: ObjectId;
    rawText: string;
    skills?: Skills[];
    experience?: Experience[];
    totalExperience?: number;
    embedding?: number[];
    createdAt?: Date;
    
}

const resumeSchema = new Schema<ResumeInterface>({
    candidateId: { type: Types.ObjectId, required: true, unique: true },
    rawText: { type: String, required: true },
    skills: [skillSchema],
    experience: [experienceSchema],
    totalExperience: Number,
    embedding: { type: [Number], index: true },
    createdAt: { type: Date, default: Date.now }
});


const Resume = model<ResumeInterface>("Resume", resumeSchema);
export default Resume;