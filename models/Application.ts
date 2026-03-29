import mongoose, { Schema, Document, models } from "mongoose";


export interface IApplication extends Document {

    company: string;
    role: string;
    jobDescription: string;
    coverLetter?: string;
    status: 'Wishlist' | 'Applied' | 'Interview' | 'Rejected';
    createdAt: Date;

}

const ApplicationSchema = new Schema<IApplication>({
    company: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    coverLetter: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Wishlist', 'Applied', 'Interview', 'Rejected'],
        default: 'Wishlist'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const Application = models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);

export default Application;