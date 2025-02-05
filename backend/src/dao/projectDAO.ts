import Project, { IProject } from '../schema/project';

export class ProjectDAO {
    async create(project: IProject): Promise<IProject> {
        const projectPayload = new Project(project);
        return await projectPayload.save();
    }

    async findByUserId(userId: string): Promise<IProject[]> {
        return await Project.find({ userId });
    }

    async deleteById(id: string): Promise<void> {
        await Project.findByIdAndDelete(id);
    }
}
