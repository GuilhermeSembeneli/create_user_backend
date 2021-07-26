import { conenctKnex } from "../../../database";

export class UserRepository {
    async findByName(username : string) {
        try {
            
            const findByName = await conenctKnex('users').where({username});
            return findByName;
        } catch (error) {
            
        }
    }
}