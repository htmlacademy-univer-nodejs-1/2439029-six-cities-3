import {NextFunction, Request, Response} from 'express';
import {HttpMethod} from './http.methods.enum.js';
import {Middleware} from "../libs/middleware/index.js";

export interface RouteInterface {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: Middleware[];
}
