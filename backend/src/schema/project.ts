// File: src/models/Project.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IProject {
    title: string;
    description: string;
    dueDate: Date;
    priority: 'Low' | 'Medium' | 'High';
}

export interface ProjectDocument extends IProject, Document {
}

const ProjectSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<ProjectDocument>('Project', ProjectSchema);