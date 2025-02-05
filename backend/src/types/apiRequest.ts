import { Request } from 'express';

export interface APIRequest<T> extends Request {
    body: T;
    user?: { id: string };
}