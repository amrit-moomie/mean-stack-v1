//just an info route to show for the landing page
import { Router } from 'express';
import { Response } from 'express';
import { APIRequest } from '../types/apiRequest';
const router = Router();

router.get('/', async (_req: APIRequest<{}>, res: Response) => {
    res.json({ message: 'Welcome to the API' });
});

export default router;