import express, { Response } from 'express';
import { ProjectDAO } from '../dao/projectDAO';
import { APIRequest } from '../types/apiRequest';
import { IProject } from '../schema/project';
const router = express.Router();
const projectDAO = new ProjectDAO();

interface ProjectRequestBody {
    title: string;
    description: string;
    dueDate: Date;
    priority: 'Low' | 'Medium' | 'High';
}

router.post('/', async (req: APIRequest<ProjectRequestBody>, res: Response) => {
    try {
        const payload: IProject = { ...req.body };
        const project = await projectDAO.create(payload);
        res.status(201).json(project);
    } catch (error: unknown) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
});

router.get('/', async (req: APIRequest<{}>, res: Response) => {
    try {
        const projects = await projectDAO.findByUserId(req.user!.id);
        res.json(projects);
    } catch (error: unknown) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
});

router.delete('/:id', async (req: APIRequest<{}>, res: Response) => {
    try {
        await projectDAO.deleteById(req.params.id);
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error: unknown) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
});

export default router;