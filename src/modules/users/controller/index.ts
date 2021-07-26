import { Request, Response } from "express";
import { UserRepository } from "../repository";

export class UserController {
    constructor(private UserRepository : UserRepository) {}

    async findByName(request: Request, response: Response) {
        const { name } = request.query;
        const result = await this.UserRepository.findByName(name.toString());

        return response.status(200).json(result);
    }
}