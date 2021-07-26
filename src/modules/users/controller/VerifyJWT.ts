import { Request, Response, NextFunction } from 'express';
import { JWTRepository } from '../repository/jwt'
import { UserService } from '../services';

export async function VerifyJWT(request: Request, response: Response, next: NextFunction) {

        const token = request.headers.authorization || "";
        
        const userService = new UserService();

        const verify = await JWTRepository(token);

        if (verify === 'validatedtoken') {
                next();
        } else {
                const submitValidator = userService.responseValidator(verify);
                return response.status(submitValidator.status).json(submitValidator.message);
        }
}