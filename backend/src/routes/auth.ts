import express, { Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../schema/user';
import { AuthResponse } from '../types/auth/AuthResponse';
import { APIRequest } from '../types/apiRequest';
import { UserDAO } from '../dao/UserDAO';
import { AuthRegisterRequestBody } from '../types/auth/AuthRegisterRequestBody';
import jwt from 'jsonwebtoken';

const router = express.Router();
const userDAO = new UserDAO();

router.post('/register', async (req: APIRequest<AuthRegisterRequestBody>, res: Response<AuthResponse>) => {
    try {
        const { email, password, username } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userDAO.create(new User({ email, password: hashedPassword, username }));
        res.status(201).json({ message: `User registered successfully with id ${user.id}` });
    } catch (error: unknown) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
});


router.post('/login', async (req: APIRequest<AuthRegisterRequestBody>, res: Response<AuthResponse>) => {
    try {
        const { email, password } = req.body;

        // Fetch user by email
        const user = await userDAO.findByEmail(email);
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });

        // Return success response
        //test
        res.json({ token });
    } catch (error: unknown) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
});


export default router;