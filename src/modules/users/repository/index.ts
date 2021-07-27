import { v4 } from "uuid";
import { UUIDv4 } from "uuid-v4-validator";
import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { conenctKnex } from "../../../database";
import { IUpdate, IUserService } from "../implements/IUserService";
import dotenv from  'dotenv';
dotenv.config();

export class UserRepository {
    async findById(id : number) {
        try {
            const findById = await conenctKnex('users').where({id});

            return findById;
        } catch (error) {
            console.log(error)
            return error.message;
        }
    }

    async findByName(username : string) {
        try {
            console.log(username)
            const findByName = await conenctKnex('users').where('username', 'like', `%${username}%`);

            return findByName;
        } catch (error) {
            console.log(error)
            return error.message;
        }
    }

    async findAll() {
        try {
            const findAll = await conenctKnex('users');
            return findAll;
        } catch (error) {
            console.log(error)
            return error.message;
        }
    }

    async create({username, password}: IUserService) {
        try {
            const hashPassword = await hash(password, 8);
            const findUser = await conenctKnex('users').where({username});
            if (findUser.length) return 'duplicated';

            let token = jwt.sign({id: username}, process.env.SECRET_KEY, {
                expiresIn: '1d'
            });

            const create = await conenctKnex('users').insert({
                username, 
                password: hashPassword,
                token,
                user_id: v4()
            }).returning(['id', 'token', 'username', 'user_id']);

            return {log: 'success', data: create};
        } catch (error) {
            console.log(error)
            return error.message;
        }
    }

    async update({user_id, username, password}: IUpdate) {
        try {
            if (!UUIDv4.validate(user_id)) return 'notfound';

            const findUser = await conenctKnex('users').where({user_id});
            if (!findUser.length) return 'notfound';

            const hashPassword = await hash(password, 8);

            await conenctKnex('users').where({user_id}).update({
                username, hashPassword
            });

            return 'updated'
        } catch (error) {
            console.log(error)
            return error.message;
        }
    }

    async delete(user_id: string) {
        try {
            if (!UUIDv4.validate(user_id)) return 'notfound';
            const findUser = await conenctKnex('users').where({user_id});
            if (!findUser.length) return 'notfound';
        
            await conenctKnex('users').where({user_id}).del();

            return 'deleted'
        } catch (error) {
            console.log(error)
            return error.message;
        }
    }


    async signIn({username, password}: IUserService) {
        try {
            const findUser = await conenctKnex('users').where({username}).first();

            if (!findUser) return 'notfound'
            const descryptPassword = await compare(password, findUser.password)
            if (!descryptPassword) return 'invaliduser'

            let token = jwt.sign({id: username}, process.env.SECRET_KEY, {
                expiresIn: '1d'
            });

            return {
                user: {
                    username: findUser.username,
                    token
                },
            }
        } catch (error) {
            console.log(error)
            return error.message;
        }
    }
}