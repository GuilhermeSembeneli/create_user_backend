import { v4 } from "uuid";
import { UUIDv4 } from "uuid-v4-validator";
import { conenctKnex } from "../../../database";
import { IUpdate } from "../implements/IUserService";

export class UserRepository {
    async findById(id : number) {
        try {
            const findById = await conenctKnex('users').where({id})
            return findById;
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

    async create(username: string) {
        try {
            const findUser = await conenctKnex('users').where({username});
            if (findUser.length) return 'duplicated';

            await conenctKnex('users').insert({
                username, 
                user_id: v4()
            });

            return 'success';
        } catch (error) {
            console.log(error)
            return error.message;
        }
    }

    async update({user_id, username}: IUpdate) {
        try {
            if (!UUIDv4.validate(user_id)) return 'notfound';

            const findUser = await conenctKnex('users').where({user_id});
            if (!findUser.length) return 'notfound';

            await conenctKnex('users').where({user_id}).update({
                username
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
}