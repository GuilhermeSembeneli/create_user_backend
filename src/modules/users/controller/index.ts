import { Request, Response } from "express";
import { UserRepository } from "../repository";
import { UserService } from "../services";

export class UserController {
    constructor(private UserRepository: UserRepository, private UserService: UserService) {}

    async findById(request: Request, response: Response) {
        const { id } = request.params;
        const result = await this.UserRepository.findById(Number(id));

        return response.status(200).json(result);
    }

    
    async findByName(request: Request, response: Response) {
        const { name } = request.params;
        const result = await this.UserRepository.findByName(name);

        return response.status(200).json(result);
    }


    async findAll(request: Request, response: Response) {
        const result = await this.UserRepository.findAll();

        return response.status(200).json(result);
    }

    async create(request: Request, response: Response) {
        const { username, password } = request.body;

        const validator = this.UserService.validator('username', request.body);
        const validatorPassword = this.UserService.validator('password', request.body);
        
        if (validator.length) return response.status(400).json(validator);
        if (validatorPassword.length) return response.status(400).json(validatorPassword);

        const result = await this.UserRepository.create({username, password});

        const submitValidator = this.UserService.responseValidator(result);

        return response.status(submitValidator.status).json(submitValidator.message)
    }

    async update(request: Request, response: Response) {
        const { username, user_id, password } = request.body;

        const validator = this.UserService.validator('username', request.body);
        if (validator.length) return response.status(400).json(validator);

        const update = await this.UserRepository.update({user_id, username, password});

        const submitValidator = this.UserService.responseValidator(update);
       
        return response.status(submitValidator.status).json(submitValidator.message);
    }

    async delete(request: Request, response: Response) {
        const { user_id } = request.params;
        const validator = this.UserService.validator('user_id', request.params);
        if (validator.length) return response.status(400).json(validator);

        const deleted = await this.UserRepository.delete(user_id);

        const submitValidator = this.UserService.responseValidator(deleted);

        return response.status(submitValidator.status).json(submitValidator.message);
    }

    async login(request: Request, response: Response) {
        const { password, username } = request.body;

        const validator = this.UserService.validator('username', request.body);
        if (validator.length) return response.status(400).json(validator);

        const login = await this.UserRepository.signIn({password, username});

        if (typeof login === 'object') return response.status(200).json(login);

        const submitValidator = this.UserService.responseValidator(login);

        return response.status(submitValidator.status).json(submitValidator.message);
    }
}